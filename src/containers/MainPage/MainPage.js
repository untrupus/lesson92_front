import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import background from '../../background.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingTop: '20px',
        justifyContent: "space-between",
        '& > *': {
            width: theme.spacing(16),
            height: theme.spacing(70),
        },
    },
    icon: {
        width: '20px',
        height: '20px'
    },
    members: {
        width: '20%',
        padding: '20px'
    },
    messages: {
        width: '70%',
        padding: '20px'
    },
    user: {
        marginBottom: '10px'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        paddingBottom: '50px'
    },
    bg: {
        backgroundImage: `url(${background})`,
        backgroundSize: 'contain'
    }
}));

const MainPage = () => {
    const classes = useStyles();
    const ws = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user.user);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8000/chat?token=" + user.token);
        let refresh;

        ws.current.onopen = () => {
            console.log('Connection established');
            clearInterval(refresh);
            ws.current.send(JSON.stringify({type: "GET_ALL_MESSAGES"}));
        };

        ws.current.onmessage = e => {
            const decodedMessage = JSON.parse(e.data);
            if (decodedMessage.type === "NEW_MESSAGE") {
                setMessages(messages => [...messages, decodedMessage]);
            } else if (decodedMessage.type === "ALL_MESSAGES") {
                setMessages(messages => [...messages, ...decodedMessage.result]);
            } else if (decodedMessage.type === "ALL_USERS") {
                setUsers(decodedMessage.usersList);
            }
        };

        ws.current.onclose = () => {
             refresh = setInterval(() => {
                ws.current = new WebSocket("ws://localhost:8000/chat?token=" + user.token);
                console.log('Connect failure');
            }, 5000);
            console.log("ws connection closed");
        };

        return () => {
            ws.current.send(JSON.stringify({type: "DISCONNECT"}));
            ws.current.close();
        };

    }, []);

    const inputChangeHandler = e => {
        setMessage(e.target.value);
    };

    const formSubmit = e => {
        e.preventDefault();
        ws.current.send(JSON.stringify({
            type: "CREATE_MESSAGE",
            message: message
        }));
        setMessage('');
    };


    let chat = (
        <div>
            {
                messages.map((mess, idx) => {
                    return <div key={idx}>
                        <b>{mess.username}: </b>
                        {mess.text}
                    </div>
                })
            }
        </div>
    );

    let usersList = (
        <div>
            {
                users.map((user, idx) => {
                    return <div key={idx} className={classes.user}>
                        <img className={classes.icon}
                             src='https://installprogram.ru/wp-content/uploads/2018/04/ICQLogo.png'
                             alt='icq'
                        />
                        <b>  {user}</b>
                    </div>
                })
            }
        </div>
    )

    return (
        <div className={classes.bg}>
            <Container>
                <div className={classes.root}>
                    <Paper elevation={3} className={classes.members}>
                        {usersList}
                    </Paper>
                    <Paper elevation={3} className={classes.messages}>
                        {chat}
                    </Paper>
                </div>
                <form className={classes.form}
                      onSubmit={formSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="message"
                        label="Message"
                        name="message"
                        value={message}
                        onChange={inputChangeHandler}
                        autoComplete="message"
                        autoFocus
                        required={true}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Send
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default MainPage;
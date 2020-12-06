import React from 'react';
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
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(70),
        },
    },
    members: {
        width: '25%'
    },
    messages: {
        width: '70%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        paddingBottom: '50px'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    bg: {
        backgroundImage: `url(${background})`,
        backgroundSize: 'contain'
    }
}));

const MainPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.bg}>
            <Container>
                <div className={classes.root}>
                    <Paper elevation={3} className={classes.members}/>
                    <Paper elevation={3} className={classes.messages}/>
                </div>
                <form className={classes.form}
                    // onSubmit={formSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="message"
                        label="Message"
                        name="message"
                        // value={state.message}
                        // onChange={inputChangeHandler}
                        autoComplete="message"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        // className={classes.submit}
                    >
                        Send
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default MainPage;
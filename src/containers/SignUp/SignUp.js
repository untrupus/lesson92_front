import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {registerUser} from "../../store/actions/usersActions";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    login: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

const SignUp = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);

    const inputChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };
    const formSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({...state}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch(e) {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form}
                      onSubmit={formSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={!!getFieldError("username")}
                        helperText={getFieldError("username")}
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={state.username}
                        onChange={inputChangeHandler}
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={!!getFieldError("password")}
                        helperText={getFieldError("password")}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container >
                        <Grid item className={classes.login}>
                            <Link component={RouterLink}  to="/signin" >
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignUp;
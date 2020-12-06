import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';
import {useSelector} from "react-redux";
import UserMenu from "../UserMenu/UserMenu";
import ForumIcon from '@material-ui/icons/Forum';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        color: "white",
        marginRight: "10px",
        marginLeft: "10px",
        fontWeight: "bold",
        '&:hover': {
            textDecoration: "none"
        }
    }
}));

const Header = () => {
    const classes = useStyles();
    const user = useSelector(state => state.users.user);

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <ForumIcon/>
                        <Link component={RouterLink} className={classes.logo} to="/chat">Chat for friends</Link>
                    </Typography>
                    {!user ?
                        <Button color="inherit">
                            <Link component={RouterLink} className={classes.logo} to="/signin">Sign in</Link>
                            <span className={classes.logo}> / </span>
                            <Link component={RouterLink} className={classes.logo} to="/signup">Sign up</Link>
                        </Button> :
                        <UserMenu
                            name={user.user.username}
                        />
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
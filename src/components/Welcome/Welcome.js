import React from 'react';
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: "150px",
            width: theme.spacing(150),
            height: theme.spacing(16),
            textAlign: "center",
            verticalAlign: 'center',
        },
    },
}));

const Welcome = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <h1>Welcome. Please login to join chat</h1>
        </Container>
    );
};

export default Welcome;
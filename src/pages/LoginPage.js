import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import FacebookLogin from 'react-facebook-login';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

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
}));

function LoginPage(props) {
    const classes = useStyles();
    let [user, setUser] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        id: '',
        type: 'appLogin'
    });

    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        user[name] = value;
        setUser(user);
    }

    let save = (e) => {
        e.preventDefault();
        if (user.username && user.password) {
            props.login(user.username, user.password);
        }
    }

    const responseFacebook = (response) => {
        const fullName = response.name;
        user['username'] = response.email;
        user['password'] = response.accessToken;
        user['id'] = response.userId;
        user['firstName'] = fullName.split(' ').slice(0, -1).join(' ');
        user['lastName'] = fullName.split(' ').slice(-1).join(' ');
        user['type'] = 'facebookLogin';
        props.login(user.username, user.password, user.firstName, user.lastName, user.id, user.type);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                {props.alert.message &&
                            <Alert severity={`${props.alert.type}`}>{props.alert.message}</Alert>
                        }
                <form className={classes.form} noValidate={false} onSubmit={save}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <div>
                        <FacebookLogin
                            appId="532941894261305"
                            fields="name,email,picture"
                            callback={responseFacebook} 
                            cssClass="MuiButton-label"
                        />
                    </div>
                    <Link href="/register">Sign Up</Link>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );

}

function mapState(state) {
    const { alert } = state;
    const { loggingIn } = state.authentication;
    return { loggingIn, alert };
}

const actionCreators = {
    login: userActions.login,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
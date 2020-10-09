import React, { FC, useState } from 'react'
import { useForm } from "react-hook-form";
import { user } from "../../Interfaces/user.interface";
import * as Yup from 'yup';
import { tosavetoken, toallowauthentication } from "../../ReduxStore/authslice";
import { setuser } from "../../ReduxStore/userslice";
import { AuthResponse } from "../../Mirage-Server/userRoutes";
import { useDispatch } from 'react-redux';
import http from '../../Mirage-Server/Axios/axios-api';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
  error : {
    color : 'red'
  }
}));

// Yup will validate the properties and in case of any wrong thing it will display
// the message required method in form.

const schema = Yup.object().shape({
  username: Yup.string().required('No, username? Click sign up below').max(20, 'username should be within 20 characters'),
  password: Yup.string().required('Password should be strong'),
  email: Yup.string().email('Please provide valid email adress e.g xyz@abc')
});
const Auth: FC = () => {
  const classes = useStyles();
  const [islogin, setIslogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // Here I have used simply dispatch to not make it complex
  const { handleSubmit, register, errors } = useForm<user>({
    validationSchema: schema
  });
  const Submit = (data: user) => {
    const path = islogin ? '/auth/login' : '/auth/signup';
    //  console.log(data);

    http.post<user, AuthResponse>(path, data).then((response) => {
      console.log(response);
      if (response) {
        const { user, token } = response;
        dispatch(tosavetoken(token));
        dispatch(setuser(user));
        dispatch(toallowauthentication(true));
      }

    }).catch((error) => {
      console.log(error);


    }).finally(() => {
      setLoading(false)
    })
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
        <form  onSubmit={handleSubmit(Submit)} className={classes.form} noValidate>
          <TextField
            inputRef={register}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User Name"
            name="username"
            // autoComplete="email"
            autoFocus
          />
          {errors && errors.username && (<p className = {classes.error} >{errors.username.message}</p>)}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputRef={register}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {errors && errors.password && (<p className = {classes.error} >{errors.password.message}</p>)}

          {!islogin && (
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                ref={register}
                name="email"
                label="Email"
                type="email"
                id="email"

              />
              {errors && errors.email && (<p className = {classes.error} >{errors.email.message}</p>)}
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {islogin? 'SIGN IN' : 'CREATE ACCOUNT'}
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => setIslogin(!islogin)}  variant="body2">
                {islogin ?  "Don't have an account? Sign Up" : "Already have an account?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Auth;
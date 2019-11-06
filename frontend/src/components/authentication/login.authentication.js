import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const postLogin = async (post) => {
  post.event.preventDefault();
  const url = "http://127.0.0.1:8000/rest-auth/login/";
  axios.post(url, {
    username: post.email,
    password: post.password
  }).then(res => {
    if(res.data.key){
      localStorage.setItem("key", res.data.key);
      console.log(res.data.key);
      post.history.push("/profile");
    }
  }).catch(err => {
    console.log(err);
  });

}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(14),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    margin: theme.spacing(1),
  },
}));

export default function Login() {
  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  return(
        <Container className={classes.container}>
          <Typography position="static" component="h1" variant="h4">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField 
              name = "email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              value = {email}
              onChange = {event => setEmail(event.target.value)}
            />
            <TextField 
              name = "password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value = {password}
              onChange = {event => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={event => postLogin({event: event, email: email, password: password, history: history})}
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </Container>
  );

}
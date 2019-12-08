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
  const url = "http://67.159.88.90:8000/rest-auth/login/";
  axios.post(url, {
    username: post.username,
    password: post.password
  }).then(res => {
    if(res.data.key){
      localStorage.setItem("key", res.data.key);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("uid", res.data.user.id);
      console.log(res.data);
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  return(
        <Container className={classes.container}>
          <Typography position="static" component="h1" variant="h4">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField 
              name = "username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              value = {username}
              onChange = {event => setUsername(event.target.value)}
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
              onClick={event => postLogin({event: event, username: username, password: password, history: history})}
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </Container>
  );

}
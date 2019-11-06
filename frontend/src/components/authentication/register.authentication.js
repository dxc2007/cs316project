import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'

const postRegister = async (post) => {
  post.event.preventDefault();
  const url = "http://127.0.0.1:8000/rest-auth/create-user/";
  console.log(post.name)
  axios.post(url, {
    username: post.name,
    email: post.email,
    password: post.password
  }).then(res => {
    console.log(res.data);
  }).catch(err => {
    console.log(err);
  });

}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    margin: theme.spacing(1),
  },
}));

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const classes = useStyles();
  return(
        <Container className={classes.container}>
          <Typography position="static" component="h1" variant="h4">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <TextField 
              name = "name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              value = {name}
              onChange = {event => setName(event.target.value)}
            />
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
            <TextField 
              name = "password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              value = {password2}
              onChange = {event => setPassword2(event.target.value)}
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
              className={classes.submit}
              onClick={event => postRegister({event: event, name: name, email:email, password: password, password2: password2})}
            >
              Register
            </Button>
          </form>
        </Container>
  );

}
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useStateValue } from '../state';

import Background1 from '../public/backgroundimages/bb1.jpg';
import Background2 from '../public/backgroundimages/bb2.jpg';
import Background3 from '../public/backgroundimages/bb3.jpg';
import Background4 from '../public/backgroundimages/bb4.jpg';

const chooseBackground = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const Background = chooseBackground([Background1, Background2, Background3, Background4]);

const useStyles = makeStyles(theme => ({
  root: {
    height: '89vh',
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  background: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  form: {
    margin: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(7),
  },
  input: {
    display: 'none',
  },
}));

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  return(
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.background} />
      <Container className={classes.container} maxWidth="xs">
          <Typography className={classes.title} position="static" component="h1" variant="h4">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField 
              name = "email"
              variant="outlined"c
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
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        
      </Container>
    </Grid>
    
  );

}
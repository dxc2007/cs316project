import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useStateValue } from '../state';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    margin: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(4),
  },
  input: {
    display: 'none',
  },
}));

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // handleSubmit = event => {
  //   event.preventDefault();
  // }

  const classes = useStyles();
  return(
    <Container className={classes.container} maxWidth="xs">
      <Typography className={classes.title} position="static" component="h1" variant="h4">
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
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );

}

// export default function TextButtons() {
//   const classes = useStyles();
//   const [{ user }, dispatch] = useStateValue();

//   return (
//     <div>
//       <Button color="primary" className={classes.button}
//           onClick={() => dispatch({
//               type: 'updateUser',
//               newUser: 'Steve'
//           })}
//       >
//         Log In 
//       </Button>
//     </div>
//   );
// }

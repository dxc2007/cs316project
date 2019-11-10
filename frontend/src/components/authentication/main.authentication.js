import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Background1 from '../../public/backgroundimages/bb1.jpg';
import Background2 from '../../public/backgroundimages/bb2.jpg';
import Background3 from '../../public/backgroundimages/bb3.jpg';
import Background4 from '../../public/backgroundimages/bb4.jpg';

import Login from './login.authentication';
import Register from './register.authentication';

const chooseBackground = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const Background = chooseBackground([Background1, Background2, Background3, Background4]);

const useStyles = makeStyles(theme => ({
  root: {
    height: '89vh',
  },
  container: {
    marginTop: theme.spacing(4),
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
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  visableToggle: {
    display: 'flex'
  },
  hiddenToggle: {
      display: 'none'
  }
}));

const children = [
  <ToggleButton className="toggle" key={1} value="login">
    Login
  </ToggleButton>,
  <ToggleButton key={2} value="register">
    Register
  </ToggleButton>
  ];

export default function Authentication() {
    const classes = useStyles();
    const [alignment, setAlignment] = useState('login');
    const [toggle1, setToggle1] = useState(classes.visableToggle);
    const [toggle2, setToggle2] = useState(classes.hiddenToggle);

    const handleChange = (event, newAlignment) => {
        if(newAlignment === 'login'){
          setToggle1(classes.visableToggle);
          setToggle2(classes.hiddenToggle);
        }else{
          setToggle1(classes.hiddenToggle);
          setToggle2(classes.visableToggle);
        }
        setAlignment(newAlignment);
    };

    return(
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.background} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={toggle1}>
            <Login/>
          </div>
          <div className={toggle2}>
            <Register/>
          </div>
          <Container className={classes.container}>
            <ToggleButtonGroup className={classes.toggle} size="medium" value={alignment} exclusive onChange={handleChange}>
              {children}
            </ToggleButtonGroup>
          </Container>
        </Grid>
      </Grid>
      
    );
  
  }
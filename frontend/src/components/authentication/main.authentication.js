import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
    marginTop: theme.spacing(14),
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
}));

export default function Authentication() {
  
    const classes = useStyles();
    return(
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.background} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Tabs></Tabs>
          <Register/>
        </Grid>
      </Grid>
      
    );
  
  }
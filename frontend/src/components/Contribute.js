import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../state';
import WorkForm from './WorkForm';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
  }
}));

export default function Contribute() {
  const classes = useStyles();
  const [{ user }, dispatch] = useStateValue();

  return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8} md={5} className={classes.item} square>
          <WorkForm></WorkForm>
        </Grid>
      </Grid>
  );
}

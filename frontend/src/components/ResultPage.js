import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../state';
import { Typography } from '@material-ui/core';

import ResultGrid from './ResultGrid'

const useStyles = makeStyles(theme => ({
  root: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
  }
}));

export default function ResultPage() {
    const classes = useStyles();
    const [{ searchResult }, dispatch] = useStateValue();

    return (
        <div className={classes.root}>
        <ResultGrid/>
        </div>
    );
}

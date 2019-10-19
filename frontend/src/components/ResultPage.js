import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../state';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import ResultGrid from './ResultGrid'

const useStyles = makeStyles(theme => ({
  root: {
      margin: theme.spacing(5),
  },
  paper: {
      minHeight: '150px',
      height: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textAlign: 'center',
  },
  container: {
      alignItems: 'stretch',
  },
  item: {
    paddingBottom: theme.spacing(2)
  }

}));

export default function ResultPage() {
    const classes = useStyles();
    const [{ searchResult, searchQuery }, dispatch] = useStateValue();

    return (
        <div className={classes.root}>
            <Grid className={classes.container} container spacing={3}>
                <Grid className={[classes.container, classes.item].join(' ')} container item xs={6}>
                    <Grid className={classes.item} item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant='h6'>
                                Quick Query    
                            </Typography> 
                            <Typography variant='body2'>
                            {(searchQuery) ? 
                                'The average salary for a '
                                + searchQuery.job +
                                ' in ' 
                                + searchQuery.location
                                + ' is: '
                                : null}
                            </Typography> 
                        </Paper>
                    </Grid>
                    <Grid className={classes.item} item xs={12}>
                        <Paper className={classes.paper}>
                        <Typography variant='h6'>
                                Housing Snapshot  
                            </Typography>
                            <Typography variant='body2'>
                            {(searchQuery) ? 
                                'The average housing price in '
                                + searchQuery.location
                                + ' is: '
                                : null}
                            </Typography> 
                            
                        </Paper>
                    </Grid>
                    <Grid className={classes.item} item xs={12}>
                        <ResultGrid/>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                <Paper className={classes.paper}>

                <Typography variant='h6' color='inherit'>
                    Map  
                </Typography>
                </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

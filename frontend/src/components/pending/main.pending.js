import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import RolesTable from './roles.pending';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    paper: {
      maxWidth: "1000px",
      minWidth: "650px",
      marginTop: theme.spacing(3),
      width: '100%',
      overflowX: 'auto',
      marginBottom: theme.spacing(2),
    },
    table: {
        maxWidth: "1000px",
        minWidth: "650px",
    },
  }));

export default function Pending() {
    const classes = useStyles();

    return(
        <Container className={classes.table}>
            <RolesTable/>
        </Container>
        
    );
    
}
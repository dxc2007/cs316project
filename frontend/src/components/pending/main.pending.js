import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import RolesTable from './roles.pending';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    title:{
        fontWeight: "bold",
        fontSize: 40,
        color: theme.palette.primary.dark
    },
    header: {
        display: "flex",
        flexDirection: "row",
        marginTop: "40px",
        marginBottom: "20px"
    },
    table: {
        maxWidth: "1000px",
        minWidth: "650px",
    },
    button: {
        // alignSelf: "right",
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    }
  }));

export default function Pending() {
    const classes = useStyles();

    return(
        <Container className={classes.root}>
            <Container className={classes.table}>
                <Grid className={classes.header} container xs={12}>
                    <Grid item xs={10}>
                        <Typography className={classes.title} variant="h2">
                                Approve or Deny Pending Entries
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={classes.button} size="large">
                                <Link className={classes.link} to="/profile">
                                    Back to Profile
                                </Link>
                        </Button>
                    </Grid>
                </Grid>

                <RolesTable/>
            </Container>
        </Container>
        
    );
    
}
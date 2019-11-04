import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Options from './options.profile';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    icon:{
        color: "rgb(111,183,230)",
        marginBottom: 0,
    },
    title: {
        fontWeight: "bold",
        fontSize: 40,
        marginBottom: 20,
        marginTop: 0
    }
  });

export default function Profile() {
    const classes = useStyles();

    return(
        <Container className={classes.root}>
            <AccountCircleIcon className={classes.icon} style={{ fontSize: 150 }} />
            <Typography className={classes.title}>Welcome, User</Typography>
            <Options/>
        </Container>
    );
}

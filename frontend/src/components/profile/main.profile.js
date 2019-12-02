import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link, useLocation } from 'react-router-dom';

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
        marginTop: 0,
    },
    title: {
        fontWeight: "bold",
        fontSize: 40,
        marginBottom: 20,
        marginTop: 0
    },
    logout:{
        alignSelf: "flex-end",
        backgroundColor: "rgb(111,183,230)",
        width: "100px",
        height: "50px",
        fontSize: "16px",
        marginTop: "10px",
        marginBottom: 0,
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    }
  });

function logout(e) {
    e.preventDefault();
    localStorage.removeItem("key");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
}

export default function Profile() {
    const classes = useStyles();

    return(
        <div>
            {!localStorage.getItem("key") ? 
                (<div>Login in Required</div>) : 
                (<Container className={classes.root}>
                    <Button className={classes.logout} onClick={(e) => logout(e)} size="small">
                        <Link className={classes.link} to="/login">
                            logout
                        </Link>
                    </Button>
                    <AccountCircleIcon className={classes.icon} style={{ fontSize: 150 }} />
                    <Typography className={classes.title}>Welcome, {localStorage.getItem("username")}</Typography>
                    <Options/>
                </Container>)
            }
        </div>
    );
}

import React from 'react'
import Search from './Search'
import { makeStyles } from '@material-ui/core/styles'
import { useStateValue } from '../state'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(5),
    },
    title: {
        textAlign: "center",
        fontSize: "50px",
    }
  
  }));

const SearchPage = () => {
    const classes = useStyles();
    const [{ searchResult }, dispatch] = useStateValue();

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant='h2'>Find information about jobs in your area. </Typography> 
            <Search/>
        </div>
    );
}
export default SearchPage;
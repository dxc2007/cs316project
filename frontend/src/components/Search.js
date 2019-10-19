import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStateValue } from '../state'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    container: {
      flexGrow: 1, 
      display: 'flex',
      alignItems: 'center',
      padding: '2px 4px',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    iconButton: {
        padding: 10,
      },
    search: {
        color: 'black',
    }
  }));

const Search = () => {
      
    const [{ searchResult }, dispatch] = useStateValue();
    const [values, setValues] = React.useState({
        location: '',
        job: '',
      });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const classes = useStyles();

    return(
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-location"
                label="Location"
                className={classes.textField}
                value={values.location}
                onChange={handleChange('location')}
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="outlined-job"
                label="Job position"
                className={classes.textField}
                value={values.job}
                onChange={handleChange('job')}
                margin="normal"
                variant="outlined"
            />
            <IconButton className={classes.iconButton} aria-label="search">
                <Link className={classes.search} to="/result">
                    <SearchIcon
                    onClick={() => dispatch({
                        type: 'handleSearch',
                        searchQuery: {location: values.location, job: values.job}
                    })}
                    />
                </Link>
            </IconButton>
        </form>
    );
}
export default Search;
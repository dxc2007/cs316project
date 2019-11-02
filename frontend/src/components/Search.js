import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStateValue } from '../state'
import { Link } from 'react-router-dom'
import axios from 'axios'

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

const parseWagePosting = async (posting) => {
    const wagePosting = posting.wageposting[0];
    // get company name 
    let employerData = await axios.get("http://localhost:8000/api/employers/"+ wagePosting.employerid);

    return {
        company: employerData.data.employer_name, 
        location: posting.city, 
        position: wagePosting.position, 
        year: wagePosting.year, 
        wage: wagePosting.wage,
    }
}

const fetchSearchResult = async (job, location) => {
     // query backend 
     const url = "http://localhost:8000/api/wages/?city=" + location + "&position=" + job;
     let wageInfo = await axios.get(url);
     return await Promise.all(wageInfo.data.map(item => 
         parseWagePosting(item)));
}

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
                    onClick={async () => {
                        dispatch({
                            type: 'updateSearchQuery',
                            searchQuery: {location: values.location, job: values.job}
                        });
                        const result = await fetchSearchResult(values.job, values.location);
                        dispatch({
                            type: 'updateSearchResult',
                            searchResult: result,
                        });
                    }}
                    />
                </Link>
            </IconButton>
        </form>
    );
}
export default Search;
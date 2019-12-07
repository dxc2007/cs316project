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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
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

const parseWagePosting = (posting) => {
    return {
        company: posting.employer, 
        location: posting.city, 
        position: posting.position,
        year: posting.year, 
        wage: posting.wage,
        id: posting.id, 
    }
}

const fetchSearchResult = async (job, location) => {
     const url = "http://67.159.88.90:8000/api/wages/?city=" + location + "&position=" + job;
     let wageInfo = await axios.get(url);

     if (!wageInfo || !wageInfo.data || !wageInfo.data.results || wageInfo.data.results.length === 0) {
         return null;
     }
     
     return {
        ...wageInfo.data,
        results: wageInfo.data.results.map(item => 
            parseWagePosting(item)),
     };
}

const fetchHousingResult = async (location) => {
    const url = "http://67.159.88.90:8000/api/housingsummary/?city=" + location;
    let housingInfo = await axios.get(url);

    if (!housingInfo || !housingInfo.data) {
        return null;
    } 

    return housingInfo.data;
}

const fetchWageResult = async (job, location) => {
    const url = "http://67.159.88.90:8000/api/wagesummary/?city=" + location + "&position=" + job;
    let wageInfo = await axios.get(url);

    if (!wageInfo || !wageInfo.data) {
        return null;
    } 

    return wageInfo.data;
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
                        const housingResult = await fetchHousingResult(values.location);
                        dispatch({
                            type: 'updateHousingResult',
                            housingResult: housingResult, 
                        })
                        
                        const result = await fetchSearchResult(values.job, values.location);
                        dispatch({
                            type: 'updateSearchResult',
                            searchResult: result,
                        });
                        const wageResult = await fetchWageResult(values.job, values.location);
                        dispatch({
                            type: 'updateWageResult',
                            wageResult: wageResult,
                        });
                    }}
                    />
                </Link>
            </IconButton>
        </form>
    );
}
export default Search;
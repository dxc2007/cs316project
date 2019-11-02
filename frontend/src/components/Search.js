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
    return await Promise.all(posting.wageposting.map(async entry => {
        let employerData = await axios.get("http://localhost:8000/api/employers/"+ entry.employerid);
        return {
            company: employerData.data.employer_name, 
            location: posting.city, 
            position: entry.position, 
            year: entry.year, 
            wage: entry.wage,
        }
    }));
}

const fetchSearchResult = async (job, location) => {
     const url = "http://localhost:8000/api/wages/?city=" + location + "&position=" + job;
     let wageInfo = await axios.get(url);
     return await 
         wageInfo.data.map(item => 
            parseWagePosting(item))
        .reduce((acc, val) => acc.concat((val), []));
}

const fetchHousingResult = async (location) => {
    const url = "http://localhost:8000/api/housingprices/?city=" + location;
    let housingInfo = await axios.get(url);

    if (housingInfo.data[0].housingposting.length > 0) {
        const housingData = housingInfo.data[0].housingposting.map(posting => posting.price);
        return {
            ave: housingData.reduce((a,b) => a + b, 0) / housingData.length, 
            min: Math.min(...housingData), 
            max: Math.max(...housingData)
        }
    } else {
        return null;
    }
}

const calculateWageResult = (result) => {
    if (result.length > 0) {
        const wages = result.map(post => post.wage);
        return {
            ave: wages.reduce((a,b) => a + b, 0) / wages.length, 
            min: Math.min(...wages), 
            max: Math.max(...wages)
        }
    } else {
        return null;
    }
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
                        const wageResult = calculateWageResult(result);
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
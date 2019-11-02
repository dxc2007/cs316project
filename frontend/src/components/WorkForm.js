import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import { useStateValue } from '../state';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';

// TODO: add toggle for company and location fields to add custom input 
// TODO: submit POST request 

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(1),
  },
  container: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
      marginTop: theme.spacing(5),
      marginBotton: theme.spacing(5)
  },
  input: {
    display: 'none',
  },
  formControl: {
    minWidth: 240, 
    margin: theme.spacing(1)
  }
}));

const postWork = async () => {
    
}



export default function WorkForm() {
  const classes = useStyles();
  const [{ user , companies, locations }, dispatch] = useStateValue();
  const [values, setValues] = React.useState({
    company: '',
    location: '',
    position: '',
    year: '',
    salary: '',
  });
  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
  };

  const fetchCompanyOptions = async () => {
    const companies = await axios.get("http://localhost:8000/api/employers/");
    if (!companies || !companies.data || companies.data.length === 0) {
      return null;
    } 

    dispatch({
      type: 'getCompanies',
      companies: companies.data,
    });
  };

  const fetchLocationOptions = async () => {
    const locations = await axios.get("http://localhost:8000/api/sites/");
    if (!locations || !locations.data || locations.data.length === 0) {
      return null;
    } 
    dispatch({
      type: 'getLocations',
      locations: locations.data,
    });

  }

  const renderCompanyOptions = () => {
    if (companies) {
      return companies.map(company => {
        return <MenuItem key={company.employerid} value={company.employerid}>{company.employer_name}</MenuItem>
      })
    }
  }

  const renderLocationOptions = () => {
    if (locations) {
      return locations.map(location => {
        return <MenuItem key={location.siteid} value={location.siteid}>{location.city}, {location.state}</MenuItem>
      })
    }
  }

  useEffect(() => fetchCompanyOptions(), []);
  useEffect(() => fetchLocationOptions(), []);


  return (
      <Container className={classes.container}>
          <Typography className={classes.header} position="static" component="h1" variant="h6">Add your work experience</Typography>
          <Typography position="static" component="body1">
            Which company did you work at?
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              onChange={handleChange('company')}
            >
          {renderCompanyOptions()}
        </Select>
      </FormControl>
            <Typography position="static" component="body1">
                Where was the office located? 
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
            onChange={handleChange('location')}
            >
          {renderLocationOptions()}
        </Select>
      </FormControl>
          <Typography position="static" component="body1">
                What position did you hold? 
          </Typography>
          <TextField 
              name = "position"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Position"
              value = {null}
              onChange={handleChange('position')}
            />
          <Typography position="static" component="body1">
                When is this information from?
          </Typography>
          <TextField 
              name = "year"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Year"
              value = {null}
              onChange={handleChange('year')}
            />
          <Typography position="static" component="body1">
                What was your salary?
          </Typography>
          <TextField 
              name = "salary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Salary"
              value = {null}
              onChange={handleChange('salary')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
      </Container>
  );
}

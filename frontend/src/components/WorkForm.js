import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography, Container, InputLabel } from '@material-ui/core';
import { useStateValue } from '../state';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(1),
  },
  container: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
      marginTop: theme.spacing(5),
      marginBotton: theme.spacing(5),
      flex: "0 0 100%",
  },
  input: {
    display: 'none',
  },
  formControl: {
    minWidth: 240, 
    margin: theme.spacing(1),
    flex: "0 0 100%",
  },
  subtext: {
    flex: "0 0 35%",
    marginBottom: theme.spacing(3),
    paddingRight: theme.spacing(1),
  },
  subtext_loc: {
    flex: "0 0 25%",
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  fab: {
    margin: theme.spacing(1)
  }
}));



export default function WorkForm() {
  const classes = useStyles();
  const [{ user , companies, locations }, dispatch] = useStateValue();
  const [values, setValues] = React.useState({
    company: '',
    newCompany: '',
    newIndustry: '',
    newCity: '',
    newState: '',
    newZip: '',
    location: '',
    position: '',
    year: '',
    salary: '',
  });
  const [didPost, setDidPost] = React.useState('');

  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
      console.log(values);
  };

  const renderAddNewCompany = () => {
    return <MenuItem key="add-new-company" value="add-new-company">Add New Company...</MenuItem>
  }

  const renderAddNewLocation = () => {
    return <MenuItem key="add-new-location" value="add-new-location">Add New Location...</MenuItem>
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

  const postNewCompany = () => async () => {
    const res = await axios.post("http://localhost:8000/api/employers/", {
      "employer_name": values.newCompany,
      "industry": values.newIndustry,
    })
    setDidPost();
    setValues({ ...values, company: res.data.employerid });
  }

  const postNewLocation = () => async () => {
    const res = await axios.post("http://localhost:8000/api/sites/", {
      "zip_code": values.newZip,
      "city": values.newCity,
      "state": values.newState,
    });
    setDidPost();
    setValues({...values, location: res.data.siteid});
  }

  const postWorkForm = () => async () => {
    const res = await axios.post("http://localhost:8000/api/wagebuffers/", {
      "siteid": values.location,
      "employerid": values.company,
      "uid": 1,
      "position": values.position,
      "wage": values.salary,
      "year": values.year,
    });

    console.log(res);

    setValues({
      company: '',
      newCompany: '',
      newIndustry: '',
      newCity: '',
      newState: '',
      newZip: '',
      location: '',
      position: '',
      year: '',
      salary: '',
    });
  }

  useEffect(() => {
    const fetchCompanyOptions = async () => {
      console.log("fetching companies");
      const companies = await axios.get("http://localhost:8000/api/employers/");
      if (!companies || !companies.data || companies.data.length === 0) {
        return null;
      } 
  
      dispatch({
        type: 'getCompanies',
        companies: companies.data,
      });
    };
    fetchCompanyOptions();
  }, [didPost]);

  useEffect(() => {
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
    fetchLocationOptions();
  }, [didPost]);


  return (
      <Container className={classes.container}>
          <Typography className={classes.header} position="static" component="h1" variant="h6">Add your work experience</Typography>
          <Typography className={classes.text} position="static" component="body1">
            Which company did you work at?
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={values.company}
              onChange={handleChange('company')}
            >
          {renderAddNewCompany()}
          {renderCompanyOptions()}
        </Select>
      </FormControl>
      {values.company == "add-new-company" ? 
      <React.Fragment>
        <TextField
          className={classes.subtext}
          name = "new-company"
          variant = "standard"
          margin = "normal"
          label = "Company Name"
          value = {null}
          onChange = {handleChange('newCompany')}
        ></TextField>
        <TextField
          className={classes.subtext}
          name = "new-industry"
          variant = "standard"
          margin = "normal"
          label = "Industry Type"
          value = {null}
          onChange = {handleChange('newIndustry')}
        ></TextField>
        <Fab color="primary" onClick={postNewCompany()} size="small" aria-label="add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </React.Fragment> :
        null}
            <Typography className={classes.text} position="static" component="body1">
                Where was the office located? 
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
            onChange={handleChange('location')}
            value={values.location}
            >
          {renderAddNewLocation()}
          {renderLocationOptions()}
        </Select>
      </FormControl>
      {values.location == "add-new-location" ? 
      <React.Fragment>
        <TextField
          className={classes.subtext_loc}
          name = "new-city"
          variant = "standard"
          margin = "normal"
          label = "City"
          value = {null}
          onChange = {handleChange('newCity')}
        ></TextField>
        <TextField
          className={classes.subtext_loc}
          name = "new-state"
          variant = "standard"
          margin = "normal"
          label = "State"
          value = {null}
          onChange = {handleChange('newState')}
        ></TextField>
        <TextField
          className={classes.subtext_loc}
          name = "new-zip"
          variant = "standard"
          margin = "normal"
          label = "Zip Code"
          value = {null}
          onChange = {handleChange('newZip')}
        ></TextField>
        <Fab color="primary" onClick={postNewLocation()} size="small" aria-label="add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </React.Fragment> :
        null}
          <Typography className={classes.text} position="static" component="body1">
                What position did you hold? 
          </Typography>
          <TextField 
              name = "position"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Position"
              value = {values.position}
              onChange={handleChange('position')}
            />
          <Typography className={classes.text} position="static" component="body1">
                When is this information from?
          </Typography>
          <TextField 
              name = "year"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Year"
              value = {values.year}
              onChange={handleChange('year')}
            />
          <Typography className={classes.text} position="static" component="body1">
                What was your salary?
          </Typography>
          <TextField 
              name = "salary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Salary"
              value = {values.salary}
              onChange={handleChange('salary')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={postWorkForm()}
            >
              Submit
            </Button>
      </Container>
  );
}

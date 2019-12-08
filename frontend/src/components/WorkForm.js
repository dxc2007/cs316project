import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography, Container, InputLabel } from '@material-ui/core';
import { useStateValue } from '../state';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
      textAlign: "center",
      flex: "0 0 100%",
  },
  subtitle: {
    marginBottom: theme.spacing(5),
    textAlign: "center",
    flex: "0 0 100%",
  },
  input: {
    display: 'none',
  },
  addButton: {
    margin: theme.spacing(1),
    flex: "0 0 20%",
  },
  autoComplete: {
    minWidth: 240, 
    margin: theme.spacing(1),
    flex: "0 0 70%",
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
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5)
  }
}));



export default function WorkForm() {
  const classes = useStyles();
  const [{ user , companies, locations }, dispatch] = useStateValue();
  const [values, setValues] = React.useState({
    company: '',
    addCompany: false, 
    addLocation: false, 
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
  const [didPost, setDidPost] = React.useState(false);

  const handleChange = name => (event, val) => {
    if (name === "company" || name === "location") {
      if (val) {
        setValues({...values, [name]: val});
      } else {
        setValues({...values, [name]: null});
      }
    } else {
      setValues({ ...values, [name]: event.target.value });
    }
      console.log(values);
  };

  const toggleAddCompany = () => {
    setValues({...values, addCompany: !values.addCompany});
  }

  const toggleAddLocation = () => {
    setValues({...values, addLocation: !values.addLocation});
  }

  const postNewCompany = () => async () => {
    const res = await axios.post("http://67.159.88.90:8000/api/employers/", {
      "employer_name": values.newCompany,
      "industry": values.newIndustry,
    })
    setDidPost(true);
    setValues({ ...values, company: res.data, newCompany: "", newIndustry: "", addCompany: false});
  }

  const postNewLocation = () => async () => {

    const res = await axios.post("http://67.159.88.90:8000/api/sites/", {
      "zip_code": values.newZip,
      "city": values.newCity,
      "state": values.newState,
    });
    setDidPost(true);
    setValues({...values, location: res.data, newCity: "", newZip: "", newState: "", addLocation: false});
  }

  const postWorkForm = () => async () => {
    const url = "http://67.159.88.90:8000/api/userwagepending/";
    const data = {
      "siteid": values.location.siteid,
      "employerid": values.company.employerid,
      "uid": localStorage.getItem('uid'),
      "position": values.position,
      "wage": values.salary,
      "year": values.year,
    };
    console.log(data);
    const res = await axios.post(url, data, {
        headers: {
          "Authorization": "Token " + localStorage.getItem("key"),
          "Content-Type": "application/json",
        }
      }).catch(err => console.log(err));
    
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
      const init = await axios.get("http://67.159.88.90:8000/api/employers/");
      if (!init || !init.data || init.data.length === 0) {
        return null;
      } 
      const count = init.data.count;
  
      const companies = await axios.get("http://67.159.88.90:8000/api/employers/?limit=" + count);
      
  
      dispatch({
        type: 'getCompanies',
        companies: companies.data.results,
      });
    };
    fetchCompanyOptions();
    setDidPost(false);
  }, [didPost]);

  useEffect(() => {
    const fetchLocationOptions = async () => {
      const init = await axios.get("http://67.159.88.90:8000/api/sites/");
      if (!init || !init.data || init.data.length === 0) {
        return null;
      } 
      const count = init.data.count;
      const locations = await axios.get("http://67.159.88.90:8000/api/sites/?limit=" + count);
      dispatch({
        type: 'getLocations',
        locations: locations.data.results,
      });
    }
    fetchLocationOptions();
    setDidPost(false);
  }, [didPost]);


  return (
      <Container className={classes.container}>
          <Typography className={classes.header} position="static" component="h1" variant="h4">Add your work experience</Typography>
          <Typography className={classes.subtitle} position="static" variant="subtitle1">Contribute and give back to the Blueberry community!</Typography>
          <Typography className={classes.text} position="static" component="body1">
            Which company did you work at?
          </Typography>
      <Autocomplete
        className={classes.autoComplete}
        id="company-select"
        options={companies}
        getOptionLabel={company => company ? company.employer_name : ""} 
        style={{ width: 300 }}
        disableOpenOnFocus={true}
        renderInput={params => {
          return (
          <TextField {...params} variant="outlined" fullWidth />
        )}}
        onChange={handleChange('company')}
        value={values.company}
      />
      <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={toggleAddCompany}
            >
              Add Company
            </Button>
      {values.addCompany ? 
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
          <Autocomplete
            className={classes.autoComplete}
            id="location-select"
            options={locations}
            getOptionLabel={location => location ? (location.city + ", " + location.state) : ""
            }
            style={{ width: 300 }}
            disableOpenOnFocus={true}
            renderInput={params => {
              return (
              <TextField {...params} variant="outlined" fullWidth />
            )}}
        onChange={handleChange('location')}
        value={values.location}
      />
      <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={toggleAddLocation}
            >
              Add Location
            </Button>
      {values.addLocation ?
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

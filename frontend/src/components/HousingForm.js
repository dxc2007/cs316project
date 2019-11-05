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
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5)
  }
}));



export default function HousingForm() {
  const classes = useStyles();
  const [{ user , locations }, dispatch] = useStateValue();
  const [values, setValues] = React.useState({
    newCity: '',
    newState: '',
    newZip: '',
    location: '',
    price: '',
    year: '',
  });
  const [didPost, setDidPost] = React.useState('');

  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
      console.log(values);
  };

  const renderAddNewLocation = () => {
    return <MenuItem key="add-new-location" value="add-new-location">Add New Location...</MenuItem>
  }

  const renderLocationOptions = () => {
    if (locations) {
      return locations.map(location => {
        return <MenuItem key={location.siteid} value={location.siteid}>{location.city}, {location.state}</MenuItem>
      })
    }
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

  const postHousingForm = () => async () => {
    const res = await axios.post("http://localhost:8000/api/housingbuffers/", {
      "siteid": values.location,
      "price": values.price,
      "year": values.year,
    });

    console.log(res);

    setValues({
      newCity: '',
      newState: '',
      newZip: '',
      location: '',
      price: '',
      year: '',
    });
  }


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
          <Typography className={classes.header} position="static" component="h1" variant="h4">Add your housing experience</Typography>
          <Typography className={classes.subtitle} position="static" variant="subtitle1">Contribute and give back to the Blueberry community!</Typography>
            <Typography className={classes.text} position="static" component="body1">
                Where did you live?
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
                When did you live there?
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
                How much did you buy/sell the property for?
          </Typography>
          <TextField 
              name = "price"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Price"
              value = {values.price}
              onChange={handleChange('price')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={postHousingForm()}
            >
              Submit
            </Button>
      </Container>
  );
}

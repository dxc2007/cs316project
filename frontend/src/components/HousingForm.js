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
  text: {
    flex: "0 0 100%",
    textAlign: "center",
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
    addLocation: false, 
  });
  const [didPost, setDidPost] = React.useState(false);

  const handleChange = name => (event, val) => {
    if (name === "location") {
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

  const toggleAddLocation = () => {
    setValues({...values, addLocation: !values.addLocation});
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

  const postHousingForm = () => async () => {
    const res = await axios.post("http://67.159.88.90:8000/api/housingbuffers/", {
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
          <Typography className={classes.header} position="static" component="h1" variant="h4">Add your housing experience</Typography>
          <Typography className={classes.subtitle} position="static" variant="subtitle1">Contribute and give back to the Blueberry community!</Typography>
            <Typography className={classes.text} position="static" component="body1">
                Where did you live?
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

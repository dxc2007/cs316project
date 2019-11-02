import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import { useStateValue } from '../state';

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
}));

const postWork = async () => {
    
}

export default function WorkForm() {
  const classes = useStyles();
  const [{ user }, dispatch] = useStateValue();
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

  return (
      <Container className={classes.container}>
          <Typography className={classes.header} position="static" component="h1" variant="h6">Add your work experience</Typography>
          <Typography position="static" component="body1">
            Which company did you work at?
          </Typography>
           <TextField 
              name = "company"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Company"
              value = {null}
              onChange={handleChange('company')}
            />
            <Typography position="static" component="body1">
                Where was the office located? 
          </Typography>
          <TextField 
              name = "location"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Location"
              value = {null}
              onChange={handleChange('location')}
            />
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

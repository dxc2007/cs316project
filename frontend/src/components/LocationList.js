// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import 'isomorphic-fetch';
import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    auto: {
        minWidth: 240, 
        margin: theme.spacing(1),
        flex: "0 0 70%",
    },
}));

export default function LocationList(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
        const init = await axios.get("http://67.159.88.90:8000/api/sites/");
        if (!init || !init.data || init.data.length === 0) {
          return null;
        } 
        const count = init.data.count;
        const locations = await axios.get("http://67.159.88.90:8000/api/sites/?limit=" + count);
        
      if (active) {
        setOptions(locations.data.results);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      className={classes.auto}
      id="location-select"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.employer_name === value.employer_name}
      getOptionLabel={location => location ? (location.city + ", " + location.state + ", " + location.zip_code) : ""}
      options={options}
      loading={loading}
      onChange={(event, val) => props.setLocation(val)}
      value={props.location}
      renderInput={params => (
        <TextField
          {...params}
          fullWidth
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
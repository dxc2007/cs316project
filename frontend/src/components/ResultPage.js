import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../state';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/core/Slider';


import ResultGrid from './ResultGrid'

const useStyles = makeStyles(theme => ({
  root: {
      margin: theme.spacing(5),
  },
  paper: {
      minHeight: '150px',
      height: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textAlign: 'center',
  },
  container: {
      alignItems: 'stretch',
  },
  item: {
    paddingBottom: theme.spacing(2)
  },
  slider: {
      width: "80%",
  },
  map: {
      width: "80%",
  }

}));

const marks = [
    {
      value: 0,
      label: 'Minimum',
    },
    {
      value: 1,
      label: 'Average',
    },
    {
      value: 2,
      label: 'Maximum',
    },
  ];
  
  function valuetext(value) {
    return `${value}°C`;
  }
  
  function valueLabelFormat(value) {
    return marks.findIndex(mark => mark.value === value) + 1;
  }

export default function ResultPage() {
    const classes = useStyles();
    const [{ searchResult, searchQuery, housingResult, wageResult }, dispatch] = useStateValue();

    const [toggle, setToggle] = React.useState({
        wage: 1,
        housing: 1,
      });
    const handleChange = name => (event, newVal) => {
        setToggle({ ...toggle, [name]: newVal });
    };

    const html = '<iframe width="600" className=classes.map height="700" frameborder="0" scrolling="no" src="//plot.ly/~yuqi98/70.embed"></iframe>';
    const [map, setMap] = React.useState({__html: html});

    const renderHousingValue = () => {
        if (!housingResult || !housingResult.minimum) {
            return null;
        }
        if (toggle.housing == 0) {
            return housingResult.minimum.toLocaleString();
        } else if (toggle.housing == 1) {
            return housingResult.average.toLocaleString();
        } else {
            return housingResult.maximum.toLocaleString();
        }
    }

    const renderWageValue = () => {
        if (!wageResult ||  !wageResult.minimum) {
            return null;
        }
        if (toggle.wage == 0) {
            return wageResult.minimum.toLocaleString();
        } else if (toggle.wage == 1) {
            return wageResult.average.toLocaleString();
        } else {
            return wageResult.maximum.toLocaleString();
        }
    }

    const createMarkup = () => {
        return map;
    }

    return (
        <div className={classes.root}>
            <Grid className={classes.container} container spacing={3}>
                <Grid className={[classes.container, classes.item].join(' ')} container item xs={6}>
                    <Grid className={classes.item} item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant='h6'>
                                Quick Query    
                            </Typography> 
                            <Typography variant='body2'>
                            {(searchQuery) ? 
                                <React.Fragment><span>The average salary in </span>
                                <b>{searchQuery.location}</b>
                                <span> for a </span>
                                <b>{searchQuery.job}</b>
                                <span> is: </span></React.Fragment>
                                : null}
                            </Typography> 
                            {(searchResult && wageResult) ? 
                             <React.Fragment><Slider
                             className={classes.slider}
                             defaultValue={1}
                             getAriaValueText={valuetext}
                             aria-labelledby="discrete-slider-always"
                             min={0}
                             onChange={handleChange('wage')}
                             max={2}
                             marks={marks}/>
                             <Typography>
                             {renderWageValue()} USD
                            </Typography></React.Fragment>
                                : null}
                        </Paper>
                    </Grid>
                    <Grid className={classes.item} item xs={12}>
                        <Paper className={classes.paper}>
                        <Typography variant='h6'>
                                Housing Snapshot  
                            </Typography>
                            <Typography variant='body2'>
                            {(searchQuery) ? 
                                <React.Fragment><span>The average housing price in  </span>
                                <b>{searchQuery.location}</b>
                                <span>  is: </span></React.Fragment>
                                : null}
                            </Typography> 
                            {(searchResult && housingResult) ? 
                             <React.Fragment><Slider
                             className={classes.slider}
                             defaultValue={1}
                             getAriaValueText={valuetext}
                             aria-labelledby="discrete-slider-always"
                             min={0}
                             onChange={handleChange('housing')}
                             max={2}
                             marks={marks}/>
                             <Typography>
                             {renderHousingValue()} USD
                            </Typography></React.Fragment>
                                : null}
                            
                        </Paper>
                    </Grid>
                    <Grid className={classes.item} item xs={12}>
                        <ResultGrid/>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                <Paper className={classes.paper}>

                <Typography variant='h6' color='inherit'>
                </Typography>
                <div dangerouslySetInnerHTML={createMarkup()}/>
                </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

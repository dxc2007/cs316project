import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStateValue } from '../state';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

export default function DenseTable() {
  const classes = useStyles();
  const [{ searchResult }, dispatch] = useStateValue();

  const renderListingGrid = (searchResult) => {
    console.log(searchResult);
    if (searchResult) {
        return searchResult.map(listing => (
              <TableRow key={listing.company + listing.wage}>
                <TableCell align="right">{listing.company}</TableCell>
                <TableCell align="right">{listing.location}</TableCell>
                <TableCell align="right">{listing.position}</TableCell>
                <TableCell align="right">{listing.year}</TableCell>
                <TableCell align="right">{listing.wage}</TableCell>
              </TableRow>
            ))
    } else {
        return 'No Search Results';
    }
}

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Wage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderListingGrid(searchResult)}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
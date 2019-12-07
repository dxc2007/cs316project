import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { useStateValue } from '../state';
import axios from 'axios';


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
  const [toggle, setToggle] = React.useState({
    wage: 1,
    housing: 1,
  });

  const [page, setPage] = React.useState(0);

  const renderListingGrid = (searchResult) => {
    if (searchResult.results) {
        return searchResult.results.map(listing => (
              <TableRow key={listing.id}>
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

const updateSearchResult = async (url) => {
  let wageInfo = await axios.get(url);
  if (!wageInfo || !wageInfo.data || !wageInfo.data.results || wageInfo.data.results.length === 0) {
    return null;
  }

  const newSearchResult =  {
    ...wageInfo.data,
    results: wageInfo.data.results.map(posting => 
        ({
        company: posting.employer, 
        location: posting.city, 
        position: posting.position,
        year: posting.year, 
        wage: posting.wage,
        id: posting.id, 
    })),
  };

  dispatch({
    type: 'updateSearchResult',
    searchResult: newSearchResult,
  });
}


const handlePageChange = (event, newPage) => {
  if (parseInt(newPage) > parseInt(page)) {
    updateSearchResult(searchResult.next);
  } else {
    updateSearchResult(searchResult.previous);
  }
  setPage(newPage);
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
          <TablePagination
            count={searchResult.count}
            rowsPerPage={10}
            rowsPerPageOptions={[]}
            page={page}
            onChangePage={handlePageChange}
        />
        </Table>
      </Paper>
    </div>
  );
}
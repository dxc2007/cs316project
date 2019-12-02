import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {lighten} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';


function createData(company, location, position, year, wage, user, pID) {
  return { company, location, position, year, wage, user, pID};
}

// const rows = [
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 1),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 2),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 3),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 4),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 5),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 6),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 7),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 8),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 9),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 10),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 11),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 12),
//   createData('Google', 'Palo Alto', 'SWE', 2018, 140000, 'Jeff Dean', 13),
// ];


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'company', numeric: false, disablePadding: true, label: 'Company' },
  { id: 'location', numeric: true, disablePadding: false, label: 'Location' },
  { id: 'position', numeric: true, disablePadding: false, label: 'Position' },
  { id: 'year', numeric: true, disablePadding: false, label: 'Year' },
  { id: 'wage', numeric: true, disablePadding: false, label: 'Wage (USD)' },
  { id: 'user', numeric: true, disablePadding: false, label: 'User' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all roles' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),

  },
  icons: {
    flex: '1 1 100%',
    justifyContent: "right",
    maxWidth: "100px"
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Pending Roles
        </Typography>
      )}

      {numSelected > 0 ? (
        <div className={classes.icons}>
          <Tooltip title="Approve">
            <IconButton aria-label="approve">
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: lighten(theme.palette.primary.main, 0.96),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


  export default function RolesTable() {
    // const rows = await getRows();
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('company');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);


    useEffect(() => {
      const url = "http://67.159.88.90:8000/api/wagebuffers/";
      axios.get(url, {headers: {"Authorization": "Token " + localStorage.getItem("key")}}).then(async function(res){
        console.log(res)
        if(res.data){
          setRows(await Promise.all(res.data.results.map(data => {
            console.log(data)
            return createData(data.employerid, data.siteid, data.position, data.year, data.wage, data.uid, data.postingid)
          })))
        }
      }).catch(err => {
        console.log(err);
      })}, [])
    

  
    const handleRequestSort = (event, property) => {
      const isDesc = orderBy === property && order === 'desc';
      setOrder(isDesc ? 'asc' : 'desc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = event => {
      if (event.target.checked) {
        const newSelecteds = rows.map(n => n.pID);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, pID) => {
      const selectedIndex = selected.indexOf(pID);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, pID);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    // const handleChangeDense = event => {
    //   setDense(event.target.checked);
    // };
  
    const isSelected = pID => selected.indexOf(pID) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
    return (
      rows ?
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.pID);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.pID)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.pID}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.company}
                        </TableCell>
                        <TableCell align="right">{row.location}</TableCell>
                        <TableCell align="right">{row.position}</TableCell>
                        <TableCell align="right">{row.year}</TableCell>
                        <TableCell align="right">{row.wage}</TableCell>
                        <TableCell align="right">{row.user}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
      </div>
      :
      <div>loading</div>
    );
  }



import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import "./resultGrid.css";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';


class ResultGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    };



    render() {

        this.renderQuickQuery = () => {
            return (
                <Grid className="quickQuery" item xs={12}>
                    Quick Query
                </Grid>
            );
        }

        this.renderHousingSnapshot = () => {
            return (
                <Grid className="housingSnapshot" item xs={12}>Housing Snapshot</Grid>
            )
        }

        this.renderListings = () => {
            const listingElems = this.props.listings.map((listing) => {
                return (<TableRow key={listing}>
                            <TableCell align="right">Google</TableCell>
                            <TableCell align="right">Palo Alto</TableCell>
                            <TableCell align="right">Software Engineer</TableCell>
                            <TableCell align="right">100K</TableCell>
                        </TableRow>)
            });

            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Company</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Position</TableCell>
                            <TableCell align="right">Wage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {listingElems}
                    </TableBody>
                </Table>
            )
        }

        return (
            <Grid id="resultGrid" container spacing={3}>
                <Grid container item xs={6}>
                    {this.renderQuickQuery()}
                    {this.renderHousingSnapshot()}
                    {this.renderListings()}
                </Grid>
                <Grid className="map" item xs={6}>
                    Map
                </Grid>
            </Grid>
        );
    };


};

export default ResultGrid;

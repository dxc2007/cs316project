import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import "./search.css";
import TextField from '@material-ui/core/TextField';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationInput: "", 
            jobInput: "",
        };
    };

    

    render() {

        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }


        this.handleSubmit = () => {
            this.props.handleSearchSubmit({
                locationInput: this.state.locationInput, 
                jobInput: this.state.jobInput,
            });
        }


        return (
            <div>
                  <form className={`${this.props.className} search-form`}  autoComplete="off">
                <TextField

                id="location-input"
                name="locationInput"
                label="Where do you want to go?"
                value={this.props.search.locationInput}
                onChange={event => this.props.handleChange(event)}
                variant='filled'
                fullWidth

                />
                <TextField
                id="job-input"
                name="jobInput"
                label="What kind of job are you interested in?"
                value={this.props.search.jobInput}
                onChange={event => this.props.handleChange(event)}
                variant='filled'
                fullWidth
                />
                <Button
                id="search-form-button"
                onClick={this.handleSubmit}
                color='primary'
                variant='outlined'
                >Search</Button>
            </form>
            
            </div>
        );
    };


};

export default Search;

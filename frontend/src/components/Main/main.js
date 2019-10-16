import React, { Component } from 'react';
import "./main.css";
import Search from "../Search/search";
import ResultGrid from "../ResultGrid/resultGrid";
import NavBar from "../navbar";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldShowResult: false, 
            searchInput: {
                locationInput: "",
                jobInput: "",
            },
            listings: [
                "listingA", "listingB", "listingC"
            ]
        };
    };

    render() {

        this.handleChange = (event) => {
            this.setState({
                searchInput: {
                    ...this.state.searchInput, 
                    [event.target.name]: event.target.value
                },
            });
        }

        this.handleSearchSubmit = (inputs) => {
            this.setState({
                shouldShowResult: true, 
            })
        }

        return (
            <React.Fragment>
                <NavBar
                handleSearchSubmit={this.handleSearchSubmit} 
                search={this.state.searchInput}
                handleChange={this.handleChange}
                ></NavBar>
                
                <Search 
                    className="main-search-bar"
                    handleSearchSubmit={this.handleSearchSubmit} 
                    search={this.state.searchInput}
                    handleChange={this.handleChange}
                ></Search>
                { this.state.shouldShowResult ? 
                <ResultGrid
                    listings={this.state.listings}
                ></ResultGrid> 
                : null}
            </React.Fragment>
        );
    };


};

export default Main;

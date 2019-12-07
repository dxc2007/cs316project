import React, { useState } from 'react';
import {
  Switch, 
  Route, 
} from 'react-router-dom';
import './App.css';
import { StateProvider } from './state';
import NavBar from './components/NavBar';
import Login from './components/authentication/main.authentication';
import SearchPage from './components/SearchPage'
import ResultPage from './components/ResultPage'
import Account from './components/Account'
import Contribute from './components/Contribute'
import Profile from './components/profile/main.profile';
import Pending from './components/pending/main.pending';


function App() {

  const initialState = {
    user: null, 
    searchQuery: null, 
    searchResult: {
      count: 0, 
      results: null,
    },
    housingResult: null, 
    wageResult: null, 
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'updateUser':
        return {
          ...state, 
          user: action.newUser
        }
      case 'updateSearchQuery':
        const dummyResult = [
          {
            company: 'a',
            location: 'b',
            position: 'c',
            year: 'd',
            wage1: 'e',
            wage2: 'f'
          },
          {
            company: 'a2',
            location: 'b2',
            position: 'c2',
            year: 'd2',
            wage1: 'e2',
            wage2: 'f2'
          },
          {
            company: 'a3',
            location: 'b3',
            position: 'c3',
            year: 'd3',
            wage1: 'e3',
            wage2: 'f3'
          },
        ];
        return {
          ...state, 
          searchQuery: action.searchQuery,
          searchResult: dummyResult, 
        }
      case 'updateSearchResult':
        return {
          ...state, 
          searchResult: action.searchResult,
        }
      case 'updateHousingResult':
        return {
          ...state, 
          housingResult: action.housingResult, 
        }
      case 'updateWageResult':
        return {
          ...state, 
          wageResult: action.wageResult, 
        }
      case 'getCompanies':
        return {
          ...state, 
          companies: action.companies,
        }
      case 'getLocations':
        return {
          ...state, 
          locations: action.locations,
        }
      default:
          return state;
    }
  }

  // create context for user 

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={SearchPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/result" component={ResultPage}/>
        <Route path="/search" component={SearchPage}/>
        <Route path='/contribute/:form' component={Contribute}/>
        <Route path='/account' component={Account}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/pending' component={Pending}/>
      </Switch>
    </StateProvider>
  );
}

export default App;
import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main/main";
import Login from "./components/Login/login";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasUser: true, 
    };
  };


  render() {
    return (
      <div>
        {this.state.hasUser ? <Main></Main> : <Login></Login>}
      </div>
    )
  };

}

export default App;

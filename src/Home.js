import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom'
import './App.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Welcome to Steam Makers, Already an user ? <Link to="/login">Login</Link> here
        </p>
      </div>
    );
  }
}

export default Home;

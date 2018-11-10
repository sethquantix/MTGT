import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import Loadable from "react-loadable";
import './App.css';
import Home from  'Views/Home';
import Header from  'Views/Header';

import Loading from "./components/Loading";

class App extends Component {
  render() {
    return <div className="App-main">
            <Header />
            <Home />
        </div>;
  }
}

export default App;

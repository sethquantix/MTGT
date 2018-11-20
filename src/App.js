import React, { Component } from 'react';

import { createMuiTheme, MuiThemeProvider, withTheme } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';

import blue from '@material-ui/core/colors/blue';

import './App.css';
import './Event.css';
import './Stream.css';
import './Components.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#181c24"
        },
        secondary: {
            main: "#61dafb"
        },
        type: 'dark'
    },
});

import Home from  'Views/Home';
import Header from  'Views/Header';

const RenderApp = withTheme()(props => {
    return <div className="App-main">
        <Header />
        <Home />
    </div>
});

class App extends Component {
  render() {

    return <MuiThemeProvider theme={theme}>
        <RenderApp />
    </MuiThemeProvider>;
  }
}

export default App;

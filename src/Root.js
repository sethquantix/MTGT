import React, { Component } from 'react';
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import { CookiesProvider } from 'react-cookie';

import { BrowserRouter as Router } from 'react-router-dom';

class Root extends Component {
    render() {
        return <Provider store={store}>
                <Router>
                    <CookiesProvider>
                        <App />
                    </CookiesProvider>
                </Router>
            </Provider>;
    }
}

export default Root;

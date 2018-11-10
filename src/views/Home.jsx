import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {connect } from 'react-redux';
import Loadable from 'react-loadable';

import {getActionLogin} from "Reducers/Profile";
import TwitchLogin from "Components/TwitchLogin";
import TwitchError from "Components/TwitchError";
import Main from "Views/Main";
import {withCookies} from "react-cookie";
import Loading from "Components/Loading";
import Friends from "Views/Friends";

const components = {
    Profile: Loadable({
        loader: () => import("Views/Profile"),
        loading: Loading
    })
};

class Home extends Component {

    componentDidMount() {
        const token = this.props.cookies.get("id");
        if (token)
            this.props.login(token);
    }

    render() {
        console.log(`route: ${JSON.stringify(this.props)}`);
        return <div className="App-main">
            {this.props.connected && <Friends />}
            <Switch>
                <Route path={'/twitchRedirect'} component={TwitchLogin} />
                <Route path={'/loginError'} component={TwitchError} />
                {this.props.connected && <Route path={'/profile'} component={components.Profile} />}
                <Route component={() => <Main />} />
            </Switch>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        connected: state.ProfileReducer.connected
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: token => dispatch(getActionLogin(token))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(Home)));

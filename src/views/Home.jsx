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
import Storage from "Root/Storage";

const components = {
    Profile: Loadable({
        loader: () => import("Views/Profile"),
        loading: Loading
    })
};

class Home extends Component {

    componentDidMount() {
        const token = Storage.Get("id");
        console.log("storage : " + token);
        if (token && token !== "undefined")
            this.props.login(token);
    }

    render() {
        console.log(this.props.connected);
        const style = this.props.connected ? {} : { gridTemplateColumns: "1fr" };
        return <div className="App-body" style={style}>
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

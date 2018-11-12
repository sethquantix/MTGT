import React, { Component } from 'react';
import { connect } from "react-redux";
import {Route, Switch, withRouter} from 'react-router-dom';
import Events from "Views/Events/Events";
import Streams from "Views/Events/Streams";
import EventManager from "Views/Events/EventManager";

class Main extends Component {

    render() {
        return <Switch>
            <Route path='/events' component={EventManager} />
            <Route path='/streams' component={Streams} />
            <Route path="/" component={Events} />
        </Switch>;
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
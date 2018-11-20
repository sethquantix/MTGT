import React, { Component } from 'react';
import { connect } from "react-redux";
import {Route, Switch, withRouter} from 'react-router-dom';
import Events from "Views/Events/Events";
import Streams from "Views/Stream/Streams";
import EventManager from "Views/Manager/EventManager";
import ActiveEvent from "Views/ActiveEvent/ActiveEvent";

class Main extends Component {

    render() {
        return <Switch>
            <Route path='/manage' component={EventManager} />
            <Route path='/streams' component={Streams} />
            <Route path='/events' component={ActiveEvent} />
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

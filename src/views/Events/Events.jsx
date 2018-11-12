import React, { Component } from 'react';

import { connect } from 'react-redux';
import Card from "@material-ui/core/Card";

class Events extends Component {

    render() {
        return <div>
            <Card />
        </div>
    }
}

const mapStateToProps = state => {
    return {
        events: state.EventsReducer.events
    }
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);

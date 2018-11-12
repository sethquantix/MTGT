import React, { Component } from 'react';
import { Radio, FormControlLabel, RadioGroup, withStyles} from '@material-ui/core';

import { connect } from 'react-redux';

import {Actions, EVENTS} from "Reducers/Events";

const StyledGroup = withStyles({
    row: {
        marginLeft: 30
    }
});

class AvailableHeader extends Component {

    scopeToText = scope => {
        switch (EVENTS[scope]) {
            case EVENTS.SHARED:
                return "Viewers only";
            case EVENTS.PUBLIC:
                return "Public events";
            case EVENTS.PRIVATE:
                return "Friend events";
        }
    };

    setScope = (e) => {
        this.props.setScope(e.target.value);
    };

    render() {
        return <div className="Event-card-header">
            <div className="Event-card-header-title">Events</div>
            {<RadioGroup classes={{row: this.props.classes.row}} row value={this.props.scope} onChange={this.setScope}>
                {Object.keys(EVENTS).map(e => {
                    return <FormControlLabel
                        control={<Radio />}
                        value={EVENTS[e]}
                        label={this.scopeToText(e)} />
                })}
            </RadioGroup>}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        scope: state.EventsReducer.scope
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setScope: scope => dispatch(Actions.GET_AVAILABLE(scope))
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(StyledGroup(AvailableHeader));

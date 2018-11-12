import React, { Component } from 'react';

import { Actions } from 'Reducers/Events';

import { connect } from 'react-redux';
import Card from "@material-ui/core/Card";
import Loading from "Components/Loading";
import OwnedEvent from "Views/Events/OwnedEvent";
import RegisteredEvent from "Views/Events/RegisteredEvent";
import EventCard from "Views/Events/EventCard";
import AvailableHeader from "Views/Events/AvailableHeader";
import AvailableEvent from "Views/Events/AvailableEvent";

const none = {
    Registered: "You're not registered in any event.",
    Owned: "You didn't create any event.",
    Available: "There is no event matching your search criterias."
};

class Events extends Component {

    componentDidMount() {
        this.reload();
    }

    reload = () => {
        this.props.getRegisteredEvents();
        this.props.getCreatedEvents();
        this.props.getAvailableEvents();
    };

    render() {
        console.log(this.props.events, this.props.owned);
        return <div className="Event-body">
            <EventCard events={this.props.owned} none={none.Owned} component={OwnedEvent} />
            <EventCard events={this.props.events} none={none.Registered} component={RegisteredEvent} />
            <EventCard events={this.props.available} none={none.Available} header={AvailableHeader} component={AvailableEvent} />
        </div>
    }
}

const mapStateToProps = state => {
    return {
        events: state.EventsReducer.events,
        owned: state.EventsReducer.created,
        available: state.EventsReducer.list
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getRegisteredEvents: () => dispatch(Actions.GET_REGISTERED),
        getCreatedEvents: () => dispatch(Actions.GET_OWNED),
        getAvailableEvents:  () => dispatch(Actions.GET_AVAILABLE())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);

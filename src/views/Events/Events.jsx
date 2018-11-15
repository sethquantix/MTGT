import React, { Component } from 'react';

import { Actions } from 'Reducers/Events';

import { connect } from 'react-redux';
import Card from "@material-ui/core/Card";
import Loading from "Components/Loading";
import Event from "Views/Manager/Event";
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
        this.props.getAvailableEvents();
    };

    componentDidUpdate(prevProps) {
        if (this.props.updated !== prevProps.updated)
            this.reload();
    }

    render() {
        return <div className="Event-body">
            <EventCard events={this.props.events} none={none.Registered} component={RegisteredEvent} />
            <EventCard events={this.props.available.filter(x => !x.users.find(e => e.magic === this.props.magic))}
                       none={none.Available} header={AvailableHeader}
                       component={AvailableEvent} />
        </div>
    }
}

const mapStateToProps = state => {
    return {
        updated: state.EventsReducer.updated,
        magic: state.ProfileReducer.profile.magicHandle,
        events: state.EventsReducer.events || [],
        available: state.EventsReducer.list || []
    }
};

const mapDispatchToProps = dispatch => {
    return {
        register: id => dispatch(Actions.REGISTER_TO_EVENT(id)),
        unregister: id => dispatch(Actions.UNREGISTER_FROM_EVENT(id)),
        getRegisteredEvents: () => dispatch(Actions.GET_REGISTERED),
        getCreatedEvents: () => dispatch(Actions.GET_OWNED),
        getAvailableEvents:  () => dispatch(Actions.GET_AVAILABLE())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);

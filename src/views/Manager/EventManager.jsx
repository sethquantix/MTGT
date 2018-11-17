import React, { Component } from 'react';
import {Button} from "@material-ui/core";

import { connect } from 'react-redux';
import EventCard from "Views/Events/EventCard";
import {Actions} from "Reducers/Events";
import NewEvent from "Views/Manager/NewEvent";
import Event from "Views/Manager/Event";

class EventManager extends Component {

    state = { open: false };

    componentDidMount() {
        this.props.getCreatedEvents();
    }

    open = () => this.setState({open: true});

    close = () => {
        this.setState({open: false});
        setTimeout(() => this.props.saveEvent(null), 500);
    };

    validate = data => {
        if (!data.name)
            return false;
        if (!data.count)
            return false;
        const {name, streamers, set, count, scope, code, date, hours, minutes, time, format } = data;
        const event_time = new Date(date);
        event_time.setHours(hours + 24 * time, minutes);
        console.log(event_time);
        this.props.create({name, streamers, count: parseInt(count), scope, code, event_time, format, set });
        this.close();
        return true;
    };

    render() {
        return <div className="Event-body">
            <EventCard events={this.props.events} none="Nothing here yet !" className="Event-card-manager" component={Event}>
            </EventCard>
            {this.props.connected ? this.state.open ? <NewEvent validate={this.validate} close={this.close} /> : <Button className="Event-new-button" onClick={this.open} >New Event</Button> : null }
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        connected: state.ProfileReducer.connected,
        events: state.EventsReducer.created
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveEvent: event => dispatch(Actions.SAVE_EVENT(event)),
        getCreatedEvents: () => dispatch(Actions.GET_OWNED),
        create: data => dispatch(Actions.CREATE_EVENT(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventManager);

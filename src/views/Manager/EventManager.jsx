import React, { Component } from 'react';
import {Button} from "@material-ui/core";

import { connect } from 'react-redux';
import EventCard from "Views/Events/EventCard";
import Event from "Views/Manager/Event";
import {Actions} from "Reducers/Events";
import NewEvent from "Views/Manager/NewEvent";

class EventManager extends Component {

    state = { open: false };

    componentDidMount() {
        this.props.getCreatedEvents();
    }

    open = () => this.setState({open: true});

    close = () => this.setState({open: false});

    validate = data => {
        if (!data.name)
            return ;
        if (!data.count)
            return ;
        const {name, streamers, count, scope, code, date, hours, minutes, time, format } = data;
        const event_time = new Date(date);
        event_time.setHours(hours + 24 * time, minutes);
        console.log(event_time);
        this.props.create({name, streamers, count, scope, code, event_time, format });
        this.close();
    };

    render() {

        return <div className="Event-body">
            <EventCard events={this.props.events} none="Nothing here yet !" className="Event-card-manager" component={Event}>
            </EventCard>
            {this.state.open ? <NewEvent validate={this.validate} close={this.close} /> : <Button className="Event-new-button" onClick={this.open} >New Event</Button> }
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        events: state.EventsReducer.created
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCreatedEvents: () => dispatch(Actions.GET_OWNED),
        create: data => dispatch(Actions.CREATE_EVENT(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventManager);

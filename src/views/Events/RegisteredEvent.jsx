import React, { Component } from 'react';
import {connect} from "react-redux";
import {Card, Button } from "@material-ui/core";
import Scryfall from "Components/Scryfall";
import Timer from "Components/Timer";
import {Actions} from "Reducers/Events";
import EventData from "Views/Events/EventData";

class RegisteredEvent extends Component {


    render() {

        const {event} = this.props;
        return <Card style={{margin: 10}}>
            <div className="EventCard-bloc">
                <div className="EventCard-bloc-item" style={{flex: 0}}>
                    <Scryfall container="EventCard-art-container" image="EventCard-art" code={event.code}
                              set={event.set || "grn"}/>
                </div>
                <div className="EventCard-bloc-data" style={{marginLeft: 5}}>
                    <div className="EventCard-title">
                        <div className="Event-card-header-left">
                            {event.users.length} / {parseInt(event.count)}
                        </div>
                        <Timer className="EventCard-timer" to={event.event_time}/>
                        {event.name}
                    </div>
                    <div className="EventCard-info">
                        <EventData event={event}/>
                        {event.streamers && event.streamers.length !== 0 &&
                        <div className="EventCard-list" style={{borderLeft: "1px solid #61dafb"}}>
                            <div className="EventCard-list-header">Streamers</div>
                            {event.streamers.map(x => <div className="EventCard-list-item"><img
                                className="EventCard-list-thumb" src={x.logo}/>
                                <div>{x.display_name}</div>
                            </div>)}
                        </div>}
                    </div>
                    <Button className="EventCard-register" onClick={() => this.props.unregister(event.id)}>Unregister</Button>
                </div>
            </div>
        </Card>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unregister: id => dispatch(Actions.UNREGISTER_FROM_EVENT(id))
    }
};

export default connect(null, mapDispatchToProps)(RegisteredEvent);

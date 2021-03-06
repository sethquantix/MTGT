import React from 'react';

import { Card, Button } from "@material-ui/core";

import "../Events/EventCards.css";
import Scryfall from "Components/Scryfall";
import {toLocale} from "Utils/Funcs";
import EventData from "Views/Events/EventData";

const Event = ({event}) => {
    console.log(toLocale(event.event_time));

    return <Card>
        <div className="EventCard-bloc">
            <div className="EventCard-bloc-item" style={{flex: 0}}>
                <Scryfall container="EventCard-art-container" image="EventCard-art" code={event.code} set={event.set || "grn"}/>
            </div>
            <div className="EventCard-bloc-data" style={{marginLeft: 5}}>
                <div className="EventCard-title">
                    {event.name}
                    <div className="Event-card-header-left">
                        {event.users.length} / {parseInt(event.count)}
                    </div>
                </div>
                <div className="EventCard-info">
                    <EventData event={event}/>
                    {event.streamers && event.streamers.length !== 0 && <div className="EventCard-list" style={{borderLeft: "1px solid #61dafb"}}>
                        <div className="EventCard-list-header">Streamers</div>
                        {event.streamers.map(x => <div className="EventCard-list-item"><img className="EventCard-list-thumb" src={x.logo} /><div>{x.display_name}</div></div>)}
                    </div>}
                </div>
                <Button className="EventCard-register">Edit</Button>
            </div>
        </div>
    </Card>
};

export default Event;

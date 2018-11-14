import React from 'react';
import EventCard from "Views/Events/EventCard";

import { Card, Button } from "@material-ui/core";

import "./EventCards.css";
import Scryfall from "Components/Scryfall";
import {toLocale} from "Utils/Funcs";

const OwnedEvent = ({event}) => {
    console.log(toLocale(event.event_time));

    return <Card>
        <div className="EventCard-bloc">
            <div className="EventCard-bloc-item" style={{flex: 0}}>
                <Scryfall container="EventCard-art-container" image="EventCard-art" code={event.code} set={event.set || "grn"}/>
            </div>
            <div className="EventCard-bloc-data" style={{marginLeft: 5}}>
                <div className="EventCard-title">{event.name}</div>
                <div className="EventCard-info">
                    {/*<EventData event={event}/>*/}
                    <div>event data</div>
                    {event.streamers && event.streamers.length !== 0 && <div className="EventCard-list" style={{borderLeft: "1px solid #61dafb"}}>
                        <div className="EventCard-list-header">Streamers</div>
                        {event.streamers.map(x => <div className="EventCard-list-item"><img className="EventCard-list-thumb" src={x.logo} /><div>{x.display_name}</div></div>)}
                    </div>}
                </div>
                <Button className="EventCard-register">Register</Button>
            </div>
        </div>
    </Card>
};

export default OwnedEvent;

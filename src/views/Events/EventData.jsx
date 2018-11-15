import React from 'react';
import {toLocale} from "Utils/Funcs";

const EventData = ({event}) => {

    console.log(event);

    return <div className="Event-data">
        <div>{toLocale(event.event_time)}</div>
        <div>Format: {event.format}</div>
        <div>Streamed: {event.streamers.length !== 0 ? "yes" : "no"}</div>
    </div>
};

export default EventData;

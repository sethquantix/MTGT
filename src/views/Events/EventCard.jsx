import React, { Component } from 'react';
import { Card } from "@material-ui/core";
import Loading from "Components/Loading";

class EventCard extends Component {

    content = (events, nope, event) => {
        console.log(nope, events);
        if (events === null)
            return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                <Loading color="#61dafb"/>
            </div>;
        if (events.length === 0)
            return nope ? <div style={{paddingTop: 20, paddingLeft: 40, fontSize: 14, fontStyle: "italic"}}>{nope}</div> : null;
        return <React.Fragment>
            {events.map(x => React.createElement(event, {event: x, key: x.id}))}
        </React.Fragment>
    };

    render() {
        const {none, events, className = "", component, children = null } = this.props;
        const content = this.content(events, none, component);
        console.log(content);
        const classes = "Event-card " + className;
        return <Card className={classes} style={{backgroundColor: "#191F2B", color: "white"}}>
            {this.props.header && React.createElement(this.props.header, {})}
            {content}
            {children}
        </Card>
    }
}

export default EventCard;

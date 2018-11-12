import React, { Component } from 'react';
import { Card } from "@material-ui/core";
import Loading from "Components/Loading";

class EventCard extends Component {

    content = (events, nope, event) => {
        console.log(nope, events);
        if (events === null)
            return <Loading />;
        if (events.length === 0)
            return <div style={{paddingTop: 20, paddingLeft: 40, fontSize: 14, fontStyle: "italic"}}>{nope}</div>;
        return <React.Fragment>
            {events.map(x => React.createElement(event, {key: x.id}))}
        </React.Fragment>
    };

    render() {
        const {none, events, component } = this.props;
        const content = this.content(events, none, component);
        console.log(content);
        return <Card className="Event-card" style={{backgroundColor: "#191F2B", color: "white"}}>
            {this.props.header && React.createElement(this.props.header, {})}
            {content}
        </Card>
    }
}

export default EventCard;

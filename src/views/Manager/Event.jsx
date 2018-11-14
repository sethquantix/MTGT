import React, { Component }  from 'react';

class Event extends Component {

    render() {
        return <div>{this.props.event.name}</div>
    }
}

export default Event;

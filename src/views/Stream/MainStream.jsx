import React, {Component} from 'react';

import StreamCard from "./StreamCard";
import {connect} from 'react-redux'
import Api from '../../utils/Api'

class MainStream extends Component {
    state = {
        events: []
    };


    componentDidMount() {
        if (this.props.profile.connected) {
            this.load();
        }
    }

    load() {
        Api.Events.getRegistered(this.props.profile.token).then(events => {
            this.setState({events: events.events});
        });
    }

    render() {
        let frames = [];
        this.state.events.map(event => {
            if (event.streamers.length > 0) {
                frames.push(<StreamCard event={event}/>)
            }
        });
        if (frames.length === 0) {
            return <div className="streams">No Streams found, register to streamed events to see streams.</div>
        } else {
            return <div className="streams">{frames}</div>

        }
    }
}

const mapStateToProps = state => {
    return {
        profile: state.ProfileReducer
    }
};


export default connect(mapStateToProps)(MainStream);

import React, {Component} from 'react';
import StreamCard from "Views/Events/StreamCard";
import {connect} from 'react-redux'
import Api from '../../utils/Api'
import {getActionStreams} from "Reducers/Streams";

class Streams extends Component {
    state = {
        streams: [],
        lastUpdate: 0
    };

    hour = 60000 * 60;

    componentDidMount() {
        if (this.props.profile.connected) {
            // this.CLIENT_ID = process.env.NODE_ENV === 'production' ? "adffdn8fw3qmj1mn9ulk1jw4d9wnq8" : "ffmytki05p9we8ubrs4tx3jbiprl6j";
            // let lastUpdate = this.props.lastUpdate;
            // let current = new Date().getTime();
            // if (lastUpdate === 0 || (current - lastUpdate) > this.hour) {
            this.load(new Date().getTime());
            // } else {
            //     this.setState({streams: this.props.streams, lastUpdate: this.props});
            // }
        }
    }

    load(current) {
        // Api.Profile.getProfile(this.props.profile.token).then(data => {
        //     if (data.twitch !== undefined) {
        //         let link = data.twitch["_links"].self + "/follows/channels";
        //         fetch(link, {
        //             method: 'GET',
        //             headers: {
        //                 'Client-ID': this.CLIENT_ID
        //             }
        //         }).then(r => r.json()).then(response => {
        //             console.log(this.props.events);
        Api.Events.getRegistered(this.props.profile.token).then(events => {
            let _streams = [];
            events.events.map(event => {
                let streamers = event.streamers;
                streamers.map(streamer => {
                    _streams.push(streamer)
                })
            });
            _streams = _streams.reduce((unique, o) => {
                if (!unique.some(obj => obj["display_name"] === o["display_name"])) {
                    unique.push(o);
                }
                return unique;
            }, []);
            this.setState({streams: _streams});
            // this.props.setStreams(_streams, current);
        });
        //
        //
        //
        //         }).catch(error => {
        //             console.log(error)
        //         })
        //     }
        // })


    }

    displayFrames() {
        let frames = [];
        this.state.streams.map(channel => {
            frames.push(<StreamCard channel={channel}/>)
        });
        return frames;
    }


    render() {
        let frames = this.displayFrames();
        if (frames.length == 0) {
            return <div>No Streams found, register to streamed events to see streams.</div>
        } else {
            return <div>{frames}</div>

        }
    }
}

const mapStateToProps = state => {
    return {
        // streams: state.StreamReducer.streams,
        // lastUpdate: state.StreamReducer.lastUpdate,
        profile: state.ProfileReducer
    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         setStreams: (streams, lastUpadate) => dispatch(getActionStreams(streams, lastUpadate))
//     }
// };


export default connect(mapStateToProps)(Streams);

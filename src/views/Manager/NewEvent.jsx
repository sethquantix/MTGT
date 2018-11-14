import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Transition} from 'react-spring';
import { Card, Button, withStyles} from "@material-ui/core";

import { grnRand } from "Utils/Funcs";
import {Actions, ActionsTypes, EVENTS} from "Reducers/Events";

import exit from "Images/exit.png";
import EventData from "Views/Manager/EventData";
import EventCover from "Views/Manager/EventCover";

import { Formats } from "Root/utils/Enums";

const styles = {
    root: {
        padding: 0,
        display: 'flex',
        height: 50,
        flexShrink: 0,
        backgroundColor: "#282c34"
    },
    focusVisible: {
        padding: 0,
        display: 'flex',
        height: 50,
        backgroundColor: "#61dafb"
    }
};

class NewEvent extends Component {

    state = {   set: "GRN",
                code: grnRand(),
                hours: 12,
                date: new Date(),
                minutes: 0,
                time: 0,
                query: "",
                format: Formats.STANDARD,
                scope: EVENTS.PUBLIC, streamers: [], streaming: false, count: 0, name : "" };

    handle = tag => e => {
        const v = e.hasOwnProperty("target") ? e.target.value : e;
        this.setState({[tag]: v});
    };

    search = e => {
        const query = e;
        this.props.search(query);
        this.setState({query: query});
    };

    selectImage = e => {
        const str = this.props.images.find(x => x === e);
        fetch("https://api.scryfall.com/cards/named?fuzzy=" + encodeURIComponent(str))
            .then(r => r.json())
            .then(data => {
                this.setState({ code: data.collector_number, set: data.set });
            });
        this.props.resetImages();
        this.setState({imgQuery: ""});
    };

    searchImage = query => {
        this.setState({imgQuery: query });
        this.props.searchImage(query);
    };

    select = e => {
        const str = this.props.channels.find(x => x.display_name === e);
        this.props.reset();
        this.setState({query: "", streamers: [...this.state.streamers, str]})
    };

    render() {
        return  <Transition from={{ height: 0, backgroundColor: 'transparent' }}
                            items={[{key: "card"}]} keys={item => item.key}
                enter={{ height: 500, backgroundColor: '#191F2B'}}
                leave={{height: 0}}>
            {item => props => <Card className="Event-new" style={props}>
                <img style={{position: 'absolute', right: 10, cursor: 'pointer', top: 10, width: 32, height: 32}} src={exit} onClick={this.props.close} />
                <div className="Event-new-body">
                    <div className="Event-new-content">
                        <EventCover query={this.state.imgQuery} set={this.state.set} code={this.state.code} results={this.props.images} onChange={this.searchImage} onSelect={this.selectImage}/>
                        <div className="Event-new-vertical-sep" />
                        <EventData state={this.state} channels={this.props.channels} handle={this.handle} select={this.select} search={this.search} classes={this.props.classes}/>
                    </div>
                    <Button classes={{root: this.props.classes.root, focusVisible: this.props.classes.focusVisible}} onClick={() => this.props.validate(this.state)}>Create</Button>
                </div>
            </Card>}
        </Transition>
    }
}

const mapStateToProps = state => {
    return {
        channels: state.EventsReducer.channels,
        images: state.EventsReducer.images || []
    }
};

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch({type: ActionsTypes.FETCHED_STREAMER, payload: {res: []}}),
        resetImages: () => dispatch({type: ActionsTypes.FETCHED_IMAGES, payload: {res: []}}),
        search: query => dispatch(Actions.SEARCH_CHANNELS(query)),
        searchImage: query => dispatch(Actions.SEARCH_IMAGES(query))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewEvent));

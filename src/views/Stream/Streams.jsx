import {Component} from 'react'
import React from "react";
import {Route, Switch, withRouter} from 'react-router-dom';
import MainStream from './MainStream'
import {connect} from "react-redux";
import SingleStream from "Views/Stream/SingleStream";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class Streams extends Component {

    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    getStreamTabs() {
        let streams = [];
        this.props.streams.map(stream => {
            streams.push(<Tab label={stream["display_name"]}/>)
        });
        console.log(this.state.value)
        return streams;
    }

    setValue(value) {
        value--;
        this.setState({value})
    }

    render() {
        const {value} = this.state;
        return <div>
            <AppBar position="static">
                <Tabs value={value} onChange={this.handleChange}>
                    <Tab label="Main"/>
                    {
                        this.getStreamTabs()
                    }
                </Tabs>
            </AppBar>
            {value === 0 && <MainStream/>}
            {value > 0 && this.props.streams.length > 0 &&
            <SingleStream channel={this.props.streams[value - 1].display_name} width="100%" height="800px"
                          stream={this.props.streams[value - 1]} index={value}
                          changeValue={() => this.setValue(value)}/>}
        </div>

    }
}


const mapStateToProps = state => {
    return {
        streams: state.StreamReducer.streams
    }
};

export default withRouter(connect(mapStateToProps)(Streams))
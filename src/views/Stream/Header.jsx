import {Component} from 'react'
import Link from "Components/Link";
import React from "react";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {Spring} from "react-spring";


class Header extends Component{

    getStreams(){
        let streamLinks = [];
        this.props.streams.map(stream => {
            let name = stream["display_name"];
            let path = "/streams/" + name;
            console.log(path);
            streamLinks.push(<Link classes="button-hovered button-item" path={path}>
                {this.selected(this.props.location.pathname === path, name)}
            </Link>)
        });
        return streamLinks;
    }

    selected(select, name){
        return <Spring from={{bg: "#181c24"}} to={{bg: select ? "#ff4500" : "#181c24"}}>
            {props => <div className={"selected-box"}>
                <div className={"selected-cursor"}>
                    <div className={"diamond"} style={{backgroundColor: props.bg}}/>
                </div>
                <div>{name}</div>
            </div>}
        </Spring>
    }


    render() {
        return <div className="App-header">
            <div className="App-header-nav">
                <Link classes="button-hovered button-item" path="/streams/main">
                    {this.selected(this.props.location.pathname === "/streams/main", "Main")}
                </Link>
                {
                    this.getStreams()
                }
            </div>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        streams: state.StreamReducer.streams
    }
};

export default withRouter(connect(mapStateToProps)(Header))
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Spring } from 'react-spring';

import Link from "Components/Link";
import Login from "Containers/AccountContainer";
import Profile from "Components/ProfileButton";
import Loading from "Components/Loading";

class Header extends Component {

    constructor(props) {
        super(props);
        this.items = [
            {name: "Home", path: "/"},
            {name: "Manage", path: "/manage"},
            {name: "My Tournaments", path: "/events"},
            {name: "Streams", path: "/streams"}
        ];
    }

    getAccount = () => {
        if (this.props.connected) {
            return <Profile/>;
        }
        if (this.props.connecting) {
            return <Loading />;
        }
        return <Login />;
    };

    selected = (select, name) => {
        console.log(select, this.props.location);
        return <Spring from={{bg: "#181c24"}} to={{bg: select ? "#ff4500" : "#181c24"}}>
            {props => <div className={"selected-box"}>
                <div className={"selected-cursor"}>
                    <div className={"diamond"} style={{backgroundColor: props.bg}}/>
                </div>
                <div>{name}</div>
            </div>}
        </Spring>
    };

    render() {

        return <div className="App-header">
            <div className="App-header-nav">
                {this.items.map(({name, path}) => <Link classes="button-hovered button-item" path={path}>
                    {this.selected(this.props.location.pathname === path, name)}
                </Link>)}
            </div>
            {this.getAccount()}
        </div>;
    }

}

const mapStateToProps = state => {
    return {
        connecting: state.ProfileReducer.connecting,
        connected: state.ProfileReducer.connected
    }
}

export default withRouter(connect(mapStateToProps, null)(Header));

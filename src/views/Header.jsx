import React, { Component } from 'react';
import { connect } from "react-redux";

import Link from "Components/Link";
import Login from "Containers/AccountContainer";
import Profile from "Components/ProfileButton";
import Loading from "Components/Loading";

class Header extends Component {

    constructor(props) {
        super(props);
        this.items = [
            {name: "Home", path: "/"},
            {name: "Tournaments", path: "/events"},
            {name: "My Tournaments", path: "/manage"}
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

    render() {
        return <div className="App-header">
            <div className="App-header-nav">
                {this.items.map(({name, path}) => <Link name={name} path={path} /> )}
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

export default connect(mapStateToProps, null)(Header);

import React, { Component }  from 'react';
import { connect } from 'react-redux';

import { getActionLogout, getActionProfile} from "Reducers/Profile";
import Loading from "Components/Loading";
import Link from "Components/Link";
import {withRouter} from "react-router-dom";
import Storage from "Root/Storage";

class ProfileButton extends Component {

    state = {hover: false };

    componentDidMount() {

        if (!this.props.logo) {
            this.props.getProfile();
        }
    }

    hover = () => this.setState({hover: true});

    logout = (e) => {
        e.preventDefault();
        this.props.history.push('/', null);
        this.props.logout();
        Storage.Delete("id");
    };

    hoverOut = () => this.setState({hover: false});

    getProfile = () => <div className="button-login" style={{position: 'relative'}}>
        <div onMouseLeave={this.hoverOut} onMouseEnter={this.hover} className="button-logout-container" style={{display: this.state.hover ? 'flex' : 'none'}}>
            <div className="button-logout" onClick={this.logout}><div>Logout</div></div>
        </div>
        <Link classes="button-login" path="/profile">
            <div className="button-login" onMouseEnter={this.hover} onMouseLeave={this.hoverOut}>
                <img className="profile-logo" src={this.props.logo} />
                <div style={{flexShrink: 0, width: 80}}>Profile</div>
            </div>
        </Link>
    </div>;

    render() {
        return this.props.logo ? this.getProfile() : <Loading />;
    }
}

const mapStateToProps = state => {
    return {
        logo: state.ProfileReducer.profile.twitch && state.ProfileReducer.profile.twitch.logo
    }
};

const dispatch = dispatch => {
    return {
        logout: () => dispatch(getActionLogout()),
        getProfile: () => dispatch(getActionProfile())
    }
}

export default withRouter(connect(mapStateToProps, dispatch)(ProfileButton));

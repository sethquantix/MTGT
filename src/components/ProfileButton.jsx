import React, { Component }  from 'react';
import { connect } from 'react-redux';

import {getActionTwitchProfile} from "Reducers/Profile";
import Loading from "Components/Loading";
import Link from "Components/Link";

class ProfileButton extends Component {

    componentDidMount() {

        if (!this.props.logo) {
            this.props.getIcon(this.props.token);
        }
    }

    getProfile = () => <Link classes="button-login" path="/profile">
            <img className="profile-logo" src={this.props.icon} />
        <div style={{flexShrink: 0, width: 80}}>Profile</div></Link>;

    render() {
        return this.props.icon ? this.getProfile() : <Loading />;
    }
}

const mapStateToProps = state => {
    return {
        token: state.ProfileReducer.token,
        logo: state.ProfileReducer.profile && state.ProfileReducer.profile.twitch && state.ProfileReducer.profile.twitch.logo
    }
};

const dispatch = dispatch => {
    return {
        getIcon: token => dispatch(getActionTwitchProfile(token))
    }
}

export default connect(mapStateToProps, dispatch)(ProfileButton);

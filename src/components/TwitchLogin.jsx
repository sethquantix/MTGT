import React, { Component } from 'react';
import {withCookies} from "react-cookie";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Loading from "Components/Loading";
import { parseParameters } from "Utils/Funcs";
import { getActionTwitchAuth, setActionLoginError} from "Reducers/Profile";

class TwitchLogin extends Component {

    componentDidMount() {
        const { location, cookies } = this.props;
        const state = cookies.get("state");
        const params = parseParameters(location.search);

        if (state !== params.state) {
            this.props.error("Bad state");
            return ;
        }
        this.props.auth(params.code);
    }

    render() {
        if (this.props.connected) {
            return <Redirect to={{pathname: "/"}}/>
        }
        if (this.props.failed) {
            this.props.error(null);
            return <Redirect to={{pathname: "/loginError"}} />;
        }
        return <div style={{display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
            <Loading size={80} />
        </div>;
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        connected: state.ProfileReducer.connected,
        failed: state.ProfileReducer.error,
        token: state.ProfileReducer.profile.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        auth: code => dispatch(getActionTwitchAuth(code)),
        error: msg => dispatch(setActionLoginError(msg))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(TwitchLogin));

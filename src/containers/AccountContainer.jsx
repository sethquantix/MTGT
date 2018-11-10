import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withCookies} from "react-cookie";

import Button from "../components/Button";

const uuidv4 = require('uuid/v4');

class AccountContainer extends Component {

    componentDidMount() {
        this.CLIENT_ID = "ffmytki05p9we8ubrs4tx3jbiprl6j";
        this.REDIRECT = "http://localhost:8080/twitchRedirect";
    }

    twitchLogin = cookies => {
        const state = uuidv4();
        cookies.set('state', state, {path: '/'});
        window.location = "https://id.twitch.tv/oauth2/authorize\n" +
            `?client_id=${this.CLIENT_ID}\n` +
            `&redirect_uri=${this.REDIRECT}\n` +
            "&response_type=code\n" +
            "&scope=user_read" +
            `&state=${state}`;
    };

    render() {
        const { cookies } = this.props;
        console.log(cookies);
        return <Button classes={"button-login"} name="login" onClick={this.twitchLogin.bind(this, cookies)}/>;
    }
}

export default withCookies(AccountContainer);

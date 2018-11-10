import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

class TwitchError extends Component {

    componentDidMount() {
        this.props.cookies.remove("state");
    }

    render() {
        return <div style={{paddingLeft: 50, paddingTop: 50, fontSize: "calc(20px + 1vmin)", color: "cyan"}}>
            This should not have happened. Please try again, if the error persist you should check in with an admin.
        </div>
    }
}

export default withCookies(TwitchError);

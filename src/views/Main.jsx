import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';

class Main extends Component {

    render() {
        console.log(this.props.location);
        return <div style={{paddingLeft: 30, paddingTop: 30}}>Hello, world</div>;
    }

}

export default withRouter(Main);

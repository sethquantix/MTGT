import React, {Component} from 'react';
import {connect} from "react-redux";

class ActiveEvent extends Component {

    render() {
        return <div style={{padding: 10}}>No current active events.</div>
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveEvent);

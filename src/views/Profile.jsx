import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {

    render() {
        return <div className="App-profile">hello from profile</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

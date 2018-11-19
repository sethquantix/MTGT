import React, { Component } from 'react';
import AddFriendModal from "Components/AddFriendModal";
import {connect} from "react-redux";

class AddFriend extends Component {

    render() {
        return <AddFriendModal/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);

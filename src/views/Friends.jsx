import React, { Component } from 'react';

import Modal from '@material-ui/core/Modal';

import Arrow from "Images/arrows.svg";

import { Spring } from 'react-spring';
import {Button, withStyles } from "@material-ui/core";
import AddFriend from "Containers/AddFriend";

const styles = {
    root: {
        border: "1px solid #282c34",
        fontSize: 24,
        paddingTop: 5,
        paddingBottom: 5
    }
};

class Friends extends Component {

    state = {toggle: true, search: "" };

    setFilter = e => this.setState({search: e.target.value });

    toggle = () => {this.setState({toggle: !this.state.toggle})};

    openModal = () => {
        this.setState({modal: true});
    };

    close = () => this.setState({modal: false});

    render() {
        const friends = this.props.friends || [];

        return <Spring from={{width: 240, left: 180}} to={{width: this.state.toggle ? 240 : 0, left: this.state.toggle ? 180 : 10}}>
            {props => <div className="friend-list" style={{width: props.width}}>
                <div className="friend-list-header">
                    <Button classes={{root: this.props.classes.root}} onClick={this.openModal}>+</Button>
                    <input className="friend-list-search" placeholder="Filter..." value={this.state.search} onChange={this.setFilter}/>
                </div>
                {
                    friends.length ? friends.map(x => <div>todo: friend</div>) : <div className="friend-list-result">{this.state.search ? "No match" : "Start adding friends !"}</div>
                }
                <img src={Arrow} onClick={this.toggle} className="friend-toggle" style={{left: props.left}}/>
                <Modal open={this.state.modal}
                       onClose={this.close}>
                    <AddFriend />
                </Modal>
            </div>
        }
        </Spring>
    }

}

export default withStyles(styles)(Friends);

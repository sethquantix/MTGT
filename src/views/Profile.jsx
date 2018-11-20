import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from "@material-ui/core";
import UpdatableField from "Components/UpdatableField";
import { getActionUpdateCode, getActionUpdateHandle } from "Reducers/Profile";

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    validate = name => value => {
          switch (name) {
              case "magicHandle":
                  this.props.editHandle(value);
                  break ;
              case "magicCode":
                  this.props.editCode(value);
                  break ;
          }
    };

    render() {

        return <div className="Event-body">
            <Card  className="Event-card" style={{padding: 20, backgroundColor: "#191F2B", color: "white"}}>
                <UpdatableField container="Profile-field" validate={this.validate("magicHandle")} propName={"MTGA username :"} prop={this.props.magicHandle}/>
                <UpdatableField placeholder="eg 98765" container="Profile-field" validate={this.validate("magicCode")} propName={"MTGA friend code :"} prop={this.props.magicCode}/>
            </Card>
        </div>
    }

}

const mapStateToProps = state => {
    return {
        magicHandle: state.ProfileReducer.profile.magicHandle,
        magicCode: state.ProfileReducer.profile.magicCode,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        editHandle: v => dispatch(getActionUpdateHandle(v)),
        editCode: v => dispatch(getActionUpdateCode(v))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

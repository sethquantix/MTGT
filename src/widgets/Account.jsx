import React, { Component } from 'react';
import Button from "Components/Button";

class Account extends Component {

    render() {
        return <Button classes={"button-login"} name={"login"} onClick={() => console.log("do stuff")}/>;
    }

}

export default Account;

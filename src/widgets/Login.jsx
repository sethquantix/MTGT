import React, { Component } from 'react';
import Button from "../components/Button";

class Login extends Component {

    render() {
        return <Button classes={"button-login"} name={"login"} onClick={() => console.log("do stuff")}/>;
    }

}

export default Login;

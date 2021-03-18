import React, { Component } from 'react';
import Aux from '../hoc/_Aux';
import GameLogo from '../../asssets/Icon awesome-keyboard.svg';
import './Login.css';
import Form from '../Form/Form';

class Login extends Component {
    render() {
        return (
            <Aux>
                <div className="login">
                    <div className="sub-login">
                        <img src={GameLogo} className="logo" height="100px" width="100px" alt="Logo is not Renering" />
                        <center className="fast-fingers">fast fingers</center>
                        <div className="ultimate-game">
                            <span className="Line-1"></span><span className="typing-game">the ultimate typing game</span><span className="Line-1"></span>
                        </div>
                        <div>
                            <Form />
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Login;

import React from 'react';
import Aux from '../hoc/_Aux';
import './GameHeader.css';
import { FaUser, FaGamepad } from 'react-icons/fa';

const GameHeader = (props) => {
    return (
        <Aux>
            <div className="main-header">
                <div className="header-name">
                    <div className="user"><FaUser className="user-icon" />PLAYER_NAME_777</div>
                    <div className="fast-fingers">fast fingers</div>
                </div>
                <div className="header-name" style={{ paddingTop: "10px" }}>
                    <div className="user"><FaGamepad className="user-icon" />level : Medium</div>
                    <div><span className="score">Score : </span>00:30</div>
                </div>
            </div>
        </Aux>
    )
}

export default GameHeader;
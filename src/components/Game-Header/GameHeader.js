import React from 'react';
import Aux from '../hoc/_Aux';
import './GameHeader.css';
import { FaUser, FaGamepad } from 'react-icons/fa';

const GameHeader = (props) => {
    const formatter = (timeInMilliSecond) => {
        let minutes = Math.floor(timeInMilliSecond / 60000);
        let seconds = ((timeInMilliSecond % 60000) / 1000).toFixed(0);
        return `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <Aux>
            <div className="main-header">
                <div className="header-name">
                    <div className="user"><FaUser className="user-icon" />{props.userName}</div>
                    <div className="fast-finger-text">fast fingers</div>
                </div>
                <div className="header-name" style={{ paddingTop: "10px" }}>
                    <div className="user"><FaGamepad className="user-icon" />level : {props.difficulty}</div>
                    {props.isScoreVisible &&
                        <div><span className="score">Score : </span>{formatter(props.timer)}</div>
                    }
                </div>
            </div>
        </Aux>
    )
}

export default GameHeader;
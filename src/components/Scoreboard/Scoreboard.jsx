import React, { useState, useEffect } from 'react';
import GameHeader from '../Game-Header/GameHeader';
import Aux from '../hoc/_Aux';
import './Scoreboard.css';
import { FaRedoAlt } from 'react-icons/fa';
import {
    withRouter
} from 'react-router-dom';

const Scoreboard = (props) => {
    const [score, setScore] = useState(0);
    const [gameNumber, setGameNumber] = useState(0);

    const userName = sessionStorage.getItem('name');
    const difficulty = sessionStorage.getItem('selectedDifficulty');
    useEffect(() => {
        const scores = JSON.parse(sessionStorage.getItem('scores'));
        if (scores && scores.length > 0) {
            setScore(scores[scores.length - 1]);
            setGameNumber(scores.length - 1)
        }
    }, []);
    const quitGame = () => {
        // window.location.replace("http://localhost:3000");
        // window.location.pathname = '/';
        props.history.push('/');
    }

    return (
        <Aux>
            <div className="main-score-card">
                <div className="header">
                    <GameHeader
                        isScoreVisible={false}
                        userName={userName}
                        difficulty={difficulty} />
                </div>
                <div className="score-dashboard">
                    <div className="score-game">Score : Game {gameNumber + 1}</div>
                    <div className="score-time">{score}</div>
                    <div className="new-high-score">New High Score</div>
                    <div className="play-icon" onClick={() => props.history.push('/game')}><FaRedoAlt /><span className="play-again">Play Again</span></div>
                </div>
                <div className="quit" onClick={quitGame}>
                    <p>Quit</p>
                </div>
            </div>
        </Aux>
    );
}

export default withRouter(Scoreboard);

import React from 'react';
import Aux from '../hoc/_Aux';
import './ScoreBoard.css';

const ScoreBoard = (props) => {
    return (
        <Aux>
            <div className="main-scoreboard">
                <div className="title">SCORE BOARD</div>
                <div className="game-score">
                    {props.scoreArr &&
                        props.scoreArr.map((gameScore, index) => {
                            return (
                                <div className="game-individual">Game {index + 1} : {gameScore}</div>
                            );
                        })
                    }
                </div>
            </div>
        </Aux>
    );
}

export default ScoreBoard;

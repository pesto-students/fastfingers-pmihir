import React from 'react';
import Aux from '../hoc/_Aux';
import './ScoreBoard.css';

const ScoreBoard = () => {
    return (
        <Aux>
            <div className="main-scoreboard">
                <div className="title">SCORE BOARD</div>
                <div className="game-score">
                    <div className="game-individual">Game 1 :  1:14</div>
                    <div className="game-individual">Game 1 :  1:14</div>
                    <div className="game-individual">Game 1 :  1:14</div>
                    <div className="game-individual">Game 1 :  1:14</div>
                    <div className="game-individual">Game 1 :  1:14</div>
                    <div className="game-individual">Game 1 :  1:14</div>
                    <div className="game-individual">Game 1 :  1:14</div>
                    <div className="game-individual">Game 1 :  1:14</div>
                </div>
            </div>
        </Aux>
    );
}

export default ScoreBoard;

import React, { Component } from 'react';
import data from '../../data/dictionary.json';
import './game.css';
import Input from '../UI/Input/Input';
import Aux from '../hoc/_Aux';
import GameHeader from '../Game-Header/GameHeader';
import ScoreBoard from '../Main-Game/ScoreBoard';
import { AiOutlineClose } from 'react-icons/ai';
import {
    withRouter
} from 'react-router-dom';

const difficultyFactor = {
    "EASY": 1,
    "MEDIUM": 1.5,
    "HARD": 2
}

// Warning occurs at 10s
const WARNING_THRESHOLD = 2500;
// Alert occurs at 5s
const ALERT_THRESHOLD = 1000;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};
const FULL_DASH_ARRAY = 283;
const GAME_PLACE_HOLDER = "Type a Word"

class game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [...data],
            displayWord: [],
            difficulty: "",
            word: "",
            timer: 0,
            typeWord: "",
            userScore: 0,
            correctWordIndex: 0
        }
        this.easyArray = [];
        this.mediumArray = [];
        this.hardArray = [];
        this.timer = 0;
        this.userDifficultyFactor = 0;
        this.scoreArr = [];
        this.timeLeft = 0;
        this.totalTime = 0;
        this.userName = "";
        this.remainingPath = 'green';
    }

    componentDidMount() {
        let word = "";
        let timer = "";
        let displayWord = [];
        let difficulty = sessionStorage.getItem("selectedDifficulty");
        let scores = JSON.parse(sessionStorage.getItem('scores'));
        let userName = sessionStorage.getItem('name');
        this.userDifficultyFactor = difficultyFactor[difficulty];
        for (let wordItem of this.state.words) {
            if (wordItem.length <= 4) this.easyArray.push(wordItem);
            else if (wordItem.length >= 5 && wordItem.length <= 8) this.mediumArray.push(wordItem);
            else this.hardArray.push(wordItem);
        }
        displayWord = this.setDifficultyArray(difficulty);
        word = this.pickRandomWord(displayWord);
        console.log(this.easyArray);
        console.log(this.mediumArray);
        console.log(this.hardArray);
        timer = this.timerValue(word, this.userDifficultyFactor) * 1000;
        this.counterDownTimer(timer);
        this.setState({ difficulty, displayWord, word, timer });
        if (scores && scores.length !== 0) this.scoreArr = scores;
        if (userName && userName !== '') this.userName = userName;
    }

    counterDownTimer = (timer) => {
        this.totalTime = timer;
        this.timeLeft = timer;
        if (this.timer === 0 && timer > 0) {
            this.timer = setInterval(() => {
                if (this.timeLeft !== 0) {
                    this.setCircleDasharray();
                    this.setRemainingPathColor();
                }
                this.countDown();
            }, 10);
        }
    }
    countDown = () => {
        let seconds = this.state.timer - 10;
        this.timeLeft = seconds;
        let userScore = this.state.userScore + 10;
        this.setState({ ...this.state, timer: seconds, userScore });
        if (seconds === 0) {
            clearInterval(this.timer);
            this.stopGame();
        }
    }
    calculateTimeFraction = () => {
        const rawTimeFraction = this.timeLeft / (this.totalTime);
        return rawTimeFraction - (1 / this.totalTime) * (1 - rawTimeFraction);
    }
    setCircleDasharray = () => {
        const circleDasharray = `${(
            this.calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }
    setDifficultyArray = (difficultyLevel) => {
        let wordsArray = [];
        if (difficultyLevel === "EASY") { wordsArray = this.easyArray }
        else if (difficultyLevel === "MEDIUM") { wordsArray = this.mediumArray }
        else { wordsArray = this.hardArray }
        return wordsArray;
    }

    pickRandomWord = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    timerValue = (word) => {
        let timer = (Math.ceil(word.length / this.userDifficultyFactor));
        return timer > 2 ? timer : 2;
    }

    typeWordChangeHandler = (e) => {
        this.setState({ ...this.state, typeWord: e.target.value });
        if (this.state.word.includes(e.target.value)) {
            this.setState({ correctWordIndex: e.target.value.length });
        }
        if (e.target.value === this.state.word) {
            let difficulty = this.checkDifficultyFactor();
            let displayWord = this.setDifficultyArray(difficulty);
            let word = this.pickRandomWord(displayWord);
            let timer = this.timerValue(word) * 1000;
            this.setState({ typeWord: "", word, difficulty, displayWord, timer });
            this.counterDownTimer(timer);
        }
    }

    checkDifficultyFactor = () => {
        let difficulty = this.state.difficulty;
        this.userDifficultyFactor += 0.01;
        if (this.userDifficultyFactor > 1.5 && this.userDifficultyFactor <= 2) {
            difficulty = "MEDIUM";
        } else if (this.userDifficultyFactor > 2) {
            difficulty = "HARD";
        }
        return difficulty;
    }

    setRemainingPathColor = () => {
        const { alert, warning, info } = COLOR_CODES;
        let fraction = this.timeLeft / this.totalTime;
        // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
        if (fraction < 0.2) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);

            // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
        } else if (fraction < 0.5) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        } else {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(alert.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(info.color);
        }
    }

    stopGame = () => {
        let formatScore = this.formatter(this.state.userScore);
        this.scoreArr.push(formatScore);
        sessionStorage.setItem('scores', JSON.stringify(this.scoreArr));
        sessionStorage.setItem('selectedDifficulty', this.state.difficulty);
        this.props.history.push('/scoreboard');
    }

    formatter = (timeInMilliSecond) => {
        let minutes = Math.floor(timeInMilliSecond / 60000);
        let seconds = ((timeInMilliSecond % 60000) / 1000).toFixed(0);
        return `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    formatTimer = (timeInMilliSecond) => {
        let milliSeconds = ('' + timeInMilliSecond).slice(-2);
        let seconds = ('0' + parseInt(timeInMilliSecond / 1000));
        return `${seconds}:${milliSeconds}`
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { word, timer, typeWord, difficulty, userScore, correctWordIndex } = this.state;
        let highLightWord;
        if (word.includes(typeWord)) {
            highLightWord = <span><span className="highlight">{word.slice(0, typeWord.length)}</span>{word.slice(typeWord.length, word.length)}</span>;
        } else {
            highLightWord = <span><span className="highlight">{word.slice(0, correctWordIndex)}</span><span className="wrongTypeWord">{word.slice(correctWordIndex, typeWord.length)}</span>{word.slice(typeWord.length, word.length)}</span>;
        }
        return (
            <Aux>
                <div className="game">
                    <div className="header">
                        <GameHeader
                            isScoreVisible={true}
                            userName={this.userName}
                            difficulty={difficulty}
                            timer={userScore}
                        />
                    </div>
                    <div className="main">
                        <div className="scoreboard"><ScoreBoard scoreArr={this.scoreArr} /></div>
                        <div className="timer-input">
                            <div className="base-timer">
                                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <g className="base-timer__circle">
                                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                                        <path
                                            id="base-timer-path-remaining"
                                            strokeDasharray="283"
                                            className={`base-timer__path-remaining ${this.remainingPath}`}
                                            d="
                                                M 50, 50
                                                m -45, 0
                                                a 45,45 0 1,0 90,0
                                                a 45,45 0 1,0 -90,0
                                                "
                                        ></path>
                                    </g>
                                </svg>
                                <span id="base-timer-label" className="base-timer__label">
                                    {this.formatTimer(timer)}
                                </span>
                            </div>
                            <div className="word">
                                {word.length > 0 && highLightWord}
                            </div>
                            <div>
                                <Input typeWord={typeWord} onChangeHandler={this.typeWordChangeHandler} placeHolder={GAME_PLACE_HOLDER} />
                            </div>
                        </div>
                    </div>
                    <div className="final">
                        <div onClick={this.stopGame}><AiOutlineClose className="close-icon" /><span>Stop Game</span></div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default withRouter(game);


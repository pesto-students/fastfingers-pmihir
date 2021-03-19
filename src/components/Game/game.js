import React, { Component } from 'react';
import data from '../../data/dictionary.json';
import './game.css';
import Input from '../UI/Input/Input';
import Aux from '../hoc/_Aux';
import GameHeader from '../Game-Header/GameHeader';
import ScoreBoard from '../Main-Game/ScoreBoard';

const difficultyFactor = {
    "Easy": 1,
    "Medium": 1.5,
    "Hard": 2
}

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
            userScore: 0
        }
        this.easyArray = [];
        this.mediumArray = [];
        this.hardArray = [];
        this.timer = 0;
        this.userDifficultyFactor = 0;
        this.time1 = new Date();
        this.time2 = new Date();
        // this.scoreArr = JSON.parse(sessionStorage.getItem("scores"));
        this.scoreArr = [];
    }

    componentDidMount() {
        let word = "";
        let timer = "";
        let wordsArray = [];
        for (let word of this.state.words) {
            if (word.length <= 4) this.easyArray.push(word);
            else if (word.length >= 5 && word.length <= 8) this.mediumArray.push(word);
            else this.hardArray.push(word);
        }
        let difficultyLevel = sessionStorage.getItem("selectedDifficulty");
        this.setState({ difficulty: difficultyLevel });
        wordsArray = this.setDifficultyArray(difficultyLevel);
        this.setState({ displayWord: wordsArray });
        this.userDifficultyFactor = difficultyFactor[difficultyLevel];
        word = this.pickRandomWord(wordsArray);
        timer = this.timerValue(word, difficultyLevel);
        this.setState({ word });
        this.setState({ timer: timer });
        this.counterDownTimer(timer);
        this.time1 = new Date();

        let scores = JSON.parse(sessionStorage.getItem('scores'));
        if (scores && scores.length !== 0) {
            this.scoreArr = scores;
        }
    }
    counterDownTimer = (timer) => {
        if (this.timer === 0 && timer > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    countDown = () => {
        let seconds = this.state.timer - 1;
        let userScore = this.state.userScore + 1;
        this.setState({ ...this.state, timer: seconds, userScore });
        if (seconds === 0) {
            clearInterval(this.timer);
            this.stopGame();
        }
    }
    setDifficultyArray = (difficultyLevel) => {
        let wordsArray = [];
        if (difficultyLevel === "Easy") { wordsArray = this.easyArray }
        else if (difficultyLevel === "Medium") { wordsArray = this.mediumArray }
        else { wordsArray = this.mediumArray }
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
        if (e.target.value === this.state.word) {
            let difficulty = this.checkDifficultyFactor();
            this.userDifficultyFactor = difficultyFactor[difficulty];;
            let wordsArray = this.setDifficultyArray(difficulty);
            let randomWord = this.pickRandomWord(wordsArray);
            this.setState({ typeWord: "", word: randomWord, difficulty: difficulty, displayWord: wordsArray });
            let timerValue = this.timerValue(randomWord);
            this.setState({ timer: timerValue });
            this.counterDownTimer(timerValue);
        }
    }

    checkDifficultyFactor = () => {
        let difficulty = this.state.difficulty;
        this.userDifficultyFactor += 0.01;
        if (this.userDifficultyFactor > 1.02) {
            difficulty = "Medium";
        } else if (this.userDifficultyFactor > 1.05) {
            difficulty = "Hard";
        }
        return difficulty;
    }

    stopGame = () => {
        let formatScore = this.formatter(this.state.userScore);
        this.scoreArr.push(formatScore);
        sessionStorage.setItem('scores', JSON.stringify(this.scoreArr));
        // const history = useHistory();
        this.props.history.push('/scoreboard');
    }

    formatter = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor((time % 60));
        minutes = minutes > 9 ? minutes : `0${minutes}`;
        seconds = seconds > 9 ? seconds : `0${seconds}`;
        return `${minutes}:${seconds}`
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { word, timer, typeWord } = this.state;
        // let highlightWord;
        // if (word.search(typeWord) === 0) {
        //     temp = typeWord.length;
        //     highlightWord = <span><span className="highlight">{word.slice(0, typeWord.length)}</span>{word.slice(typeWord.length, word.length)}</span>
        // } else if (word.search(typeWord)) {
        //     console.log(temp);
        //     highlightWord = <span><span className="highlight">{word.slice(0, temp)}</span><span className="wrongTypeWord">{word.slice(temp, typeWord.length)}</span>{word.slice(typeWord.length, word.length)}</span>
        // }
        // if (word.search(typeWord) === 0) {
        //     highlightWord = <span><span className="highlight">{word.slice(0, typeWord.length)}</span>{word.slice(typeWord.length, word.length)}</span>
        // }
        return (
            // <div className="card" style={{ color: "red", padding: "100px 100px" }}>
            //     {word.length > 0 && word}
            //     <div>{timer}</div>
            //     <div>{highlightWord}</div>
            //     {this.formatter(userScore)}
            //     {difficulty}
            //     <Input typeWord={typeWord} onChangeHandler={this.typeWordChangeHandler} />
            //     <button onClick={this.stopGame}>STOP</button>
            // </div>
            <Aux>
                <div className="game">
                    <div className="header">
                        <GameHeader />
                    </div>
                    <div className="main">
                        <div className="scoreboard"><ScoreBoard /></div>
                        <div className="timer-input">
                            <div className="timer">{timer}</div>
                            <div className="word">
                                {word.length > 0 && word}
                            </div>
                            <div>
                                <Input typeWord={typeWord} onChangeHandler={this.typeWordChangeHandler} />
                            </div>
                        </div>
                    </div>
                    <div className="final">
                        Final
                    </div>
                </div>
            </Aux>
        );
    }
}

// const Highlighter = ({ word }) => {
//     let typeWordTemp = document.getElementById("inputTypeWord").value;
//     const temp1 = word.search(typeWordTemp) + typeWordTemp.length;
//     const temp2 = word.slice(temp1, typeWordTemp.length).length;
//     const temp3 = word.slice(typeWordTemp.length, word.length).length;
//     console.log(word.search(typeWordTemp) + typeWordTemp.length);
//     return (<span><span className="highlight">{word.slice(0, temp1)}</span><span className="wrongTypeWord">{word.slice(temp1, temp2)}</span>{word.slice(temp2, temp3)}</span>);
// }

export default game;


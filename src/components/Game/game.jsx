import React, { Component } from 'react';
import data from '../../data/dictionary.json';
import './game.css';
import Input from '../UI/Input/Input';
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
            typeWord: ""
        }
        this.easyArray = [];
        this.mediumArray = [];
        this.hardArray = [];
        this.timer = 0;
        this.userDifficultyFactor = 0;
        this.time1 = new Date();
        this.time2 = new Date();
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
    }
    counterDownTimer = (timer) => {
        if (this.timer === 0 && timer > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    countDown = () => {
        let seconds = this.state.timer - 1;
        this.setState({ ...this.state, timer: seconds });
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

    timerValue = (word, difficulty) => {
        console.log(word.length);
        console.log(this.userDifficultyFactor);
        let timer = (Math.ceil(word.length / this.userDifficultyFactor));
        console.log(timer);
        return timer > 2 ? timer : 2;
    }

    typeWordChangeHandler = (e) => {
        this.setState({ ...this.state, typeWord: e.target.value });
        if (e.target.value === this.state.word) {
            let difficulty = this.checkDifficultyFactor();
            let wordsArray = this.setDifficultyArray(difficulty);
            let randomWord = this.pickRandomWord(wordsArray);
            this.setState({ typeWord: "", word: randomWord, difficulty: difficulty, displayWord: wordsArray });
            let timerValue = this.timerValue(randomWord, difficulty);
            this.setState({ timer: timerValue });
            console.log(timerValue);
            this.counterDownTimer(timerValue);
        }
    }

    checkDifficultyFactor = () => {
        let difficulty = this.state.difficulty;
        this.userDifficultyFactor += 0.01;
        console.log(this.userDifficultyFactor)
        if (this.userDifficultyFactor > 1.02) {
            difficulty = "Medium";
        } else if (this.userDifficultyFactor > 1.05) {
            difficulty = "Hard";
        }
        return difficulty;
    }

    stopGame = () => {
        this.time2 = new Date();
        let score = this.time2.getTime() - this.time1.getTime();
        let minutes = Math.floor(score / 60000);
        let seconds = Math.floor((score % 60000) / 1000);
        console.log(minutes, seconds);
    }

    render() {
        const { word, timer, typeWord, displayWord, difficulty } = this.state;
        let highlightWord;
        if (word.search(typeWord) === 0) {
            highlightWord = <span><span className="highlight">{word.slice(0, typeWord.length)}</span>{word.slice(typeWord.length, word.length)}</span>
        }
        return (
            <div className="card" style={{ color: "red", padding: "100px 100px" }}>
                {word.length > 0 && word}
                {JSON.stringify(displayWord)}
                <div>{timer}</div>
                <div>{highlightWord}</div>
                {this.userDifficultyFactor}
                {difficulty}
                <Input typeWord={typeWord} onChangeHandler={this.typeWordChangeHandler} />
                <button onClick={this.stopGame}>STOP</button>
            </div>

        );
    }
}

export default game;

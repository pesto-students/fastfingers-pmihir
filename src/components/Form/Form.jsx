import React, { Component } from 'react';
import Aux from '../hoc/_Aux';
import Input from '../UI/Input/Input';
import Dropdown from '../UI/Dropdown/Dropdown';
import './Form.css';
import { Link } from 'react-router-dom';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficultyLevel: ["Easy", "Medium", "Hard"],
            form: {
                name: "",
                selectedDiffculty: ""
            }
        }
    }
    nameChangeHandler = (e) => {
        this.setState({ ...this.state, form: { ...this.state.form, name: e.target.value } });
    }
    onSelectHandler = () => {
        let difficulty = document.getElementById("difficultyLevel").value;
        this.setState({ ...this.state, form: { ...this.state.form, selectedDiffculty: difficulty } })
    }
    formDetails = () => {
        sessionStorage.setItem(
            "name", this.state.form.name
        );
        sessionStorage.setItem(
            "selectedDifficulty", this.state.form.selectedDiffculty
        );
        console.log(sessionStorage.getItem('scores'));
        if (!sessionStorage.getItem('scores')) {
            let temp = [];
            sessionStorage.setItem("scores", JSON.stringify(temp));
        }
    }
    render() {
        return (
            <Aux>
                <Input onChangeHandler={this.nameChangeHandler} />
                <Dropdown difficultyLevel={this.state.difficultyLevel} onSelectHandler={this.onSelectHandler} ref={this.selectedRef} />
                <Link onClick={this.formDetails} className="play" to="/game">
                    <div className="fa fa-play"><span className="start-game">Start Game</span></div>
                </Link>
            </Aux>
        );
    }
}

export default Form;

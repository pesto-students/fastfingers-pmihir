import React, { Component } from 'react';
import Aux from '../hoc/_Aux';
import Input from '../UI/Input/Input';
import Dropdown from '../UI/Dropdown/Dropdown';
import './Form.css';

const PLACE_HOLDER_NAME = "Type Your Name";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficultyLevel: ["Easy", "Medium", "Hard"],
            form: {
                name: "",
                selectedDiffculty: "Easy"
            },
            displayError: false
        }
    }
    nameChangeHandler = (e) => {
        this.setState({ ...this.state, form: { ...this.state.form, name: e.target.value }, displayError: false });
    }
    onSelectHandler = (item) => {
        this.setState({ ...this.state, form: { ...this.state.form, selectedDiffculty: item } })
    }
    formDetails = () => {
        let userName = sessionStorage.getItem('name');
        let name = this.state.form.name;
        let error = false;
        if (name === '') {
            console.log(name);
            if (!userName || userName === '') {
                console.log(userName);
                this.setState({ displayError: true });
                error = true;
            }
        }
        if (!error) {
            if (!userName || userName === '') {
                sessionStorage.setItem("name", this.state.form.name);
            }
            sessionStorage.setItem("selectedDifficulty", this.state.form.selectedDiffculty);
            if (!sessionStorage.getItem('scores')) {
                let temp = [];
                sessionStorage.setItem("scores", JSON.stringify(temp));
            }
            // this.props.history.push('/game');
            window.location.pathname = '/game';
            // window.location.replace(location.pathname + '/game');
        }
    }
    render() {
        return (
            <Aux>
                <Input onChangeHandler={this.nameChangeHandler} placeHolder={PLACE_HOLDER_NAME} />
                {this.state.displayError &&
                    <div className="errorMessage">Username is Required</div>
                }
                {console.log(this.state.displayError)}
                <Dropdown difficultyLevel={this.state.difficultyLevel} onSelectHandler={(item) => this.onSelectHandler(item)} ref={this.selectedRef} />
                <div onClick={this.formDetails} className="play">
                    <div className="fa fa-play"><span className="start-game">Start Game</span></div>
                </div>
            </Aux>
        );
    }
}

export default Form;

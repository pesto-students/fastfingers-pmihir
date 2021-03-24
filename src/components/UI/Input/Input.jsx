import React from 'react';
import './Input.css';

const Input = (props) => {
    return (
        <div>
            <input id="inputTypeWord" className="input-text" value={props.typeWord} name="name" autoComplete="off" onChange={props.onChangeHandler} placeholder={props.placeHolder} type="text" />
        </div>
    );
}

export default Input;

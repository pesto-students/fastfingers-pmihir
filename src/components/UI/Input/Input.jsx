import React, { useEffect } from 'react';
import './Input.css';

const Input = (props) => {
    useEffect(() => {
        if (props.typeWord === "") {
            document.getElementById("inputTypeWord").value = "";
        }
    }, [props.typeWord]);
    return (
        <div>
            {props.typeWord}
            <input id="inputTypeWord" className="input-text" value={props.typeWord} name="name" onChange={props.onChangeHandler} placeholder="TYPE YOUR NAME" type="text" />
        </div>
    );
}

export default Input;

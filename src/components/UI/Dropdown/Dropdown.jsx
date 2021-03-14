import React from 'react';
import './Dropdown.css';

const Dropdown = (props) => {

    return (
        <div>
            <select id="difficultyLevel" className="dropdown" onChange={props.onSelectHandler}>
                <option value="" defaultValue hidden>DIFFICULTY LEVEL</option>
                {props.difficultyLevel.map((level) => (
                    <option value={level}>{level}</option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;

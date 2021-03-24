import React, { useState } from 'react';
import './Dropdown.css';
import { AiFillCaretDown } from 'react-icons/ai';

const Dropdown = (props) => {
    const [showItems, setShowItems] = useState(false);
    const [selectedItems, setSelectedItem] = useState(props.difficultyLevel[0]);
    const difficultyLevel = props.difficultyLevel || [];
    const selectItem = (item) => {
        setSelectedItem(item);
        setShowItems(false);
        props.onSelectHandler(item);
    }

    return (
        <div className="select-box--box">
            <div>
                <div className="dropdown" onClick={() => setShowItems(!showItems)} >
                    <div className="selected-item" >{selectedItems}</div>
                    <AiFillCaretDown className="air-dropdown" /></div>
            </div>
            {showItems && <div
                className={"select-box--items"}>
                {difficultyLevel.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => selectItem(item)}
                        className="options"
                    >
                        {item}
                    </div>
                ))}
            </div>}

        </div>
    );
}

export default Dropdown;

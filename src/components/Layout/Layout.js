import React from 'react';
import './Layout.css';


const layout = (props) => {
    return (
        <div id="layout">{props.children}</div>
    )
}

export default layout;
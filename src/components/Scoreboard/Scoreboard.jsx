import React, { useState, useEffect } from 'react';

const Scoreboard = () => {
    const [score, setScore] = useState([]);


    const scores = JSON.parse(sessionStorage.getItem('scores'));
    useEffect(() => {
        if (scores && scores.length > 0) {
            setScore(scores);
        }
    }, []);

    return (
        <div style={{ color: "red" }}>
            <ul>{score.map((individualScore, index) => (<li key={index}>{individualScore}</li>))}</ul>
        </div>
    );
}

export default Scoreboard;

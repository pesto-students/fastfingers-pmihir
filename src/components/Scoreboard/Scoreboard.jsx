import React, { useState, useEffect } from 'react';

const Scoreboard = () => {
    const [score, setScore] = useState([]);



    useEffect(() => {
        const scores = JSON.parse(sessionStorage.getItem('scores'));
        if (scores && scores.length > 0) {
            setScore(scores);
        }
    }, [score]);

    return (
        <div style={{ color: "red" }}>
            <ul>{score.map((individualScore, index) => (<li key={index}>{individualScore}</li>))}</ul>
        </div>
    );
}

export default Scoreboard;

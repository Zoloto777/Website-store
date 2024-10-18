import React, { useState } from 'react';
import './Arrows.css';

const Arrows = ({ onLeftClick, onRightClick }) => {
    const [leftClicked, setLeftClicked] = useState(false);
    const [rightClicked, setRightClicked] = useState(false);

    // Toggle background color for left arrow
    const handleLeftClick = () => {
        setLeftClicked(!leftClicked);
        onLeftClick()
        setRightClicked(false); // Reset right arrow if left is clicked
    };

    // Toggle background color for right arrow
    const handleRightClick = () => {
        setRightClicked(!rightClicked);
        onRightClick()
        setLeftClicked(false); // Reset left arrow if right is clicked
    };

    return (
        <div className='arrows-container'>
            <div
                className={`arrows-circle ${leftClicked ? 'clicked' : ''}`}
                onClick={handleLeftClick } 
            >
                <p>&#8592;</p>
            </div>
            <div
                className={`arrows-circle ${rightClicked ? 'clicked' : ''}`}
                onClick={handleRightClick}
            >
                <p>&#8594;</p>
            </div>
        </div>
    );
};

export default Arrows;

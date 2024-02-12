// src/components/QuestionView.js

import React from 'react';

const QuestionView = ({ question, options, handleOptionClick }) => {
    return (
        <div>
            <h1>{question}</h1>
            <div>
                {options.map((option) => (
                    <button key={option.id} onClick={() => handleOptionClick(option.id)}>
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionView;

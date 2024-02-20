// src/components/QuestionController.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionView from '../Views/QuestionView';
import api from "../api";


//
// export async function getColeccionesCtrl(){
//     try {
//         const url = API_URL + 'users/';
//
//         const response = await axios.get(api.getEndpoint('colecciones'));
//
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
//
// }


const QuestionController = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
            const response = await axios.get(api.getEndpoint('colecciones'));

            //setQuestion(response.data.question);
            //setOptions(response.data.options);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const handleOptionClick = async (optionId) => {
        try {
            const response = await axios.post(api.getEndpoint('question'), {
                optionId: optionId,
            });
            // Handle response if needed
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    return (
        <QuestionView
            question={question}
            options={options}
            handleOptionClick={handleOptionClick}
        />
    );
};

export default QuestionController;

// src/components/QuestionController.js

import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
//import { useHistory } from 'react-router-dom'; // Import useHistory hook from React Router
import api from "../api";
import {generatePath, use, useNavigate} from "react-router-dom";
import {MyContext} from "../MyContext";




export async function CreateComposition() {

    try {
        let jsonData = {
            'mueble':null,
            'encimera':null,
            'lavabo':null,
            'espejo':null,
        }

        const response = await axios.post(api.getEndpoint('composition'), jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
}
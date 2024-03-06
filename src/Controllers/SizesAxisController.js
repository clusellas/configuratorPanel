// src/components/QuestionController.js

import axios from 'axios';
import api from "../api";


export async function fetchSizes(coleccion_id, design_id) {
    try {
        const payload = {
            coleccion: coleccion_id,
            design: design_id,
            show_ancho:true
        };
        const response = await axios.get(api.getEndpoint('articles'), {params:payload} );
        return response.data;
    } catch (error) {
        console.error('Error fetching ancho:', error);
        throw error;
    }
}

export async function fetchAxis(coleccion_id, design_id, ancho_id) {
    try {
        const payload = {
            coleccion: coleccion_id,
            design: design_id,
            ancho: ancho_id,
            show_eje:true
        };
        const response = await axios.get(api.getEndpoint('articles'), {params:payload} );
        return response.data;
    } catch (error) {
        console.error('Error fetching ejes:', error);
        throw error;
    }
}



export async function createObject(coleccion_id, design_id, ancho_id, axis_id) {

    try {

        const payload = {
            coleccion_id: coleccion_id,
            design_id: design_id,
            ancho_id: ancho_id,
            eje_id: axis_id,

        };
        const jsonData = JSON.stringify(payload);

        const response = await axios.post(api.getEndpoint('configurationObject'), jsonData, {
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



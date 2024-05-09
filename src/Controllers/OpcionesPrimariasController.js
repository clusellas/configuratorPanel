
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import api from "../api";
import {MyContext} from "../MyContext";


export async function fetchOptionsMueble(option, mueble){
    try {

        let payload = Object.assign({}, mueble);

        switch (option){
            case 'coleccion':
                payload.show_coleccion = true
                break;
            case 'design':
                payload.show_design = true
                break;
            case 'ancho':
                payload.show_ancho = true
                break;
            case 'eje':
                payload.show_eje = true
                break;
        }

        const response = await axios.get(api.getEndpoint('mueble'), {params:payload} );
        return response.data;

        return response.data;
    } catch (error) {
        console.error('Error fetching collections:', error);
        throw error;
    }
}

export async function fetchOptionsEncimera(option, encimera){
    try {

        let payload = Object.assign({}, encimera);
        switch (option){
            case 'coleccion':
                payload.show_coleccion = true
                break;
            case 'faldon':
                payload.show_faldon = true
                break;
            case 'ancho':
                payload.show_ancho = true
                break;
            case 'eje':
                payload.show_eje = true
                break;
            case 'acabado':
                payload.show_acabado = true
                break;
        }

        const response = await axios.get(api.getEndpoint('encimera'), {params:payload} );
        return response.data;

        return response.data;
    } catch (error) {
        console.error('Error fetching collections:', error);
        throw error;
    }
}

export async function fetchOptionsLavabo(option, lavabo){
    try {

        let payload = Object.assign({}, lavabo);
        switch (option){
            case 'coleccion':
                payload.show_coleccion = true
                break;
            case 'color':
                payload.show_colorLavabo = true
                break;

        }
        const response = await axios.get(api.getEndpoint('lavabo'), {params:payload} );
        return response.data;

        return response.data;
    } catch (error) {
        console.error('Error fetching collections:', error);
        throw error;
    }
}

export async function fetchOptionsEspejo(option, espejo){
    try {

        let payload = Object.assign({}, espejo);
        switch (option){
            case 'coleccion':
                payload.show_coleccion = true
                break;
            case 'medidas':
                payload.show_medidas = true
                break;

        }
        const response = await axios.get(api.getEndpoint('espejo'), {params:payload} );
        return response.data;

        return response.data;
    } catch (error) {
        console.error('Error fetching collections:', error);
        throw error;
    }
}

export async function UpdateConfigurationObject(element, idConf) {

}


export async function CreateConfigurationObject(objData) {

    try {
        let payload;

        switch (objData.current_obj) {
            case 'mueble':
                payload = Object.assign({}, objData.mueble);
                break;
            case 'encimera':
                payload = Object.assign({}, objData.encimera);
                break;
            case 'lavabo':
                payload = Object.assign({}, objData.lavabo);
                break;
            case 'espejo':
                payload = Object.assign({}, objData.espejo);
                break;
        }

        payload.object_type = objData.current_obj;

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
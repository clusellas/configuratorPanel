// ConfiguratorObjectController.js
import axios from 'axios';
import ConfiguratorObject from '../classes/ConfiguratorObjectModel';
import api from "../api";

export async function fetchConfiguratorObject(configuratorObjectId) {
    try {
        const url = api.getEndpoint('configuratorObject', configuratorObjectId);
        const response = await axios.get(url);


        const { id, coleccion, design, ancho, eje } = response.data;
        return new ConfiguratorObject(id, coleccion, design, ancho, eje);
    } catch (error) {
        console.error('Error fetching configurator object:', error);
        throw error;
    }
}

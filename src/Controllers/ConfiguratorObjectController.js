// ConfiguratorObjectController.js
import axios from 'axios';
import ConfiguratorObject from '../classes/ConfiguratorObjectModel';
import api from "../api";

export async function fetchConfiguratorObject(configuratorObjectId) {
    try {
        const url = api.getEndpoint('getconfigurationObject', configuratorObjectId);
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error fetching configurator object:', error);
        throw error;
    }
}
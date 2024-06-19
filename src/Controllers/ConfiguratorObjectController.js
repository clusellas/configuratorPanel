// ConfiguratorObjectController.js
import axios from 'axios';
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

export async function fetchOptionById(optionId){
    try {
        const url = api.getEndpoint('getOption', optionId);
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error fetching configurator object:', error);
        throw error;
    }
}

export async function updateConfiguratorObject(configuratorObjectId, optionId, valueId){
    try {
        const payload = {
            optionId: optionId,
            valueId: valueId
        };
        const url = api.getEndpoint('updateConfiguratorObject', configuratorObjectId);
        const jsonData = JSON.stringify(payload);

        const response = await axios.post(url, jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching configurator object:', error);
        throw error;
    }
}


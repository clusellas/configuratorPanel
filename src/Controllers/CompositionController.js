
import api from "../api";
import axios from "axios";

export async function fetchComposition(compositionId) {
    try {
        const url = api.getEndpoint('getComposition', compositionId);
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error fetching compositiion with configuration objects:', error);
        throw error;
    }
}

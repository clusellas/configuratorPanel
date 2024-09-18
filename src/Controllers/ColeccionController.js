// PARECE QUE NO SE USA

// src/components/QuestionController.js

import api from "../api";

export function fetchCollections() {
    const url = api.getEndpoint("colecciones");

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Error en la llamada a API: ${response.status}`
                );
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error(`Error fetching collections: ${error}`);
        });
}

export async function HandleImageClick(collection) {
    try {
        const payload = {
            coleccion_id: collection.id,
        };
        const jsonData = JSON.stringify(payload);

        // const response = await axios.post(api.getEndpoint('configurationObject'), jsonData, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        //
        // return response.data;
        return collection.id;
    } catch (error) {
        console.error("Error making POST request:", error);
        throw error;
    }
}

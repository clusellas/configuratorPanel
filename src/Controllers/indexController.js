// src/components/QuestionController.js

import api from "../api";

export function CreateComposition() {
    let jsonData = {
        mueble: null,
        encimera: null,
        lavabo: null,
        espejo: null,
    };
    const url = api.getEndpoint("composition", jsonData);
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((respose) => {
            if (!respose.ok) {
                throw new Error(`Error en la llamada a API: ${respose.status}`);
            }
            return respose.json();
        })
        .catch((error) => {
            throw new Error(`Error making POST request: ${error}`);
        });
}

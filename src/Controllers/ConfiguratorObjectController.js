// ConfiguratorObjectController.js
import api from "../api";

// PARECE QUE NO SE USA
export function fetchConfiguratorObject(configuratorObjectId) {
    const url = api.getEndpoint("getconfigurationObject", configuratorObjectId);

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en llamada a API: ${response.status}`);
            }

            return response.json();
        })
        .catch((error) => {
            throw new Error(`Error fetching configurator object: ${error}`);
        });
}

export function fetchOptionById(optionId) {
    const url = api.getEndpoint("getOption", optionId);

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en llamada a API: ${response.status}`);
            }

            return response.json();
        })
        .catch((error) => {
            throw new Error(`Error fetching configurator object: ${error}`);
        });
}

export async function updateConfiguratorObject(
    configuratorObjectId,
    optionId,
    valueId
) {
    const payload = {
        optionId: optionId,
        valueId: valueId,
    };
    const url = api.getEndpoint(
        "updateConfiguratorObject",
        configuratorObjectId
    );
    const jsonData = JSON.stringify(payload);

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en llamada a API: ${response.status}`);
            }
            return response.json();
        })
        .then((data) =>
            console.log(
                `Respuesta de back haciendo update de configurator objec es:  ${data["message"]}`
            )
        )
        .catch((error) => {
            throw new Error(`Error fetching configurator object: ${error}`);
        });
}

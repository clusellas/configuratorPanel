import api from "../api";
import { error } from "pdf-lib";

export function fetchOptionsMueble(option, mueble, composition_id) {
    let payload = Object.assign({}, mueble);

    switch (option) {
        case "coleccion":
            payload.show_coleccion = true;
            break;
        case "design":
            payload.show_design = true;
            break;
        case "ancho":
            payload.show_ancho = true;
            break;
        case "eje":
            payload.show_eje = true;
            break;
    }

    payload.composition_id = composition_id;

    const params = new URLSearchParams(payload).toString();
    const url = `${api.getEndpoint("mueble")}?${params}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en llamada a API: ${response.status}`);
            }

            return response.json();
        })
        .catch((error) => {
            throw new Error(`Error fetching collections: ${error}`);
        });
}

export function fetchOptionsEncimera(option, encimera, composition_id) {
    let payload = Object.assign({}, encimera);
    switch (option) {
        case "coleccion":
            payload.show_coleccion = true;
            break;
        case "faldon":
            payload.show_faldon = true;
            break;
        case "ancho":
            payload.show_ancho = true;
            break;
        case "eje":
            payload.show_eje = true;
            break;
        case "acabado":
            payload.show_acabado = true;
            break;
    }

    payload.composition_id = composition_id;

    const params = new URLSearchParams(payload);
    const url = `${api.getEndpoint("encimera")}?${params}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en llamada a API: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error(`Error fetching collections: ${error}`);
        });
}

export async function fetchOptionsLavabo(option, lavabo, composition_id) {
    let payload = Object.assign({}, lavabo);
    switch (option) {
        case "coleccion":
            payload.show_coleccion = true;
            break;
        case "medidas":
            payload.show_medidas = true;
            break;
    }

    payload.composition_id = composition_id;

    const params = new URLSearchParams(payload);
    const url = `${api.getEndpoint("lavabo")}?${params}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en llamada a API: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error(`Error fetching collections: ${error}`);
        });
}

export function fetchOptionsEspejo(option, espejo, composition_id) {
    let payload = Object.assign({}, espejo);
    switch (option) {
        case "coleccion":
            payload.show_coleccion = true;
            break;
        case "medidas":
            payload.show_medidas = true;
            break;
    }

    payload.composition_id = composition_id;

    const params = new URLSearchParams(payload);
    const url = `${api.getEndpoint("espejo")}?${params}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en llamada a API: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error(`Error fetching collections: ${error}`);
        });
}

export function CreateConfigurationObject(objData) {
    let payload;

    switch (objData.current_obj) {
        case "mueble":
            payload = Object.assign({}, objData.mueble);
            break;
        case "encimera":
            payload = Object.assign({}, objData.encimera);
            break;
        case "lavabo":
            payload = Object.assign({}, objData.lavabo);
            break;
        case "espejo":
            payload = Object.assign({}, objData.espejo);
            break;
    }

    payload.composition = objData.composition_id;
    payload.object_type = objData.current_obj;

    const jsonData = JSON.stringify(payload);

    const url = api.getEndpoint("configurationObject");

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
        .catch((error) => {
            throw new Error(`Error fetching collections: ${error}`);
        });
}

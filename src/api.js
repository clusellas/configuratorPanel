import {updateConfiguratorObject} from "./Controllers/ConfiguratorObjectController";

const API_ROOT = 'http://localhost:8000/server'; // Replace with your root URL

const API_ENDPOINTS = {
    colecciones: '/colecciones/',
    answer: '/answers',
    configurationObject: '/configuration-object/',
    getconfigurationObject: '/configuration-object/:id/',
    updateConfiguratorObject:'/configuration-object/:id/set_value_option/',
    design:'/designcoleccion/',
    ancho:'/ancho/',
    eje:'/eje/',
    articles:'/articles/',
    mueble:'/mueble/',
    encimera:'/encimera/',
    lavabo:'/lavabo/',
    espejo:'/espejo/',
    getOption:'/opcion/:id/',

    // Add more endpoints as needed
};

export default {
    getEndpoint: (key, ...params) => {
        let endpoint = API_ENDPOINTS[key];
        // Replace URL parameters in the endpoint
        params.forEach(param => {
            endpoint = endpoint.replace(/:\w+/, param);
        });
        return `${API_ROOT}${endpoint}`;
    },
};
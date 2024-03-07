const API_ROOT = 'http://localhost:8000/server'; // Replace with your root URL

const API_ENDPOINTS = {
    colecciones: '/colecciones/',
    answer: '/answers',
    getconfigurationObject: '/configurationObject/:id/',
    configurationObject: '/configurationObject/',
    design:'/designcoleccion/',
    ancho:'/ancho/',
    eje:'/eje/',
    articles:'/articles/'
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
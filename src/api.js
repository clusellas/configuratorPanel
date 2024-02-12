// src/api.js

const API_ROOT = 'http://example.com/api'; // Replace with your root URL

const API_ENDPOINTS = {
    question: '/questions',
    answer: '/answers',
    // Add more endpoints as needed
};

export default {
    getEndpoint: (key) => `${API_ROOT}${API_ENDPOINTS[key]}`,
};

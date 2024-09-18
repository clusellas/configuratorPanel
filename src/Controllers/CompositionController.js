import api from "../api";

export function fetchComposition(compositionId) {
    const url = api.getEndpoint("getComposition", compositionId);

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error API: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error(
                "Error fetching compositiion with configuration objects:",
                error
            );
            throw error;
        });
}

// ConfiguratorObjectDetail.js
import React, { useState, useEffect } from 'react';
import { fetchConfiguratorObject } from '../Controllers/ConfiguratorObjectController';

function ConfiguratorObjectView({ configuratorObjectId }) {
    const [configuratorObject, setConfiguratorObject] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const configuratorObject = await fetchConfiguratorObject(configuratorObjectId);
                setConfiguratorObject(configuratorObject);
            } catch (error) {
                console.error('Error fetching configurator object:', error);
            }
        }

        fetchData();
    }, [configuratorObjectId]);

    if (!configuratorObject) return null;

    return (
        <div>
            <h1>Configurator Object Detail</h1>
            <p>ID: {configuratorObject.id}</p>
            <p>Coleccion: {configuratorObject.coleccion}</p>
            {/* Display other fields as needed */}
        </div>
    );
}

export default ConfiguratorObjectView;

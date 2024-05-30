import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, Box } from '@mui/material';
import { MyContext } from '../MyContext'; // Adjust the path based on your actual context file
import { generatePath, useParams } from "react-router-dom";
import { CreateComposition } from "../Controllers/indexController";
import { CreateConfigurationObject } from "../Controllers/OpcionesPrimariasController";

function Index() {
    const navigate = useNavigate();
    const { setObjData, objData } = useContext(MyContext);

    useEffect(() => {
        async function fetchData() {
            const response = await CreateComposition();
            let objectId = response.id;

            let initialObjData = {
                'composition_id': objectId,
                'current_obj': null,
                'current_opt': null,
                'mueble': {}, // State for mueble object
                'encimera': {}, // State for encimera object
                'encimera_p': {},
                'lavabo': {},
                'espejo': {}
            };
            setObjData(initialObjData);
        }
        fetchData();
    }, []);

    const ClickImage = async (image) => {
        try {
            let newobjData = objData;
            objData.current_obj = image;
            setObjData(newobjData);

            const url = generatePath("/opciones-primarias/");
            navigate(url);
        } catch (error) {
            // Handle error
        }
    };

    const images = [
        { src: 'mueble.jpg', alt: 'mueble', description: 'Empieza con un mueble' },
        { src: 'encimera.jpg', alt: 'encimera', description: 'Elige una encimera' },
        { src: 'lavabo.jpg', alt: 'lavabo', description: 'Selecciona un lavabo' },
        { src: 'espejo.jpg', alt: 'espejo', description: 'Elige un espejo' }
    ];

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Elige Tu Pieza Inicial
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {images.map((image, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={image.src}
                                alt={image.alt}
                                onClick={() => ClickImage(image.alt)}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            />
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                {image.description}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

        </Box>
    );

}

export default Index;

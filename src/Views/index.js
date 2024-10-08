import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography, Box } from "@mui/material";
import { MyContext } from "../MyContext"; // Adjust the path based on your actual context file
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
                composition_id: objectId,
                current_obj: null, // objeto actual
                current_opt: null, // opcion actual
                mueble: {}, // State for mueble object
                encimera: {}, // State for encimera object
                encimera_p: {}, // encimera plana
                lavabo: {},
                espejo: {},
            };
            setObjData(initialObjData);
        }
        fetchData();
    }, []);

    // aqui image es tipo de pieza seleccionada
    const ClickImage = async (image) => {
        try {
            objData.current_obj = image;
            setObjData(objData);
            /*
            const url = generatePath(
                `/composition/${newobjData.composition_id}`
            );
            */

            const url = "/opciones-primarias";

            navigate(url);
        } catch (error) {
            // Handle error
        }
    };

    const images = [
        {
            src: "mueble.jpg",
            alt: "mueble",
            description: "Empieza con un mueble",
        },
        {
            src: "encimera.jpg",
            alt: "encimera",
            description: "Elige una encimera",
        },
        {
            src: "lavabo.jpg",
            alt: "lavabo",
            description: "Selecciona un lavabo",
        },
        { src: "espejo.jpg", alt: "espejo", description: "Elige un espejo" },
    ];

    return (
        <Box
            sx={{
                height: "100vh",
                width: "auto",
                p: 3,
                boxSizing: "border-box",
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Elige Tu Pieza Inicial
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {images.map((image, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                        <Box sx={{ width: "100%", textAlign: "center" }}>
                            <Box
                                component="img"
                                src={image.src}
                                alt={image.alt}
                                onClick={() =>
                                    index === 0 && ClickImage(image.alt)
                                }
                                sx={{
                                    width: "90%",
                                    height: "auto",
                                    cursor:
                                        index === 0 ? "pointer" : "not-allowed",
                                    filter:
                                        index === 0
                                            ? "none"
                                            : "grayscale(100%)",

                                    transition: "transform 0.3s ease-in-out",

                                    "&:hover": {
                                        transform:
                                            index === 0 ? "scale(1.1)" : "none",
                                    },
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

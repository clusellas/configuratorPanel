import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import { MyContext } from '../MyContext'; // Adjust the path based on your actual context file
import {generatePath, useParams} from "react-router-dom";


function Index() {
    const navigate = useNavigate();
    const { setObjData, objData } = useContext(MyContext);


    useEffect(() => {
        let initialObjData = {
            'current_obj': null,
            'current_opt': null,
            'mueble': {}, // State for mueble object
            'encimera': {}, // State for encimera object
            'encimera_p' : {},
            'lavabo': {},
            'espejo': {}
        }
        setObjData(initialObjData)
    }, []);



    const ClickImage = async (image) => {
        try {
            let newobjData = objData;
            objData.current_obj = image
            setObjData(newobjData);

            const url = generatePath("/opciones-primarias/");
            // Navigate to the view displaying the newly created ConfigurationObject
            navigate(url)
            console.log(url)

            //console.log('POST request response:', response);
        } catch (error) {
            // Handle error
        }
    };

    // Sample images array for demonstration
    const images = [
        { src: 'mueble.png', alt: 'mueble' },
        { src: 'encimera.png', alt: 'encimera' },
        { src: 'espejo.png', alt: 'espejo'}
    ];



    return (
        <div className="collections-container">
            <h2>Choose your staring piece</h2>
            <Grid container spacing={2} justifyContent="center">
                {images.map((image, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <div style={{ width: '100%', height: '400px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                onClick={() => ClickImage(image.alt)}
                                style={{ width: '100%', height: 'auto', cursor: 'pointer', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}
                            />
                        </div>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                Button
            </Button>
        </div>
    );
}

export default Index;


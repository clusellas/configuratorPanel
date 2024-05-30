import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Box, Grid } from '@mui/material';
import './ImageGridDesign.css'; // Import CSS file for additional styles if needed

const SizeFrom = ({ elements, onImageClick }) => {
    const [value, setValue] = useState(elements[0].ancho.id); // State to manage input value
    const [min, setMin] = useState(1000); // State to manage minimum value
    const [max, setMax] = useState(0); // State to manage maximum value

    useEffect(() => {
        let minValue = 1000;
        let maxValue = 0;

        elements.forEach(element => {
            let value = parseInt(element.ancho.code, 10);
            if (value > maxValue) {
                maxValue = value;
            }
            if (value < minValue) {
                minValue = value;
            }
        });

        setMin(minValue);
        setMax(maxValue);
    }, [elements]);

    const handleChange = (event) => {
        setValue(event.target.value); // Update input value as it changes
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onImageClick({ 'id': value }); // Call the onSubmit function passed from the parent with the input value
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh' }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
            >
                <TextField
                    select
                    label="Ancho"
                    value={value}
                    onChange={handleChange}
                    sx={{ minWidth: 200 }}
                >
                    {/* Generate dropdown options based on the list of elements */}
                    {elements.map((element, index) => (
                        <MenuItem key={index} value={element.ancho.id}>
                            {element.ancho.code}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        </Grid>
    );
};

export default SizeFrom;

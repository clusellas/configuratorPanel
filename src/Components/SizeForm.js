import React, { useState, useEffect } from "react";
import {
    TextField,
    MenuItem,
    Button,
    Box,
    Grid,
    Dialog,
    DialogContent,
} from "@mui/material";

const SizeFrom = ({ elements, onImageClick, open, handleClose }) => {
    const [value, setValue] = useState(elements[0].ancho.id); // State to manage input value

    useEffect(() => {
        let minValue = 1000;
        let maxValue = 0;

        elements.forEach((element) => {
            let value = parseInt(element.ancho.code, 10);
            if (value > maxValue) {
                maxValue = value;
            }
            if (value < minValue) {
                minValue = value;
            }
        });
    }, [elements]);

    const handleChange = (event) => {
        setValue(event.target.value); // Update input value as it changes
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onImageClick({ id: value }); // Call the onSubmit function passed from the parent with the input value
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{ minHeight: "30vh" }}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <TextField
                                select
                                label="Ancho"
                                value={value}
                                onChange={handleChange}
                                sx={{ minWidth: "20vw" }}
                            >
                                {/* Generate dropdown options based on the list of elements */}
                                {elements.map((element, index) => (
                                    <MenuItem
                                        key={index}
                                        value={element.ancho.id}
                                    >
                                        {element.ancho.code}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SizeFrom;

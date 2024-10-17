import React, { useState } from "react";

import {
    Typography,
    Paper,
    Grid,
    Button,
    Dialog,
    DialogContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ImageContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
}));

const ImageGrid = ({ elements, onImageClick, open, handleClose }) => {
    if (!elements || elements.length === 0 || !elements[0].coleccion) {
        return null;
    }

    const filteredElements = elements.filter(
        (element) =>
            element.coleccion.image !==
            "http://localhost:8000/media/default.png"
    );

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                    <Grid container spacing={2} sx={{ p: 1 }}>
                        {filteredElements.map((elem, indexElem) => (
                            <Grid item xs={12} sm={6} md={4} key={indexElem}>
                                <ImageContainer
                                    onClick={() => onImageClick(elem.coleccion)}
                                >
                                    <img
                                        src={elem.coleccion.image}
                                        alt={elem.coleccion.code}
                                        style={{
                                            width: "90%",
                                            maxHeight: "80%",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <Typography variant="body1">
                                        {elem.coleccion.name}
                                    </Typography>
                                </ImageContainer>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ImageGrid;

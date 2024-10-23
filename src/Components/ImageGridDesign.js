import React, { useState } from "react";

import {
    Typography,
    Button,
    Paper,
    Grid,
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
    if (!elements || elements.length === 0 || !elements[0].design_coleccion) {
        return null;
    }

    const filteredElements = elements.filter(
        (element) =>
            element.design_coleccion.image !==
            "http://localhost:8000/media/default.png"
    );

    return (
        <>
            <Grid container spacing={2} sx={{ p: 1 }}>
                {filteredElements.map((elem, indexElem) => (
                    <Grid item xs={12} sm={6} md={3} key={indexElem}>
                        <ImageContainer
                            onClick={() =>
                                onImageClick(elem.design_coleccion.design)
                            }
                        >
                            <img
                                src={elem.design_coleccion.image}
                                alt={elem.design_coleccion.design.code}
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                }}
                            />
                            <Typography variant="body1">
                                {elem.design_coleccion.design.name}
                            </Typography>
                        </ImageContainer>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ImageGrid;

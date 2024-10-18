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

const ImageGridAcabado = ({ elements, onImageClick, open, handleClose }) => {
    console.log("elements  en Acabado");

    console.log(elements);
    if (elements[0].acabado == null) {
        return;
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                    <Grid container spacing={2} sx={{ p: 1 }}>
                        {elements.map((elem, indexElem) => (
                            <Grid item xs={12} sm={6} md={4} key={indexElem}>
                                <ImageContainer
                                    onClick={() => onImageClick(elem.acabado)}
                                >
                                    <img
                                        src={elem.acabado.image}
                                        alt={elem.acabado.code}
                                        style={{
                                            width: "90%",
                                            maxHeight: "80%",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <Typography variant="body1">
                                        {elem.acabado.code}
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

export default ImageGridAcabado;

/*

import React from "react";

const ImageGridAcabado = ({ elements, onImageClick, open, handleClick }) => {
    const rows = [];
    for (let i = 0; i < elements.length; i += 3) {
        rows.push(elements.slice(i, i + 3));
    }

    if (elements[0].acabado == null) {
        return;
    }

    return (
        <div className="images-in-rows-of-three">
            {rows.map((row, index) => (
                <div key={index} className="image-row">
                    {row.map((element, rowIndex) => (
                        <div key={rowIndex} className="image-column">
                            <img
                                src={element.acabado.image}
                                alt={element.acabado.code}
                                onClick={() => onImageClick(element.acabado)}
                                className="image"
                            />
                            <p>{element.acabado.code}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ImageGridAcabado;

*/

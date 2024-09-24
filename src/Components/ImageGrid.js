import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const ImageContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
}));

const ImageGrid = ({ elements, onImageClick }) => {
    // Esta basura habra que quitar
    const filteredElements = elements.filter(
        (element) =>
            element.coleccion.image !==
            "http://localhost:8000/media/default.png"
    );

    return (
        <Grid container spacing={2}>
            {filteredElements.map((elem, indexElem) => (
                <Grid item xs={12} sm={6} md={4} key={indexElem}>
                    <ImageContainer
                        onClick={() => onImageClick(elem.coleccion)}
                    >
                        <img
                            src={elem.coleccion.image}
                            alt={elem.coleccion.code}
                            style={{
                                maxWidth: "auto",
                                maxHeight: "40vh",
                                objectFit: "cover",
                            }}
                        />
                        <Typography variant="body1">
                            {elem.coleccion.name}
                        </Typography>
                    </ImageContainer>
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGrid;

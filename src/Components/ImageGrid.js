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
    if (!elements || elements.length === 0 || !elements[0].coleccion) {
        return null;
    }

    const filteredElements = elements.filter(
        (element) =>
            element.coleccion.image !==
            "http://localhost:8000/media/default.png"
    );

    return (
        <Grid container spacing={2} sx={{ p: 1 }}>
            {filteredElements.map((elem, indexElem) => (
                <Grid item xs={12} sm={6} md={4} key={indexElem}>
                    <ImageContainer
                        onClick={() => onImageClick(elem.coleccion)}
                        sx={{
                            height: "40vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
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
    );
};

export default ImageGrid;

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

    const rows = [];
    for (let i = 0; i < filteredElements.length; i += 3) {
        rows.push(filteredElements.slice(i, i + 3));
    }

    return (
        <Grid container spacing={2}>
            {rows.map((row, rowIndex) => (
                <Grid container item spacing={2} key={rowIndex}>
                    {row.map((element, elementIndex) => (
                        <Grid item xs={12} sm={6} md={4} key={elementIndex}>
                            <ImageContainer
                                onClick={() => onImageClick(element.coleccion)}
                            >
                                <img
                                    src={element.coleccion.image}
                                    alt={element.coleccion.code}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "700px",
                                        objectFit: "cover",
                                    }}
                                />
                                <Typography variant="body1">
                                    {element.coleccion.name}
                                </Typography>
                            </ImageContainer>
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGrid;

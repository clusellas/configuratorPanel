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
    if (!elements || elements.length === 0 || !elements[0].eje) {
        return null;
    }

    const filteredElements = elements.filter(
        (element) =>
            element.eje.image !== "http://localhost:8000/media/default.png"
    );

    return (
        <Grid container spacing={2}>
            {filteredElements.map((elem, indexElem) => (
                <Grid item xs={12} sm={6} md={4} key={indexElem}>
                    <ImageContainer onClick={() => onImageClick(elem.eje)}>
                        <img
                            src={elem.eje.image}
                            alt={elem.eje.code}
                            style={{
                                maxWidth: "auto",
                                maxHeight: "40vh",
                                objectFit: "cover",
                            }}
                        />
                        <Typography variant="body1">{elem.eje.name}</Typography>
                    </ImageContainer>
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGrid;

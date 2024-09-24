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

const ImageGridFaldon = ({ elements, onImageClick }) => {
    if (!elements || elements.length === 0 || !elements[0].faldon) {
        return null;
    }

    const filteredElements = elements.filter(
        (element) =>
            element.faldon.image !== "http://localhost:8000/media/default.png"
    );

    return (
        <Grid container spacing={2}>
            {filteredElements.map((elem, indexElem) => (
                <Grid item xs={12} sm={6} md={4} key={indexElem}>
                    <ImageContainer onClick={() => onImageClick(elem.faldon)}>
                        <img
                            src={elem.faldon.image}
                            alt={elem.faldon.code}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "700px",
                                objectFit: "cover",
                            }}
                        />
                        <Typography variant="body1">
                            {elem.faldon.name}
                        </Typography>
                    </ImageContainer>
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGridFaldon;

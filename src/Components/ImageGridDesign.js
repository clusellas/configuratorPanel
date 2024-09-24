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
    return (
        <Grid container spacing={2}>
            {elements.map((elem, indexElem) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={indexElem}>
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
                                maxHeight: "500px",
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
    );
};

export default ImageGrid;

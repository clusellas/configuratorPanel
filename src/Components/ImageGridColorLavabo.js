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

const ImageGridColorLavabo = ({
    elements,
    onImageClick,
    open,
    handleClose,
}) => {
    if (!elements || elements.length === 0 || !elements[0].color) {
        return null;
    }
    /*
    const filteredElements = elements.filter(
        (element) =>
            element.color.image !== "http://localhost:8000/media/default.png"
    );
*/
    return (
        <Grid container spacing={2}>
            {elements.map((elem, indexEleme) => (
                <Grid item xs={12} sm={6} md={4} key={indexEleme}>
                    <ImageContainer onClick={() => onImageClick(elem.color)}>
                        <img
                            src={elem.color.image}
                            alt={elem.color.code}
                            style={{
                                maxWidth: "auto",
                                maxHeight: "40vh",
                                objectFit: "cover",
                            }}
                        />
                        <Typography variant="body1">
                            {elem.color.name}
                        </Typography>
                    </ImageContainer>
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGridColorLavabo;

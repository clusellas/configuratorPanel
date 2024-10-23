import React from "react";
import {
    Typography,
    Grid,
    Paper,
    Dialog,
    DialogContent,
    Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ImageContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
}));

const ImageGridFaldon = ({ elements, onImageClick, open, handleClose }) => {
    if (!elements || elements.length === 0 || !elements[0].faldon) {
        return null;
    }

    return (
        <>
            <Grid container spacing={2} sx={{ p: 1 }}>
                {elements.map((elem, indexElem) => (
                    <Grid item xs={12} sm={6} md={4} key={indexElem}>
                        <ImageContainer
                            onClick={() => onImageClick(elem.faldon)}
                        >
                            <img
                                src={elem.faldon.image}
                                alt={elem.faldon.code}
                                style={{
                                    width: "90%",
                                    maxHeight: "80%",
                                    objectFit: "contain",
                                }}
                            />
                            <Typography variant="body1">
                                {elem.faldon.name}
                            </Typography>
                        </ImageContainer>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ImageGridFaldon;

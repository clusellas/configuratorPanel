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

    const filteredElements = elements.filter(
        (element) =>
            element.faldon.image !== "http://localhost:8000/media/default.png"
    );

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
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
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ImageGridFaldon;

/*
    return (
        <Grid container spacing={2}>
            {rows.map((row, rowIndex) => (
                <Grid container item spacing={2} key={rowIndex}>
                    {row.map((element, elementIndex) => (
                        <Grid item xs={12} sm={6} md={4} key={elementIndex}>
                            <ImageContainer
                                onClick={() => onImageClick(element.faldon)}
                            >
                                <img
                                    src={element.faldon.image}
                                    alt={element.faldon.code}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "700px",
                                        objectFit: "cover",
                                    }}
                                />
                                <Typography variant="body1">
                                    {element.faldon.name}
                                </Typography>
                            </ImageContainer>
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGridFaldon;


*/

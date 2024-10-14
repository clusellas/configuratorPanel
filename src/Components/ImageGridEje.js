import React, { useState } from "react";

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

const ImageGrid = ({ elements, onImageClick }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    if (!elements || elements.length === 0 || !elements[0].eje) {
        return null;
    }

    const filteredElements = elements.filter(
        (element) =>
            element.eje.image !== "http://localhost:8000/media/default.png"
    );

    return (
        <>
            <Button variant="outlined" onClick={handleOpen}>
                Eje
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                    <Grid container spacing={2} sx={{ p: 1 }}>
                        {filteredElements.map((elem, indexElem) => (
                            <Grid item xs={12} sm={6} md={4} key={indexElem}>
                                <ImageContainer
                                    onClick={() => onImageClick(elem.eje)}
                                >
                                    <img
                                        src={elem.eje.image}
                                        alt={elem.eje.code}
                                        style={{
                                            width: "90%",
                                            maxHeight: "80%",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <Typography variant="body1">
                                        {elem.eje.name}
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

export default ImageGrid;

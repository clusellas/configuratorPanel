import React, { useState } from "react";

import {
    Typography,
    Button,
    Paper,
    Grid,
    Dialog,
    DialogContent,
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

    if (!elements || elements.length === 0 || !elements[0].design_coleccion) {
        return null;
    }

    const filteredElements = elements.filter(
        (element) =>
            element.design_coleccion.image !==
            "http://localhost:8000/media/default.png"
    );

    return (
        <>
            <Button variant="outlined" onClick={handleOpen}>
                Diseño
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                    <Grid container spacing={2}>
                        {filteredElements.map((elem, indexElem) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={2.4}
                                key={indexElem}
                            >
                                <ImageContainer
                                    onClick={() =>
                                        onImageClick(
                                            elem.design_coleccion.design
                                        )
                                    }
                                >
                                    <img
                                        src={elem.design_coleccion.image}
                                        alt={elem.design_coleccion.design.code}
                                        style={{
                                            maxWidth: "100%",
                                            height: "auto",
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
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ImageGrid;

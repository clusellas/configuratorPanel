import ImageGrid from "./ImageGrid";
import ImageGridDesign from "./ImageGridDesign";
import ImageGridColorLavabo from "./ImageGridColorLavabo";
import ImageGridEje from "./ImageGridEje";
import ImageGridFaldon from "./ImageGridFaldon";
import SizeForm from "./SizeForm";
import { Box } from "@mui/material";
import React, { useState } from "react";
import ImageGridAcabado from "./ImageGridAcabado";

function OpcionesPrimariasSwitch({ current_opt, elements, ClickImage }) {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            {current_opt === "coleccion" && (
                <Box>
                    <ImageGrid
                        elements={elements}
                        onImageClick={ClickImage}
                        open={open}
                        handleClose={handleClose}
                    />
                </Box>
            )}

            {current_opt === "design" && (
                <Box style={{ display: "flex", overflow: "hidden" }}>
                    <ImageGridDesign
                        elements={elements}
                        onImageClick={ClickImage}
                        open={open}
                        handleClose={handleClose}
                    />
                </Box>
            )}

            {current_opt === "ancho" && elements[0]?.ancho && (
                <Box style={{ display: "flex", overflow: "hidden" }}>
                    <SizeForm
                        elements={elements}
                        onImageClick={ClickImage}
                        open={open}
                        handleClose={handleClose}
                    />
                </Box>
            )}

            {current_opt === "eje" && (
                <Box
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridEje
                        elements={elements}
                        onImageClick={ClickImage}
                        open={open}
                        handleClose={handleClose}
                    />
                </Box>
            )}

            {current_opt === "faldon" && (
                <Box style={{ display: "flex", overflow: "hidden" }}>
                    <ImageGridFaldon
                        elements={elements}
                        onImageClick={ClickImage}
                        open={open}
                        handleClose={handleClose}
                    />
                </Box>
            )}

            {current_opt === "color" && (
                <Box style={{ display: "flex", overflow: "hidden" }}>
                    <ImageGridColorLavabo
                        elements={elements}
                        onImageClick={ClickImage}
                        open={open}
                        handleClose={handleClose}
                    />
                </Box>
            )}

            {current_opt === "acabado" && (
                <Box style={{ display: "flex", overflow: "hidden" }}>
                    <ImageGridAcabado
                        elements={elements}
                        onImageClick={ClickImage}
                        open={open}
                        handleClose={handleClose}
                    />
                </Box>
            )}
        </>
    );
}

export default OpcionesPrimariasSwitch;

import ImageGrid from "./ImageGrid";
import ImageGridDesign from "./ImageGridDesign";
import ImageGridColorLavabo from "./ImageGridColorLavabo";
import ImageGridEje from "./ImageGridEje";
import ImageGridFaldon from "./ImageGridFaldon";
import SizeForm from "./SizeForm";
import { Box } from "@mui/material";
import React, { useState } from "react";

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
        </>
    );
}

export default OpcionesPrimariasSwitch;

/*
switch (current_opt) {
        case "coleccion":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGrid elements={elements} onImageClick={ClickImage} />
                </div>
            );
        case "design":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridDesign
                        elements={elements}
                        onImageClick={ClickImage}
                    />
                </div>
            );
        case "ancho":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <SizeForm elements={elements} onImageClick={ClickImage} />
                </div>
            );
        case "eje":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridEje
                        elements={elements}
                        onImageClick={ClickImage}
                    />
                </div>
            );
        case "faldon":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridFaldon
                        elements={elements}
                        onImageClick={ClickImage}
                    />
                </div>
            );
        case "medidas":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridMedidas
                        elements={elements}
                        onImageClick={ClickImage}
                    />
                </div>
            );
        case "color":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridColorLavabo
                        elements={elements}
                        onImageClick={ClickImage}
                    />
                </div>
            );

        default:
            return <div>AN ERROR OCURRED</div>;
    }

*/

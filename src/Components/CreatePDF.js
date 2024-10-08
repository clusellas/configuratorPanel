import { useState } from "react";
import PrintIcon from "@mui/icons-material/Print"; // Import pdf-lib library
import { Button } from "@mui/material";
import { PDFDocument } from "pdf-lib";

function CreatePdf() {
    const [generatingPDF, setGeneratingPDF] = useState(false);

    async function createPDF({ mueble, encimera, lavabo, espejo, Eje }) {
        // Set generatingPDF to true to show loading indicator
        setGeneratingPDF(true);

        // Get canvas element
        const canvas = document.querySelector("canvas");

        // Create PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const imgData = canvas.toDataURL("image/png");
        const img = await pdfDoc.embedPng(imgData);

        // Define text styles
        const titleFontSize = 20;
        const normalFontSize = 12;
        const midFontSize = 16;

        // Add title and small image (occupies 1 space)
        const titleText = "RESUMEN DE TU CONFIGURACIÓN";
        const titleWidth = titleText.length * titleFontSize * 0.6;
        page.drawText(titleText, {
            x: width / 2 - titleWidth / 2,
            y: height - 30,
            size: titleFontSize,
        });

        // Add new section occupying 5 vertical spaces
        const newSectionText = "New Section";
        //const newSectionWidth = newSectionText.length * titleFontSize * 0.6;
        const newSectionY = height - 280; // Adjust as needed
        const height_image = 200;
        const width_image = (height_image * canvas.width) / canvas.height;

        page.drawImage(img, {
            x: width / 2 - width_image / 2,
            y: height - 280,
            width: width_image,
            height: height_image,
        });

        let partNames = [];
        let partPrices = [];
        let partDescriptions = [];
        let valueDescriptions = [];
        let fullReferencia = [];

        if (mueble) {
            partNames.push(mueble.articulo.attr.CodigoArticulo);
            partPrices.push(mueble.current_price + "€");
            partDescriptions.push(mueble.articulo.attr.DescripcionArticulo);
            valueDescriptions.push(mueble.descripcion_valores);
            fullReferencia.push(mueble.full_referencia);
        }
        if (encimera) {
            partNames.push(encimera.articulo.attr.CodigoArticulo);
            partPrices.push(encimera.current_price + "€");
            partDescriptions.push(encimera.articulo.attr.DescripcionArticulo);
            valueDescriptions.push(encimera.descripcion_valores);
            fullReferencia.push(encimera.full_referencia);
        }
        if (lavabo) {
            if (Eje === "X") {
                partNames.push(lavabo.articulo.attr.CodigoArticulo);
                partPrices.push(lavabo.current_price + "€");
                partDescriptions.push(lavabo.articulo.attr.DescripcionArticulo);
                valueDescriptions.push(lavabo.descripcion_valores);
                fullReferencia.push(lavabo.full_referencia);
            }
            partNames.push(lavabo.articulo.attr.CodigoArticulo);
            partPrices.push(lavabo.current_price + "€");
            partDescriptions.push(lavabo.articulo.attr.DescripcionArticulo);
            valueDescriptions.push(lavabo.descripcion_valores);
            fullReferencia.push(lavabo.full_referencia);
        }
        if (espejo) {
            partNames.push(espejo.articulo.attr.CodigoArticulo);
            partPrices.push(espejo.current_price + "€");
            partDescriptions.push(espejo.articulo.attr.DescripcionArticulo);
            valueDescriptions.push(espejo.descripcion_valores);
            fullReferencia.push(espejo.full_referencia);
        }

        const partYPositions = [
            newSectionY - 60,
            newSectionY - 140,
            newSectionY - 220,
            newSectionY - 300,
            newSectionY - 380,
        ];
        partYPositions.forEach((y, index) => {
            if (
                partNames[index] &&
                partPrices[index] &&
                partDescriptions[index]
            ) {
                page.drawText(partNames[index] + "_" + fullReferencia[index], {
                    x: 20,
                    y: y,
                    size: midFontSize,
                });
                page.drawText(partPrices[index], {
                    x: width - 100,
                    y: y,
                    size: normalFontSize,
                });

                const maxTextWidth = width; // Maximum width for text
                const descriptionLines = splitTextIntoLines(
                    partDescriptions[index],
                    normalFontSize,
                    maxTextWidth
                );
                const valueLines = splitTextIntoLines(
                    valueDescriptions[index],
                    normalFontSize,
                    maxTextWidth
                );
                let yOffset = y - 15;
                descriptionLines.forEach((line, idx) => {
                    page.drawText(line, {
                        x: 20,
                        y: yOffset,
                        size: normalFontSize,
                    });
                    yOffset -= 15; // Adjust line spacing as needed
                });
                valueLines.forEach((line, idx) => {
                    page.drawText(line, {
                        x: 20,
                        y: yOffset,
                        size: normalFontSize,
                    });
                    yOffset -= 15; // Adjust line spacing as needed
                });
            }
        });

        // Add total price (occupies 1 space)
        let totalPrice = partPrices
            .map((price) => parseFloat(price.replace("€", "")))
            .reduce((total, price) => total + price, 0);
        totalPrice = totalPrice + "€";

        page.drawText("Total: " + totalPrice, {
            x: 20,
            y: 30,
            size: midFontSize,
        });

        // Save PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "rendered_scene.pdf";
        link.click();

        // Set generatingPDF to false after PDF is generated
        setGeneratingPDF(false);
    }

    function splitTextIntoLines(text, fontSize, maxWidth) {
        const words = text.split(" ");
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = fontSize * word.length * 0.6; // Assuming average width of characters
            if (width < maxWidth) {
                const potentialLine = currentLine + " " + word;
                const potentialLineWidth =
                    fontSize * potentialLine.length * 0.6;
                if (potentialLineWidth <= maxWidth) {
                    currentLine = potentialLine;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        return lines;
    }

    return (
        <Button
            disabled={generatingPDF}
            onClick={createPDF}
            variant="contained"
            sx={{ color: "#FFF" }}
        >
            <PrintIcon />
        </Button>
    );
}

export default CreatePdf;

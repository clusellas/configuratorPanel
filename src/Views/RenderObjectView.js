import { Canvas } from "@react-three/fiber";
import RenderObject from "../Components/RenderObject";
import "../Components/RenderObject.css";

import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import PrintIcon from "@mui/icons-material/Print"; // Import pdf-lib library

/*
Elimina todos los caracteres despues del ultimo punto de str
Si no hay punto, no cambia nada
*/

function removeAfterLastPoint(str) {
    if (!str) {
        return "";
    } else {
        const lastPointIndex = str.lastIndexOf(".");
        if (lastPointIndex !== -1) {
            return str.substring(0, lastPointIndex);
        }
        return str;
    }
}

/*
Elimina el primer carácter después del último punto ('.') en una cadena.
Si no hay un punto o despues de punto hay menos de 1 letra, la cadena se devuelve tal cual. 
*/

function removeEjeButKeepFaldon(str) {
    const lastDotIndex = str.lastIndexOf(".");

    // If there's no dot, return the input as is
    if (lastDotIndex === -1) {
        return str;
    }

    // Split the string into two parts: before and after the last dot
    const beforeLastDot = str.substring(0, lastDotIndex + 1);
    const afterLastDot = str.substring(lastDotIndex + 1);

    // If the part after the last dot is not empty, remove the first character
    const modifiedAfterLastDot =
        afterLastDot.length > 1 ? afterLastDot.substring(1) : "";

    // Concatenate the parts together
    return beforeLastDot + modifiedAfterLastDot;
}

export default function RenderObjectView({ composition }) {
    const [generatingPDF, setGeneratingPDF] = useState(false);

    const ROOT = "/models/";

    let mueble = composition.mueble;
    let encimera = composition.encimera;
    let lavabo = composition.lavabo;
    let espejo = composition.espejo;

    let muebleChosenOptions;
    let encimeraChosenOptions;
    let lavaboChosenOptions;
    let espejoChosenOptions;

    let muebleRoutes = [];
    let encimeraRoutes = [];
    let lavaboRoutes = [];
    let espejoRoutes = [];

    let Eje;
    let valorEje;

    if (mueble != null) {
        let colectionFolder = mueble.articulo.attr.coleccion.code + "/";

        let ref = mueble.figure_referencia ? mueble.figure_referencia : "";
        console.log("ruta_con_eje");
        console.log(colectionFolder);
        console.log(mueble.articulo.attr.CodigoArticulo);
        console.log(ref);
        let ruta_con_eje =
            ROOT +
            colectionFolder +
            mueble.articulo.attr.CodigoArticulo +
            "." +
            ref +
            ".obj";
        let ruta_sin_eje =
            ROOT +
            colectionFolder +
            removeAfterLastPoint(mueble.articulo.attr.CodigoArticulo) +
            "." +
            ref +
            ".obj";

        muebleRoutes = [ruta_con_eje, ruta_sin_eje];

        muebleChosenOptions = mueble.opciones_y_valores;

        Eje = mueble.articulo.attr.eje.code;
        valorEje = mueble.articulo.attr.valor_eje;
    }
    if (encimera != null) {
        let ruta_con_eje;
        let ruta_sin_eje;
        if (encimera.articulo.attr.plana === false) {
            let colectionFolder = encimera.articulo.attr.coleccion.code + "/";

            let ref = encimera.figure_referencia
                ? encimera.figure_referencia
                : "";
            let extra = "ST";
            if (mueble) {
                if (mueble.articulo.attr.composicion_simetrica === true) {
                    extra = "CS";
                }
            }
            ref = ref + "." + extra;

            ruta_con_eje =
                ROOT +
                colectionFolder +
                encimera.articulo.attr.CodigoArticulo +
                "." +
                ref +
                ".obj";
            ruta_sin_eje =
                ROOT +
                colectionFolder +
                removeAfterLastPoint(encimera.articulo.attr.CodigoArticulo) +
                "." +
                ref +
                ".obj";
        } else {
            let colectionFolder = encimera.articulo.attr.coleccion.code + "/";

            ruta_con_eje =
                ROOT +
                colectionFolder +
                encimera.articulo.attr.CodigoArticulo +
                ".obj";
            ruta_sin_eje =
                ROOT +
                colectionFolder +
                removeEjeButKeepFaldon(encimera.articulo.attr.CodigoArticulo) +
                ".obj";
        }

        encimeraRoutes = [ruta_con_eje, ruta_sin_eje];

        encimeraChosenOptions = encimera.opciones_y_valores;

        Eje = mueble.articulo.attr.eje.code;
    }
    if (lavabo != null) {
        let colectionFolder = lavabo.articulo.attr.coleccion.code + "/";

        let ruta_con_eje =
            ROOT +
            colectionFolder +
            lavabo.articulo.attr.CodigoArticulo +
            ".obj";
        let ruta_sin_eje =
            ROOT +
            colectionFolder +
            removeAfterLastPoint(lavabo.articulo.attr.CodigoArticulo) +
            ".obj";
        lavaboRoutes = [ruta_con_eje, ruta_sin_eje];

        lavaboChosenOptions = lavabo.opciones_y_valores;
    }
    if (espejo != null) {
        let colectionFolder = espejo.articulo.attr.coleccion.code + "/";

        let ref = espejo.figure_referencia ? espejo.figure_referencia : "";
        ref = "." + ref ? ref : "";
        let ruta_con_eje =
            ROOT +
            colectionFolder +
            espejo.articulo.attr.CodigoArticulo +
            ref +
            ".obj";
        let ruta_sin_eje =
            ROOT +
            colectionFolder +
            removeAfterLastPoint(espejo.articulo.attr.CodigoArticulo) +
            "." +
            ref +
            ".obj";
        espejoRoutes = [ruta_con_eje, ruta_sin_eje];

        espejoChosenOptions = espejo.opciones_y_valores;
    }

    async function createPDF() {
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
        /*
        console.log(page.getSize())


*/

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
        <div className="render-container">
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    zIndex: "999",
                }}
            >
                <button onClick={createPDF} disabled={generatingPDF}>
                    <PrintIcon />
                </button>
            </div>

            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                style={{ touchAction: "none" }}
            >
                <color attach="background" args={["#161617"]} />
                <fog attach="fog" args={["#131415", 10, 20]} />

                <RenderObject
                    muebleRoutes={muebleRoutes}
                    encimeraRoutes={encimeraRoutes}
                    lavaboRoutes={lavaboRoutes}
                    espejoRoutes={espejoRoutes}
                    muebleChosenOptions={muebleChosenOptions}
                    encimeraChosenOptions={encimeraChosenOptions}
                    lavaboChosenOptions={lavaboChosenOptions}
                    espejoChosenOptions={espejoChosenOptions}
                    eje={Eje}
                    valorEje={valorEje}
                />
            </Canvas>
        </div>
    );
}

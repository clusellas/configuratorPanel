import {Canvas} from "@react-three/fiber";
import RenderObject from "../Components/RenderObject";
import "../Components/RenderObject.css";

import { PDFDocument, rgb } from 'pdf-lib'
import {useState} from "react"; // Import pdf-lib library


function removeAfterLastPoint(str) {
    if (!str){
        return "";
    }else{
        const lastPointIndex = str.lastIndexOf('.');
        if (lastPointIndex !== -1) {
            return str.substring(0, lastPointIndex);
        }
        return str;
    }

}



export default function RenderObjectView({ composition}) {

    const [generatingPDF, setGeneratingPDF] = useState(false);


    const ROOT = '/models/'

    let mueble = composition.mueble;
    let encimera = composition.encimera;
    let lavabo = composition.lavabo;
    let espejo = composition.espejo;

    let muebleChosenOptions;
    let encimeraChosenOptions;
    let lavaboChosenOptions;
    let espejoChosenOptions;

    let muebleRoutes = [] ;
    let encimeraRoutes= [] ;
    let lavaboRoutes= [] ;
    let espejoRoutes= [] ;


    if (mueble!= null){
        let colectionFolder = mueble.articulo.attr.coleccion.code + "/"

        let ref = mueble.figure_referencia ? mueble.figure_referencia : "";
        let ruta_con_eje = ROOT + colectionFolder + mueble.articulo.attr.CodigoArticulo+ "." + ref + ".obj";
        let ruta_sin_eje = ROOT + colectionFolder + removeAfterLastPoint(mueble.articulo.attr.CodigoArticulo) + "." + ref + ".obj";
        muebleRoutes = [ruta_con_eje, ruta_sin_eje]

        muebleChosenOptions = mueble.opciones_y_valores;
    }
    if (encimera!=null){
        let colectionFolder = encimera.articulo.attr.coleccion.code + "/"

        let ref = encimera.figure_referencia ? encimera.figure_referencia : "";
        let ruta_con_eje = ROOT + colectionFolder + encimera.articulo.attr.CodigoArticulo+ "." + ref + ".obj";
        let ruta_sin_eje = ROOT + colectionFolder + removeAfterLastPoint(encimera.articulo.attr.CodigoArticulo) + "." + ref + ".obj";
        encimeraRoutes = [ruta_con_eje, ruta_sin_eje]

        encimeraChosenOptions = encimera.opciones_y_valores;
    }
    if (lavabo!=null){
        let colectionFolder = lavabo.articulo.attr.coleccion.code + "/"

        let ref = lavabo.figure_referencia ? lavabo.figure_referencia : "";
        let ruta_con_eje = ROOT + colectionFolder + lavabo.articulo.attr.CodigoArticulo+ "." + ref + ".obj";
        let ruta_sin_eje = ROOT + colectionFolder + removeAfterLastPoint(lavabo.articulo.attr.CodigoArticulo) + "." + ref + ".obj";
        lavaboRoutes = [ruta_con_eje, ruta_sin_eje]

        lavaboChosenOptions = lavabo.opciones_y_valores;
    }
    if (espejo!=null){
        let colectionFolder = espejo.articulo.attr.coleccion.code + "/"

        let ref = espejo.figure_referencia ? espejo.figure_referencia : "";
        ref = "." + ref ? ref : "";
        let ruta_con_eje = ROOT + colectionFolder + espejo.articulo.attr.CodigoArticulo + ref + ".obj";
        let ruta_sin_eje = ROOT + colectionFolder + removeAfterLastPoint(espejo.articulo.attr.CodigoArticulo) + "." + ref + ".obj";
        espejoRoutes = [ruta_con_eje, ruta_sin_eje]

        espejoChosenOptions = espejo.opciones_y_valores;

    }
    console.log('----------------')
    console.log(muebleRoutes)
    console.log(encimeraRoutes)
    console.log(lavaboRoutes)
    console.log(espejoRoutes)

    console.log(muebleChosenOptions)
    console.log(encimeraChosenOptions)
    console.log(lavaboChosenOptions)
    console.log(espejoChosenOptions)

    console.log('----------------')

    async function createPDF() {
        // Set generatingPDF to true to show loading indicator
        setGeneratingPDF(true);

        // Get canvas element
        const canvas = document.querySelector('canvas');

        // Create PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const imgData = canvas.toDataURL('image/png');
        const img = await pdfDoc.embedPng(imgData);

        // Draw image on the PDF
        page.drawImage(img, {
            x: 0,
            y: height - (canvas.height * width / canvas.width),
            width,
            height: canvas.height * width / canvas.width
        });

        // Save PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'rendered_scene.pdf';
        link.click();

        // Set generatingPDF to false after PDF is generated
        setGeneratingPDF(false);
    }


    return (
        <div className="render-container">
            <button onClick={createPDF} disabled={generatingPDF}>
                {generatingPDF ? 'Generating PDF...' : 'Save as PDF'}
            </button>

            <Canvas gl={{ preserveDrawingBuffer: true }}>
                <color attach="background" args={["#9bbee3"]} />
                <fog attach="fog" args={["#9bbee3", 10, 20]} />
                <RenderObject
                    muebleRoutes ={muebleRoutes}
                    encimeraRoutes={encimeraRoutes}
                    lavaboRoutes={lavaboRoutes}
                    espejoRoutes={espejoRoutes}
                    muebleChosenOptions={muebleChosenOptions}
                    encimeraChosenOptions={encimeraChosenOptions}
                    lavaboChosenOptions={lavaboChosenOptions}
                    espejoChosenOptions={espejoChosenOptions}
                />
            </Canvas>
        </div>
    );
}

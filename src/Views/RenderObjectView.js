import { Canvas } from "@react-three/fiber";
import RenderObject from "../Components/RenderObject";
import CreatePdf from "../Components/CreatePDF";
import { Typography, Box, Button } from "@mui/material";
import NewCompositionButton from "../Components/NewCompositionButton";

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

        let ref = mueble.figure_referencia
            ? `.${mueble.figure_referencia}`
            : "";

        let ruta_con_eje =
            ROOT +
            colectionFolder +
            mueble.articulo.attr.CodigoArticulo +
            ref +
            ".obj";

        console.log(ruta_con_eje);

        let ruta_sin_eje =
            ROOT +
            colectionFolder +
            removeAfterLastPoint(mueble.articulo.attr.CodigoArticulo) +
            ref +
            ".obj";

        muebleRoutes = [ruta_con_eje, ruta_sin_eje];

        muebleChosenOptions = mueble.opciones_y_valores;

        Eje = mueble.articulo.attr.eje.code;
        valorEje = mueble.articulo.attr.valor_eje;
    }

    if (encimera != null) {
        console.log("encimera");
        console.log(encimera);

        console.log(encimera.figure_referencia);

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

            console.log(ruta_con_eje);

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

        console.log("espejo");
        console.log(ruta_con_eje);

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

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography variant="h1"> Configurador 3D</Typography>
            <Box
                sx={{
                    height: "60vh",
                    width: "50vw",
                    position: "relative",
                    top: "10vh",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        zIndex: 10,
                        top: 0,
                        right: 0,
                        padding: "10px",
                    }}
                >
                    <CreatePdf
                        mueble={mueble}
                        encimera={encimera}
                        lavabo={lavabo}
                        espejo={espejo}
                        Eje={Eje}
                    />
                </Box>

                <Canvas
                    gl={{ preserveDrawingBuffer: true }}
                    style={{ touchAction: "none", height: "100%" }}
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
            </Box>
            <Box sx={{ position: "relative", top: "13vh" }}>
                <NewCompositionButton />
            </Box>
        </Box>
    );
}

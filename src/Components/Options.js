import { Box, Typography, Button, Grid } from "@mui/material";
import { MyContext } from "../MyContext";
import { useContext, useEffect, useState } from "react";
import {
    CreateConfigurationObject,
    fetchOptionsEncimera,
    fetchOptionsEspejo,
    fetchOptionsLavabo,
    fetchOptionsMueble,
} from "../Controllers/OpcionesPrimariasController";
import Loading from "./Loading";
import OpcionesPrimariasSwitch from "./OpcionesPrimariasSwitch";
import { useNavigate } from "react-router-dom";
import MuebleOptions from "./MuebleOptions";
import EncimeraOptions from "./EncimeraOptions";

function Options({ composition, setComposition }) {
    const { setObjData, objData } = useContext(MyContext);

    const opcionesPrimarias = {
        mueble: ["coleccion", "design", "ancho", "eje"],
        encimera: ["coleccion", "ancho", "eje", "faldon", "acabado"],
        encimera_plana: ["coleccion", "ancho", "eje", "faldon"],
        lavabo: ["coleccion", "color"],
        espejo: ["coleccion", "medidas"],
    };

    return (
        <Box
            sx={{
                height: "100vh",
                width: "30vw",
                boxSizing: "border-box",
                overflowY: "auto",
            }}
        >
            {
                <MuebleOptions
                    composition={composition}
                    setComposition={setComposition}
                />
            }

            {composition.mueble && <EncimeraOptions />}
        </Box>
    );
}

export default Options;

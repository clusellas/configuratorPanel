import { Button, Typography } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../MyContext";
import { fetchOptionsMueble } from "../Controllers/OpcionesPrimariasController";

function MuebleOptions() {
    const { setObjData, objData } = useContext(MyContext);
    const [elements, setElements] = useState([]);
    const opcionesPrimariasMueble = ["coleccion", "design", "ancho", "eje"];
    const [opcionNum, setOpcionNum] = useState(0);

    console.log(objData);

    function handelButton(opcion) {
        setOpcionNum((prev) => prev + 1);
        setObjData((prev) => ({
            ...prev,
            mueble: {
                ...prev.mueble,
                [opcion]: "Best",
            },
        }));
    }
    console.log(opcionNum);
    return (
        <>
            <Typography variant="h5"> Opciones mueble</Typography>

            {/*
                        <Button
                onClick={() => handelButton(opcionesPrimariasMueble[opcionNum])}
            >
                add collecion
            </Button>
            */}
        </>
    );
}

export default MuebleOptions;

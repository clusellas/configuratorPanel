import { Button, Typography, List, ListItem, Divider } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../MyContext";
import { fetchOptionsMueble } from "../Controllers/OpcionesPrimariasController";
import OpcionesPrimariasSwitch from "./OpcionesPrimariasSwitch";

function MuebleOptions() {
    const { setObjData, objData } = useContext(MyContext);
    const [elements, setElements] = useState([]);

    const [currentOption, setCurrentOpcion] = useState(null);
    const opcionesPrimariasMueble = ["coleccion", "design", "ancho", "eje"];

    async function getElements(opcion) {
        try {
            let data;

            data = await fetchOptionsMueble(
                opcion,
                objData.mueble,
                objData.composition_id
            );

            setElements(data);
        } catch (error) {}
    }

    function handleButtonClick(opcion) {
        setElements([]);
        setCurrentOpcion(opcion);
        getElements(opcion);
    }

    async function ClickImage(element) {
        setElements([]);
        setObjData((prev) => ({
            ...prev,
            [prev.current_obj]: {
                ...prev[prev.current_obj],
                [prev.current_opt]: element.id,
            },
        }));
        await nextOption();
    }

    const nextOption = async () => {
        const currentIndex = opcionesPrimariasMueble.indexOf(
            objData.current_opt
        );

        let nextIndex;
        // If the current option is found in the array
        if (currentIndex !== -1) {
            // Calculate the next index
            nextIndex = currentIndex + 1;
            setObjData((prev) => ({
                ...prev,
                current_opt: opcionesPrimariasMueble[nextIndex],
            }));
        }
    };

    const ShowMuebleOptions = () => {
        return opcionesPrimariasMueble.map((opcion, index) => (
            <ListItem key={index}>
                <Button onClick={() => handleButtonClick(opcion)}>
                    {opcion}
                </Button>
            </ListItem>
        ));
    };
    console.log("elements");

    console.log(elements);

    return (
        <>
            <Typography variant="h5"> Opciones mueble</Typography>
            <List>{ShowMuebleOptions()}</List>
            <Divider />
            {currentOption && elements.length > 0 && (
                <OpcionesPrimariasSwitch
                    current_opt={currentOption}
                    elements={elements}
                    ClickImage={ClickImage}
                />
            )}
        </>
    );
}

export default MuebleOptions;

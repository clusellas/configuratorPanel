import { Button, Typography, List, ListItem, Divider } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../MyContext";
import {
    fetchOptionsEncimera,
    CreateConfigurationObject,
} from "../Controllers/OpcionesPrimariasController";
import OpcionesPrimariasSwitch from "./OpcionesPrimariasSwitch";

function EncimeraOptions() {
    const { setObjData, objData } = useContext(MyContext);
    const [elements, setElements] = useState([]);
    const [encimeraChanged, setEncimeraChanged] = useState(false);

    const [currentOption, setCurrentOpcion] = useState(null);
    const opcionesPrimariasEncimera = ["coleccion", "ancho", "eje", "faldon"];

    useEffect(() => {
        CreateObjct();
    }, [objData]);

    const CreateObjct = async () => {
        if (
            Object.keys(objData.encimera).length ===
                opcionesPrimariasEncimera.length &&
            encimeraChanged
        ) {
            setEncimeraChanged(false);
            const response = await CreateConfigurationObject(
                objData,
                "encimera"
            );

            let objectId = response.id;

            setObjData((prev) => ({
                ...prev,
                ObjConfigId: objectId,
                current_opt:
                    opcionesPrimariasEncimera[
                        opcionesPrimariasEncimera.length - 1
                    ],
            }));
        }
    };

    async function getElements(opcion) {
        try {
            let data;

            data = await fetchOptionsEncimera(
                opcion,
                objData.encimera,
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
            encimera: {
                ...prev.encimera,
                [currentOption]: element.id,
            },
        }));
        await nextOption();
    }

    const nextOption = async () => {
        setEncimeraChanged(true);

        const currentIndex = opcionesPrimariasEncimera.indexOf(currentOption);

        let nextIndex;
        // If the current option is found in the array
        if (currentIndex !== -1) {
            // Calculate the next index
            nextIndex = currentIndex + 1;
            setObjData((prev) => ({
                ...prev,
                current_opt: opcionesPrimariasEncimera[nextIndex],
            }));
        }
    };

    const ShowEncimeraOptions = () => {
        return opcionesPrimariasEncimera.map((opcion, index) => (
            <ListItem key={index}>
                <Button onClick={() => handleButtonClick(opcion)}>
                    {opcion}
                </Button>
            </ListItem>
        ));
    };

    return (
        <>
            <Typography variant="h5"> Opciones encimera</Typography>
            <List>{ShowEncimeraOptions()}</List>
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

export default EncimeraOptions;

import {
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box,
    Grid,
} from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../MyContext";
import {
    fetchOptionsMueble,
    CreateConfigurationObject,
} from "../Controllers/OpcionesPrimariasController";
import OpcionesPrimariasSwitch from "./OpcionesPrimariasSwitch";
import {
    fetchOptionById,
    updateConfiguratorObject,
} from "../Controllers/ConfiguratorObjectController";
import OptionDecide from "./OptionDecide";
import { fetchComposition } from "../Controllers/CompositionController";

function MuebleOptions({ composition, setComposition }) {
    const { setObjData, objData } = useContext(MyContext);
    const [elements, setElements] = useState([]);
    const [muebleChanged, setMuebleChanged] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [currentCO, setCurrentCO] = useState(null);

    const [currentOption, setCurrentOpcion] = useState(null);
    const opcionesPrimariasMueble = ["coleccion", "design", "ancho", "eje"];

    useEffect(() => {
        fetchData();
        CreateObjct();
    }, [objData]);

    // Crea modelo si usuario ya escogió todas las opcionesPrimariasMueble necesarias
    const CreateObjct = async () => {
        if (
            Object.keys(objData.mueble).length ===
                opcionesPrimariasMueble.length &&
            muebleChanged
        ) {
            setMuebleChanged(false);
            const response = await CreateConfigurationObject(objData, "mueble");

            let objectId = response.id;

            setObjData((prev) => ({
                ...prev,
                ObjConfigId: objectId,
                current_opt:
                    opcionesPrimariasMueble[opcionesPrimariasMueble.length - 1],
            }));
        }
    };

    // hace llamada a back para recibir todos los elementos  para una opcion de opcionesPrimariasMueble
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
            mueble: {
                ...prev.mueble,
                [currentOption]: element.id,
            },
        }));
        await nextOption();
    }

    const nextOption = async () => {
        setMuebleChanged(true);
        const currentIndex = opcionesPrimariasMueble.indexOf(currentOption);

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
            <Button
                key={index}
                onClick={() => handleButtonClick(opcion)}
                disabled={
                    opcion === opcionesPrimariasMueble[1] &&
                    !objData.mueble.coleccion
                }
            >
                {opcion}
            </Button>
        ));
    };

    // ----------------------------------------------------------
    //  LAS CONFIGURACIONES DE MUEBLE
    // ----------------------------------------------------------

    async function fetchData() {
        const composition = await fetchComposition(objData.composition_id);
        setComposition(composition);
        setCurrentCO(composition.mueble);

        if (selectedOption == null && composition.mueble?.current_linea) {
            changeOption(composition.mueble.current_linea.opciones[0].id);
        }

        // si se ha cambiado algo de opciones iniciales reapunta las configuraciones
        if (selectedOption != null && composition.mueble?.current_linea) {
            var foundInOpcions = false;

            for (
                let i = 0;
                i < composition.mueble.current_linea.opciones.length;
                i++
            ) {
                if (
                    composition.mueble.current_linea.opciones[i].id ===
                    selectedOption.id
                ) {
                    foundInOpcions = true;
                }
            }
            if (!foundInOpcions) {
                changeOption(composition.mueble.current_linea.opciones[0].id);
            }
        }
    }

    const ShowConfigurationOpcions = () => {
        return composition.mueble.current_linea.opciones.map(
            (option, index) => (
                //  <ListItem key={index}>
                <Button
                    key={index}
                    onClick={() => changeOption(option.id)}
                    variant={
                        selectedOptionId === option.id
                            ? "contained"
                            : "outlined"
                    }
                >
                    {option.name}
                </Button>
                //</ListItem>
            )
        );
    };

    const changeOption = async (option_id) => {
        // Handle the click event for the option
        setSelectedOptionId(option_id);
        const option = await fetchOptionById(option_id);
        setSelectedOption(option);
    };

    const selectValue = async (opcion, selectedValue) => {
        const response = await updateConfiguratorObject(
            currentCO.id,
            opcion.id,
            selectedValue.id
        );

        fetchData();
    };

    return (
        <>
            <Typography variant="h4"> Opciones mueble</Typography>
            <List>{ShowMuebleOptions()}</List>
            <Divider />
            {currentOption && elements.length > 0 && (
                <OpcionesPrimariasSwitch
                    current_opt={currentOption}
                    elements={elements}
                    ClickImage={ClickImage}
                />
            )}
            {composition.mueble && (
                <Box>
                    <Typography variant="h6">
                        Opciones de personalización de mueble
                    </Typography>
                    {ShowConfigurationOpcions()}
                    <Grid item xs={4}>
                        {currentCO?.opciones_y_valores && (
                            <OptionDecide
                                element={selectedOption}
                                onValueClick={selectValue}
                                opciones_y_valores={
                                    currentCO.opciones_y_valores
                                }
                            />
                        )}
                    </Grid>
                </Box>
            )}
            <Divider />
        </>
    );
}

export default MuebleOptions;

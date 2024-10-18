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

function Options() {
    const { setObjData, objData } = useContext(MyContext);
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const opcionesPrimarias = {
        mueble: ["coleccion", "design", "ancho", "eje"],
        encimera: ["coleccion", "ancho", "eje", "faldon", "acabado"],
        encimera_plana: ["coleccion", "ancho", "eje", "faldon"],
        lavabo: ["coleccion", "color"],
        espejo: ["coleccion", "medidas"],
    };

    /*
    if (objData.current_obj == null) {
        setObjData((prev) => ({
            ...prev,
            current_obj: "mueble",
        }));

    }
    if (objData.current_opt == null) {
        setObjData((prev) => ({
            prev,
            current_opt: opcionesPrimarias[prev.current_obj][0],
        }));
        
        objData.current_opt = opcionesPrimarias[objData.current_obj][0];
        setObjData(objData);
        
    }
*/

    /*
    const fetchData = async () => {
        setLoading(true);

        try {
            let data;

            switch (objData.current_obj) {
                case "mueble":
                    data = await fetchOptionsMueble(
                        objData.current_opt,
                        objData.mueble,
                        objData.composition_id
                    );

                    break;
                case "encimera":
                    data = await fetchOptionsEncimera(
                        objData.current_opt,
                        objData.encimera,
                        objData.composition_id
                    );
                    break;
                case "lavabo":
                    data = await fetchOptionsLavabo(
                        objData.current_opt,
                        objData.lavabo,
                        objData.composition_id
                    );
                    break;
                case "espejo":
                    data = await fetchOptionsEspejo(
                        objData.current_opt,
                        objData.espejo,
                        objData.composition_id
                    );
                    break;
                default:
                    console.log("Error en switch de tipo de componente");
                    break;
            }
            setElements(data);

            // check if elements are all null
            let all_null = true;
            for (let key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    if (data[0][key] !== null) {
                        all_null = false; // If any tuple has a non-null value, return false
                    }
                }
            }

            if (all_null) {
                fetchData();
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
*/
    /*
    useEffect(() => {
        CreateObjct();
    }, [objData]);

    const CreateObjct = async () => {
        const optionArray = opcionesPrimarias[objData.current_obj];

        if (
            objData.current_opt === undefined &&
            Object.keys(objData[objData.current_obj]).length > 0
        ) {
            const response = await CreateConfigurationObject(objData);
            console.log("response");

            console.log(response);
            let objectId = response.id;

            setObjData((prev) => ({
                ...prev,
                ObjConfigId: objectId,
                current_opt: optionArray[optionArray.length - 1],
            }));
        }
    };
    */
    /*
    const ClickImage = async (element) => {
        setLoading(true);
        try {
            setObjData((prev) => ({
                ...prev,
                [prev.current_obj]: {
                    ...prev[prev.current_obj],
                    [prev.current_opt]: element.id,
                },
            }));
            await nextOption();
        } catch (error) {
            // Handle error
        }
    };

    const nextOption = async () => {
        const optionArray = opcionesPrimarias[objData.current_obj];
        const currentIndex = optionArray.indexOf(objData.current_opt);

        let nextIndex;
        // If the current option is found in the array
        if (currentIndex !== -1) {
            // Calculate the next index
            nextIndex = currentIndex + 1;
            setObjData((prev) => ({
                ...prev,
                current_opt: optionArray[nextIndex],
            }));
        }
    };*/

    return (
        <Box
            sx={{
                border: "2px solid red",
                height: "100vh",
                width: "30vw",
                boxSizing: "border-box",
            }}
        >
            {<Typography variant="h4"> Options</Typography>}
            {
                //loading && <Loading />
            }
            {<MuebleOptions />}
            {<EncimeraOptions />}
            {/*
                <OpcionesPrimariasSwitch
                    current_opt={objData.current_opt}
                    elements={elements}
                    ClickImage={ClickImage}
                />
            */}
        </Box>
    );
}

export default Options;

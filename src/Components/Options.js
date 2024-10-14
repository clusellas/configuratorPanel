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

    if (objData.current_obj == null) {
        objData.current_obj = "mueble";
        setObjData(objData);
    }
    if (objData.current_opt == null) {
        objData.current_opt = opcionesPrimarias[objData.current_obj][0];
        setObjData(objData);
    }

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

    useEffect(() => {
        fetchData();
    }, []);

    const ClickImage = async (element) => {
        setLoading(true);
        try {
            //objData[objData.current_obj][objData.current_opt] = element.id;

            objData[objData.current_obj][objData.current_opt] = element.id;

            setObjData(objData);

            await nextOption();

            fetchData();
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
            objData.current_opt = optionArray[nextIndex];
            //console.log(nextIndex)
        }

        setObjData(objData);

        if (nextIndex >= optionArray.length) {
            const response = await CreateConfigurationObject(objData);
            let objectId = response.id;

            objData.ObjConfigId = objectId;

            let nextIndex = optionArray.length - 1;
            objData.current_opt = optionArray[nextIndex];

            setObjData(objData);
        }
    };

    return (
        <Box
            sx={{
                border: "2px solid red",
                height: "100vh",
                width: "30vw",
                boxSizing: "border-box",
            }}
        >
            <Typography variant="h4"> Options</Typography>
            {loading && <Loading />}
            {
                <OpcionesPrimariasSwitch
                    current_opt={objData.current_opt}
                    elements={elements}
                    ClickImage={ClickImage}
                />
            }
        </Box>
    );
}

export default Options;

/*
            <OpcionesPrimariasSwitch
                current_opt={objData.current_opt}
                elements={elements}
                ClickImage={ClickImage}
            />

*/

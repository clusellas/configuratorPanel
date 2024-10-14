import React, { useState, useEffect, useContext } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import ImageGrid from "../Components/ImageGrid";
import {
    CreateConfigurationObject,
    fetchOptionsEncimera,
    fetchOptionsEspejo,
    fetchOptionsLavabo,
    fetchOptionsMueble,
} from "../Controllers/OpcionesPrimariasController";
import ImageGridDesign from "../Components/ImageGridDesign";
import SizeForm from "../Components/SizeForm";
import ImageGridEje from "../Components/ImageGridEje";
import ImageGridMedidas from "../Components/ImageGridMedidas";
import ImageGridFaldon from "../Components/ImageGridFaldon";
import ImageGridColorLavabo from "../Components/ImageGridColorLavabo";
import { CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";

function OpcionesPrimariasView() {
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setObjData, objData } = useContext(MyContext);

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
                nextOption(); // If all tuples have null values, return true
                fetchData();
            } else {
                if (data.length === 1) {
                    // await ClickImage(data[0][Object.keys(data[0])[0]]);
                }
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

            const url = generatePath("/composition/:id", {
                id: objData.composition_id,
            });
            // Navigate to the view displaying the newly created ConfigurationObject
            navigate(url);
        }
    };

    if (loading) {
        return (
            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Grid>
        );
    }

    console.log(objData.current_opt);

    switch (objData.current_opt) {
        case "coleccion":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGrid elements={elements} onImageClick={ClickImage} />
                </div>
            );
        case "design":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridDesign
                        elements={elements}
                        onImageClick={ClickImage}
                    />
                </div>
            );
        case "ancho":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <SizeForm elements={elements} onImageClick={ClickImage} />
                </div>
            );
        case "eje":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridEje
                        elements={elements}
                        onImageClick={ClickImage}
                    />
                </div>
            );
        case "faldon":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridFaldon
                        elements={elements}
                        onImageClick={ClickImage}
                    />
                </div>
            );
        case "medidas":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridMedidas
                        elements={elements}
                        onImageClick={ClickImage}
                    />
                </div>
            );
        case "color":
            return (
                <div
                    className="collections-container"
                    style={{ display: "flex", overflow: "hidden" }}
                >
                    <ImageGridColorLavabo
                        elements={elements}
                        onImageClick={ClickImage}
                    />
                </div>
            );

        default:
            return <div>AN ERROR OCURRED</div>;
    }
}

export default OpcionesPrimariasView;

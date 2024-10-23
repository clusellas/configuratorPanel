import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
    styled,
    AccordionSummary,
    Accordion,
    AccordionDetails,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function SelectedOptions({ composition }) {
    const [opcionsNames, setOpcionsNames] = useState([]);
    const { setObjData, objData } = useContext(MyContext);
    const [muebleExpanded, setMuebleExpanded] = useState(false);
    const [encimeraExpanded, setEncimeraExpanded] = useState(false);

    const url = "http://localhost:8000/server/opcions-names/";

    const PaperList = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.background.main,
        padding: 3,
    }));

    const AccordionList = styled(Accordion)(({ theme }) => ({
        backgroundColor: theme.palette.background.main,
        padding: 3,
    }));

    useEffect(() => {
        const data = objData;
        fetch(url, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => setOpcionsNames(data))
            .catch((error) => console.log(error));
    }, [objData]);

    ///////////////////////  Mueble /////////////////////////////////////

    const muebleItems = () => {
        const mueble = opcionsNames["mueble"] ? opcionsNames["mueble"] : {};

        if (Object.keys(mueble).length === 0) {
            return <Typography> no hay nada</Typography>;
        }

        return Object.entries(mueble).map(
            ([mueble_key, mueble_value], mueble_index) => (
                <ListItem key={mueble_index}>
                    <ListItemText
                        primary={
                            <span>
                                <strong> {mueble_key.toUpperCase()}: </strong>
                                {mueble_value}
                            </span>
                        }
                    />
                </ListItem>
            )
        );
    };

    const showConfigurationMueble = () => {
        // ordenar por orden y eliminar las opciones con code X ya que sobran (Eje, Ancho)
        const opciones = composition.mueble?.opciones_y_valores;

        if (opciones) {
            const opcionesFilter = opciones.filter((x) => x.valor.code !== "X");
            opcionesFilter.sort((a, b) => a.opcion.orden - b.opcion.orden);
            return opcionesFilter.map((conf, conf_index) => (
                <ListItem key={conf_index}>
                    <ListItemText
                        primary={
                            <span>
                                <strong> {conf.opcion.name}: </strong>{" "}
                                {conf.valor.code}
                            </span>
                        }
                    />
                </ListItem>
            ));
        }
    };

    ///////////////////////  Encimera /////////////////////////////////////

    const encimeraItems = () => {
        const encimera = opcionsNames["encimera"]
            ? opcionsNames["encimera"]
            : {};

        if (Object.keys(encimera).length === 0) {
            return <Typography> no hay nada</Typography>;
        }

        return Object.entries(encimera).map(
            ([encimera_key, encimera_value], encimera_index) => (
                <ListItem key={encimera_index}>
                    <ListItemText
                        primary={
                            <span>
                                <strong>{encimera_key.toUpperCase()}: </strong>
                                {encimera_value}
                            </span>
                        }
                    />
                </ListItem>
            )
        );
    };

    const ShowPrice = () => {
        return (
            <Typography variant="h4" color="success.main">
                {composition.total_price} €
            </Typography>
        );
    };

    return (
        <Box sx={{ position: "relative", height: "100vh" }}>
            <Box sx={{ height: "5%" }}>
                <Typography variant="h4"> Selected Options</Typography>
            </Box>
            <Box
                sx={{
                    p: 2,
                    width: "20vw",
                    height: "85%",
                    boxSizing: "border-box",
                    overflowY: "auto",
                }}
            >
                <Accordion
                    expanded={muebleExpanded}
                    onChange={() => setMuebleExpanded(!muebleExpanded)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="mueble-content"
                        id="mueble-header"
                    >
                        <Typography variant="h5">Mueble</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>{muebleItems()}</List>

                        {composition.mueble && (
                            <>
                                <PaperList elevation={5}>
                                    <Typography variant="h5">
                                        Personalización de mueble
                                    </Typography>
                                    <List>{showConfigurationMueble()}</List>
                                </PaperList>
                            </>
                        )}
                    </AccordionDetails>
                </Accordion>

                <Divider />
                {composition.mueble && (
                    <Accordion
                        expanded={encimeraExpanded}
                        onChange={() => setEncimeraExpanded(!encimeraExpanded)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="mueble-content"
                            id="mueble-header"
                        >
                            <Typography variant="h5">Encimera</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>{encimeraItems()}</List>
                        </AccordionDetails>
                    </Accordion>
                )}
            </Box>
            {composition.total_price && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        boxSizing: "border-box",
                        p: 2,
                    }}
                >
                    {ShowPrice()}
                </Box>
            )}
        </Box>
    );
}

export default SelectedOptions;

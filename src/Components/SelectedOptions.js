import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";

function SelectedOptions({ composition }) {
    const [opcionsNames, setOpcionsNames] = useState([]);
    const { setObjData, objData } = useContext(MyContext);

    const url = "http://localhost:8000/server/opcions-names/";

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

    const muebleItems = () => {
        const mueble = opcionsNames["mueble"] ? opcionsNames["mueble"] : {};

        if (Object.keys(mueble).length === 0) {
            return <Typography> no hay nada</Typography>;
        }

        return Object.entries(mueble).map(
            ([mueble_key, mueble_value], mueble_index) => (
                <ListItem key={mueble_index}>
                    <ListItemText primary={`${mueble_key}:  ${mueble_value}`} />
                </ListItem>
            )
        );
    };

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
                        primary={`${encimera_key}:  ${encimera_value}`}
                    />
                </ListItem>
            )
        );
    };

    return (
        <Box
            sx={{
                border: "2px solid red",
                width: "20vw",
                height: "100vh",
                boxSizing: "border-box",
            }}
        >
            <Typography variant="h4"> Selected Options</Typography>

            <List>
                <Typography variant="h5">Mueble</Typography>
                {muebleItems()}
                <Divider />

                <Divider />

                <Typography variant="h5">Encimera</Typography>

                {encimeraItems()}
            </List>
        </Box>
    );
}

export default SelectedOptions;

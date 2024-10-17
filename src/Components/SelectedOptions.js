import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import React, { useContext } from "react";
import { MyContext } from "../MyContext";

function SelectedOptions({ composition }) {
    const { setObjData, objData } = useContext(MyContext);

    const muebleItems = () => {
        const mueble = objData["mueble"] ? objData["mueble"] : {};

        if (Object.keys(mueble).length === 0) {
            return <Typography> no hay nada</Typography>;
        }

        return Object.entries(objData["mueble"]).map(
            ([mueble_key, mueble_value], mueble_index) => (
                <ListItem key={mueble_index}>
                    <ListItemText primary={`${mueble_key}:  ${mueble_value}`} />
                </ListItem>
            )
        );
    };

    const objDataItems = () => {
        return Object.entries(objData).map(([key, value], index) => (
            <ListItem key={index}>
                <ListItemText primary={`${key}:  ${value}`} />
            </ListItem>
        ));
    };
    /*
    const showPrice = () => {
        return (
            <ListItem key="price">
                <ListItemText primary={`Precio total: ${objData.price}`} />
            </ListItem>
        );
    };
*/
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
            </List>
        </Box>
    );
}

export default SelectedOptions;

/*
                {Object.entries(objData["mueble"]).map(
                    ([mueble_key, mueble_value], mueble_index) => (
                        <ListItem>
                            <ListItemText
                                key={mueble_index}
                                primary={`${mueble_key}:  ${mueble_value}`}
                            />
                        </ListItem>
                    )
                )}

*/

/*
 <List>
                {Object.entries(objData).map(([map_key, map_value], index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            {map_key === "mueble" ? (
                                Object.entries(map_value).map(
                                    (
                                        [mueble_map_key, mueble_map_value],
                                        index_mueble
                                    ) => (
                                        <ListItemText
                                            key={index_mueble}
                                            primary={`${mueble_map_key}  =   ${mueble_map_value}`}
                                        />
                                    )
                                )
                            ) : (
                                <ListItemText
                                    primary={`${map_key}  =   ${map_value}`}
                                />
                            )}
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
*/

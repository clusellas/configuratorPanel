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

    const mueble = objData["mueble"];
    console.log("mueble");

    console.log(mueble);

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
            <List sx={{ ml: "10px" }}>
                {Object.entries(composition).map(([key, value], index) =>
                    key !== "id" ? (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText
                                    primary={`${key} : ${value ? value : "-"}`}
                                />
                            </ListItem>
                            <Divider variant="middle" component="li" />
                        </React.Fragment>
                    ) : null
                )}
            </List>
        </Box>
    );
}

export default SelectedOptions;

/*
<Box
            sx={{
                border: "2px solid red",
                width: "20vw",
                height: "100vh",
                boxSizing: "border-box",
            }}
        >
            <Typography variant="h4"> Selected Options</Typography>
            <List sx={{ ml: "10px" }}>
                {Object.entries(objData).map(([key, value], index) =>
                    key !== "id" ? (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText
                                    primary={`${key} : ${value ? value : "-"}`}
                                />
                            </ListItem>
                            <Divider variant="middle" component="li" />
                        </React.Fragment>
                    ) : null
                )}
            </List>
        </Box>

*/

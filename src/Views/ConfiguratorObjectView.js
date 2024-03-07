import React, { useState, useEffect } from 'react';
import { fetchConfiguratorObject } from '../Controllers/ConfiguratorObjectController';
import {generatePath, useParams} from "react-router-dom";
import {Button, Grid, Box} from "@mui/material";
import {HandleImageClickDesign} from "../Controllers/DesignController";

function ConfiguratorObjectView() {

    const { id } = useParams();
    const [CO, setCO] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);


    useEffect(() => {
        async function fetchData() {
            try {
                const configuratorObject = await fetchConfiguratorObject(id);
                setCO(configuratorObject)
                console.log(CO)
            } catch (error) {
                console.error('Error fetching configurator object:', error);
            }
        }

        fetchData();
    },[]);


    const changeOption = function (option_id) {
        // Handle the click event for the option
        setSelectedOption(option_id);
        console.log('Selected option:', option_id);
    };

    if (!CO) return null;

    return (
        <div>
            <Grid height='90%' container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={8}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {CO.current_linea.opciones.map((option, index) => (
                                <Grid item x={2}>
                                    <Button
                                        key={option.id}
                                        variant={selectedOption === option.id ? 'contained' : 'outlined'}
                                        color="primary"
                                        onClick={() => changeOption(option.id)}>
                                        {option.name}
                                    </Button>
                                </Grid>
                            ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            izq abajo
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        height='90%'
                        width='90%'
                        my={4}
                        display="flex"
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                    >
                        This Box uses MUI System props for quick customization.
                    </Box>

                </Grid>
            </Grid>

            {/* Display other fields as needed */}
        </div>
    );
}

export default ConfiguratorObjectView;

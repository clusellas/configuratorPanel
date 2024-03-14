import React, { useState, useEffect } from 'react';
import {
    fetchConfiguratorObject,
    fetchOptionById,
    updateConfiguratorObject
} from '../Controllers/ConfiguratorObjectController';
import {generatePath, useParams} from "react-router-dom";
import {Button, Grid, Box} from "@mui/material";
import {HandleImageClickDesign} from "../Controllers/DesignController";
import OptionDecide from "../Components/OptionDecide";
import RenderObject from "../Components/RenderObject.js"
import Test from "../Components/TEST";


function ConfiguratorObjectView() {

    const { id } = useParams();
    const [CO, setCO] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState(null);



    useEffect(() => {
        async function fetchData() {
            try {
                const configuratorObject = await fetchConfiguratorObject(id);
                setCO(configuratorObject)

                changeOption(configuratorObject.current_linea.opciones[0].id)
                console.log(CO)
            } catch (error) {
                console.error('Error fetching configurator object:', error);
            }
        }

        fetchData();
    },[]);


    const changeOption = async (option_id) => {
        // Handle the click event for the option
        setSelectedOptionId(option_id);
        const option = await fetchOptionById(option_id);
        setSelectedOption(option);

        console.log('Selected option:', option_id);
    };

    const selectValue = async (opcion , selectedValue) => {
        const response = await updateConfiguratorObject(id, opcion.id, selectedValue.id);

        const configuratorObject = await fetchConfiguratorObject(id);
        setCO(configuratorObject);

        console.log('Selected option:', selectedValue.id);
    };

    function findIndexSelectedOptionInLinea(){
        if (!selectedOption || !CO) {
            return;
        } else {

            for (let i = 0; i < CO.current_linea.opciones.length; i++) {
                if(CO.current_linea.opciones[i].id == selectedOptionId){
                    return i;
                }
            }

        }
    }
    function navigation(direction){
        if (!selectedOption || !CO) {
            return;
        } else {
            let index = findIndexSelectedOptionInLinea();
            if (direction == 'back') {
                index = index-1;
            } else if (direction == 'next') {
                index = index+1;
            }else{
                return;
            }

            if (index == -1 || index == CO.current_linea.opciones.length){
                return;
            }
            changeOption(CO.current_linea.opciones[index].id);
        }

        console.log('Selected option:', direction);
    }

    if (!CO) return null;

    return (
        <div>
            <Grid height='90%' container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={8}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            {CO.current_linea.opciones.map((option, index) => (
                                <Grid item x={2}>
                                    <Button
                                        key={option.id}
                                        variant={selectedOptionId === option.id ? 'contained' : 'outlined'}
                                        color="primary"
                                        size='small'
                                        onClick={() => changeOption(option.id)}>
                                        {option.name}
                                    </Button>
                                </Grid>
                            ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{height:"50%"}}>
                                <RenderObject></RenderObject>
                        </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <OptionDecide element={selectedOption} onValueClick={selectValue} opciones_y_valores={CO.opciones_y_valores} navigation={navigation}></OptionDecide>

                </Grid>
            </Grid>

            {/* Display other fields as needed */}
        </div>
    );
}

export default ConfiguratorObjectView;

import React, {useState, useEffect, useContext, useRef} from 'react';
import {
    fetchConfiguratorObject,
    fetchOptionById,
    updateConfiguratorObject
} from '../Controllers/ConfiguratorObjectController';



import PrintIcon from '@mui/icons-material/Print';
import {generatePath, useNavigate, useParams} from "react-router-dom";
import {Button, Grid, Box, AppBar, Toolbar, IconButton} from "@mui/material";
import OptionDecide from "../Components/OptionDecide";
import RenderObjectView from "./RenderObjectView";
import {MyContext} from "../MyContext";
import {fetchComposition} from "../Controllers/CompositionController";



function CompositionView() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [CMPS, setCMPS] = useState(null);
    const [currentCO, setCurrentCO] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [standard, setStandard] = useState(false);
    const [showLavabo, setshowLavabo] = useState(false);

    const [unexpectedError, setUnexpectedError]  = useState(false);
    const { setObjData, objData } = useContext(MyContext);


    const fetchData = async () => {
        try {
            const composition = await fetchComposition(id);

            setCMPS(composition);

            if (objData.current_obj==null){
                setUnexpectedError(true);

                objData.composition_id = composition.id;
                if(composition.mueble){
                    objData.current_obj = 'mueble';
                }else if (composition.encimera){
                    objData.current_obj = 'encmiera';
                }else if (composition.espejo){
                    objData.current_obj = 'espejo';
                }else if (composition.lavabo){
                    objData.current_obj = 'lavabo';
                }
            }

           // console.log(objData);
            let current_linea;

            let vari = 'encimera';

            switch (objData.current_obj){
            //switch (vari){
                case 'mueble':
                    setCurrentCO(composition.mueble);
                    if (composition.mueble!= null){
                        current_linea = composition.mueble.current_linea
                    }else{
                        leaveForNewProduct()
                    }
                    break;
                case 'encimera':
                    setCurrentCO(composition.encimera);
                    if (composition.encimera!= null){
                        current_linea = composition.encimera.current_linea
                    }else{
                        leaveForNewProduct();
                    }
                    break;
                case 'lavabo':
                    setCurrentCO(composition.lavabo);
                    if (composition.lavabo!= null){
                        current_linea = composition.lavabo.current_linea
                    }else{
                        leaveForNewProduct()
                    }
                    break;
                case 'espejo':
                    setCurrentCO(composition.espejo);
                    if (composition.espejo!= null){
                        current_linea = composition.espejo.current_linea
                    }else{
                        leaveForNewProduct()
                    }
                    break;
                default:
                    let error = true;
                    break;
            }

            if (current_linea=== null){
                setStandard(true)
            }else{
                if(selectedOption==null){
                    changeOption(current_linea.opciones[0].id)
                }
            }

            if(composition.lavabo){
                setshowLavabo(true)
            }
            if(composition.encimera && composition.encimera.articulo.attr.plana === true){
                setshowLavabo(true)
            }

            //console.log(currentCO)
        } catch (error) {
            console.error('Error fetching configurator object:', error);
        }}


    useEffect(() => {

        fetchData();

    },[]);


    const leaveForNewProduct = async () => {
        const url = generatePath("/opciones-primarias/");
        // Navigate to the view displaying the newly created ConfigurationObject
        navigate(url);
        //console.log(url);

    };


    const changeOption = async (option_id) => {
        // Handle the click event for the option
        setSelectedOptionId(option_id);
        const option = await fetchOptionById(option_id);
        setSelectedOption(option);

        //console.log('Selected option:', option_id);
    };

    const selectValue = async (opcion , selectedValue) => {
        const response = await updateConfiguratorObject(currentCO.id, opcion.id, selectedValue.id);

        fetchData();

        //console.log('Selected option:', selectedValue.id);
    };

    const changeConfigurationObject = (producto) => {

        objData.current_obj = producto;
        objData.current_opt = null;

        fetchData();


    };

    function findIndexSelectedOptionInLinea(){
        if (!selectedOption || !currentCO) {
            return;
        } else {

            for (let i = 0; i < currentCO.current_linea.opciones.length; i++) {
                if(currentCO.current_linea.opciones[i].id == selectedOptionId){
                    return i;
                }
            }

        }
    }
    function navigation(direction){
        if (!selectedOption || !currentCO) {
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

            if (index == -1 || index === currentCO.current_linea.opciones.length){
                return;
            }
            changeOption(currentCO.current_linea.opciones[index].id);
        }

        //console.log('Selected option:', direction);
    }


    if (!currentCO) return null;

    return (
        <div>
            <Grid container rowSpacing={10}>
                <Grid container height='8%' item xs={12} padding-bottom={5}>
                    <AppBar position="static" color="secondary">
                        <Toolbar>
                            <Grid container justifyContent="flex-start" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item x={2}>
                                    <Button variant = 'outlined' color="primary" onClick={() => changeConfigurationObject('mueble')}>mueble</Button>
                                </Grid>
                                <Grid item x={2}>
                                    <Button variant = 'outlined' color="primary" onClick={() => changeConfigurationObject('encimera')}>encimera</Button>
                                </Grid>

                                {showLavabo && (
                                    <Grid item x={2}>
                                        <Button variant='outlined' color="primary" onClick={() => changeConfigurationObject('lavabo')}>lavabo</Button>
                                    </Grid>
                                )}
                                <Grid item x={2}>
                                    <Button variant = 'outlined' color="primary" onClick={() => changeConfigurationObject('espejo')}>espejo</Button>
                                </Grid>
                            </Grid>
                            <div>{CMPS.total_price}€</div>

                        </Toolbar>
                    </AppBar>
                </Grid>
                    <Grid height='80%' container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }} margin-top={10}>
                        <Grid item xs={8}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={12}>
                                    {standard ? false : (
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                            {currentCO.current_linea.opciones.map((option, index) => (
                                                <Grid item x={2} key={index}>
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
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={{height:"40%"}}>
                                        <RenderObjectView composition={CMPS}></RenderObjectView>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {standard ? false : (
                            <Grid item xs={4}>
                                <OptionDecide element={selectedOption} onValueClick={selectValue} opciones_y_valores={currentCO.opciones_y_valores} navigation={navigation}></OptionDecide>

                            </Grid>
                        )}


                    </Grid>

            </Grid>

        </div>
    );
}

export default CompositionView;

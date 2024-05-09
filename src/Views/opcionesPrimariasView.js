import React, {useState, useEffect, useContext} from 'react';
import CollectionsController, {fetchCollections, HandleImageClick} from '../Controllers/ColeccionController.js';
import ColeccionController from "../Controllers/ColeccionController.js";
import OptionItem from "../Components/OptionItem";
import {generatePath, useNavigate} from "react-router-dom";
import ImageGridMIU from "../Components/ImageGridMIU";
import {MyContext} from "../MyContext";
import ImageGrid from "../Components/ImageGrid";
import {
    CreateConfigurationObject,
    fetchOptionsEncimera,
    fetchOptionsEspejo,
    fetchOptionsLavabo,
    fetchOptionsMueble
} from "../Controllers/OpcionesPrimariasController";
import ImageGridDesign from "../Components/ImageGridDesign";
import SizeForm from "../Components/SizeForm";
import ImageGridEje from "../Components/ImageGridEje";
import ImageGridMedidas from "../Components/ImageGridMedidas";
import ImageGridFaldon from "../Components/ImageGridFaldon";
import ImageGridColorLavabo from "../Components/ImageGridColorLavabo";
import ImageGridAcabado from "../Components/ImageGridAcabado";


function OpcionesPrimariasView() {
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setObjData, objData } = useContext(MyContext);

    const opcionesPrimarias = {
        'mueble':['coleccion','design','ancho','eje'],
        'encimera':['coleccion','ancho','eje','faldon','acabado'],
        'encimera_plana':['coleccion','ancho','eje','faldon'],
        'lavabo':['coleccion','colorLavabo'],
        'espejo':['coleccion','medidas']
    }
    if (objData.current_obj == null){
        let newobjData = objData;
        newobjData.current_obj = 'mueble'
        setObjData(newobjData)
    }
    if (objData.current_opt == null){
        let newobjData = objData;
        newobjData.current_opt = opcionesPrimarias[objData.current_obj][0];
        setObjData(newobjData)
    }

    const fetchData = async () => {
        try {
            let data;

            switch (objData.current_obj) {
                case 'mueble':
                    data = await fetchOptionsMueble(objData.current_opt, objData.mueble);
                    break;
                case 'encimera':
                    data = await fetchOptionsEncimera(objData.current_opt, objData.encimera);
                    break;
                case 'lavabo':
                    data = await fetchOptionsLavabo(objData.current_opt, objData.lavabo);
                    break;
                case 'espejo':
                    data = await fetchOptionsEspejo(objData.current_opt, objData.espejo);
                    break;
            }
            setElements(data);

            // check if elements are all null
            let all_null = true;
            for (let key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    if (data[0][key] !== null) {
                        all_null =  false; // If any tuple has a non-null value, return false
                    }
                }
            }

            if (all_null){
                nextOption(); // If all tuples have null values, return true
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

        setLoading(true)
        try {
            let newObjData = objData;

            console.log(element)
            console.log("element id " + element.id)

            newObjData[objData.current_obj][objData.current_opt] = element.id;

            setObjData(newObjData);

            nextOption();

            fetchData();

        } catch (error) {
            // Handle error
        }
    };

    const nextOption = async () => {

        let newObjData = objData;

        const optionArray = opcionesPrimarias[objData.current_obj];
        const currentIndex = optionArray.indexOf(objData.current_opt);

        let nextIndex;
        // If the current option is found in the array
        if (currentIndex !== -1) {
            // Calculate the next index
            nextIndex = currentIndex + 1;
            newObjData.current_opt = optionArray[nextIndex];
            console.log(nextIndex)

        }

        setObjData(newObjData);

        if (nextIndex >= optionArray.length){
            const response = await CreateConfigurationObject(objData);
            let objectId = response.id

            objData.ObjConfigId = objectId;

            let nextIndex = optionArray.length-1;
            newObjData.current_opt = optionArray[nextIndex];

            setObjData(newObjData);

            const url = generatePath("/configuratorObject/:id", { id: objectId })
            // Navigate to the view displaying the newly created ConfigurationObject
            navigate(url)
            console.log(url)
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }


    switch (objData.current_opt) {
        case 'coleccion':
            return (
                <div className="collections-container" style={{ display: 'flex', overflow: 'hidden' }}>
                    <ImageGrid elements={elements} onImageClick={ClickImage} />
                </div>

            );
        case 'design':
            return (
                <div className="collections-container" style={{ display: 'flex', overflow: 'hidden' }}>
                    <ImageGridDesign elements={elements} onImageClick={ClickImage} />
                </div>

            );
        case 'ancho':
            return (
                <div className="collections-container" style={{ display: 'flex', overflow: 'hidden' }}>
                    <SizeForm elements={elements} onImageClick={ClickImage} />
                </div>

            );
        case 'eje':
            return (
                <div className="collections-container" style={{ display: 'flex', overflow: 'hidden' }}>
                    <ImageGridEje elements={elements} onImageClick={ClickImage} />
                </div>

            );
        case 'medidas':
            return (
                <div className="collections-container" style={{ display: 'flex', overflow: 'hidden' }}>
                    <ImageGridMedidas elements={elements} onImageClick={ClickImage} />
                </div>

            );
        case 'colorLavabo':
            return (
                <div className="collections-container" style={{ display: 'flex', overflow: 'hidden' }}>
                    <ImageGridColorLavabo elements={elements} onImageClick={ClickImage} />
                </div>

            );
        case 'faldon':
            return (
                <div className="collections-container" style={{ display: 'flex', overflow: 'hidden' }}>
                    <ImageGridFaldon elements={elements} onImageClick={ClickImage} />
                </div>

            );
        case 'acabado':
            return (
                <div className="collections-container" style={{ display: 'flex', overflow: 'hidden' }}>
                    <ImageGridAcabado elements={elements} onImageClick={ClickImage} />
                </div>

            );

        default:
            <div>AN ERROR OCURRED</div>


    }
}


export default OpcionesPrimariasView;

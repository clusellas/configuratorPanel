import React, {useState, useEffect, useContext} from 'react';
import CollectionsController, {fetchCollections, HandleImageClick} from '../Controllers/ColeccionController.js';
import ColeccionController from "../Controllers/ColeccionController.js";
import OptionItem from "../Components/OptionItem";
import {generatePath, useNavigate} from "react-router-dom";
import ImageGridMIU from "../Components/ImageGridMIU";
import {MyContext} from "../MyContext";
import ImageGrid from "../Components/ImageGrid";

function ColeccionView() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setObjId, objId } = useContext(MyContext);


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchCollections();
                setCollections(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const ClickImage = async (collection) => {
        try {
            const response = await HandleImageClick(collection);
            console.log('POST request response:', response);
            const coleccion_id = collection.id;
            console.log(objId);
            let newObj = objId;
            newObj.coleccion_id = coleccion_id
            setObjId(newObj);

            const url = "/design/"
            navigate(url)
            console.log(url)

        } catch (error) {
            // Handle error
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="collections-container" style={{ display: 'flex', overflow: 'hidden' }}>
            <ImageGrid elements={collections} onImageClick={ClickImage} />
        </div>

    );
}


export default ColeccionView;

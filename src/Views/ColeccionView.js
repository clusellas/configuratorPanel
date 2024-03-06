import React, {useState, useEffect, useContext} from 'react';
import CollectionsController, {fetchCollections, HandleImageClick} from '../Controllers/ColeccionController.js';
import ColeccionController from "../Controllers/ColeccionController.js";
import OptionItem from "../Components/OptionItem";
import {generatePath, useNavigate} from "react-router-dom";
import ImageGrid from "../Components/ImageGrid";
import {MyContext} from "../MyContext";

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

            const coleccion_id = collection.id;
            console.log(objId);
            let newObj = objId;
            newObj.coleccion_id = coleccion_id
            setObjId(newObj);

            const url = generatePath("/design/"); // "/users/42"
            const urll = "/design/"
            // Navigate to the view displaying the newly created ConfigurationObject
            navigate(urll)
            console.log(urll)
            console.log('POST request response:', response);
        } catch (error) {
            // Handle error
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="collections-container" style={{ display: 'flex' }}>
            <ImageGrid elements={collections} onImageClick={ClickImage} />
        </div>

    );
}


export default ColeccionView;
//
//
// return (
//     <div className="collections-container" style={{ display: 'flex', flexWrap: 'no-wrap' }}>
//         {collections.map((collection, index) => (
//             <OptionItem key={collection.code} collection={collection} onClick={ClickImage} />
//         ))}
//     </div>
//
// );

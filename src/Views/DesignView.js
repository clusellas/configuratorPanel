import React, {useState, useEffect, useContext} from 'react';
import OptionItem from "../Components/OptionItem";
import {FetchDesigns, HandleImageClickDesign} from "../Controllers/DesignController";
import ImageGrid from "../Components/ImageGrid";
import ImageGridDesign from "../Components/ImageGridDesign";
import {generatePath, useNavigate, useParams} from "react-router-dom";
import {MyContext} from "../MyContext";

function DesignView() {
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setObjId, objId } = useContext(MyContext);


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await FetchDesigns(objId.coleccion_id);
                setDesigns(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const ClickImage = async (design) => {
        try {
            console.log(design);
            const response = await HandleImageClickDesign(design);
            const design_id = design.design_coleccion.design.id;
            console.log(objId);
            let newObj = objId;
            newObj.design_id = design_id
            setObjId(newObj);

            const url = generatePath("/size/");
            // Navigate to the view displaying the newly created ConfigurationObject
            navigate(url)
            console.log(url)

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
            <ImageGridDesign elements={designs} onImageClick={ClickImage}  />
        </div>

    );
}


export default DesignView;

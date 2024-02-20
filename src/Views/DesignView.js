import React, { useState, useEffect } from 'react';
import OptionItem from "../Components/OptionItem";
import {fetchDesigns, HandleImageClickDesign} from "../Controllers/DesignController";
import ImageGrid from "../Components/ImageGrid";
import ImageGridDesign from "../Components/ImageGridDesign";
import {useParams} from "react-router-dom";

function DesignView() {
    let { id } = useParams();
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchDesigns(id);
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
            const response = await HandleImageClickDesign(design);


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

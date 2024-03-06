
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
//import { useHistory } from 'react-router-dom'; // Import useHistory hook from React Router
import api from "../api";
import {generatePath, use, useNavigate} from "react-router-dom";


export async function FetchDesigns(coleccion_id) {

    try {

        const payload = {
            coleccion: coleccion_id,
            show_design:true
        };
        const response = await axios.get(api.getEndpoint('articles'), {params:payload} );
        return response.data;
    } catch (error) {
        console.error('Error fetching collections:', error);
        throw error;
    }
}

export async function HandleImageClickDesign(Design) {
    try {

        const payload = {
            design: Design.id
        };
        const jsonData = JSON.stringify(payload);

        //const response = await axios.post(api.getEndpoint('configurationObject'), jsonData, {
        //    headers: {
        //         'Content-Type': 'application/json'
        //    }
        //});

        //const configurationObjectId = response.data.id;

        return Design.id;
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
}






// const ColeccionController = () => {
//     const [names, setNames] = useState([]);
//     const [img, setImage] = useState([]);
//
//     useEffect(() => {
//         fetchQuestion();
//     }, []);
//
//     const fetchQuestion = async () => {
//         try {
//             const response = await axios.get(api.getEndpoint('colecciones'));
//             for(var col in response.data){
//                 setNames(col.name);
//                 setImage(col.image);
//             }
//
//         } catch (error) {
//             console.error('Error fetching question:', error);
//         }
//     };
//
//     const handleOptionClick = async (optionId) => {
//         try {
//             const response = await axios.post(api.getEndpoint('question'), {
//                 optionId: optionId,
//             });
//             // Handle response if needed
//         } catch (error) {
//             console.error('Error submitting answer:', error);
//         }
//     };
//
//     return (
//         <ColeccionView
//             names={names}
//             images={img}
//             handleOptionClick={handleOptionClick}
//         />
//     );
// };


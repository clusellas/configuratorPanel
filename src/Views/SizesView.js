import React, {useState, useEffect, useContext} from 'react';
import {generatePath, useNavigate, useParams} from "react-router-dom";
import {MyContext} from "../MyContext";
import ImageGrid from "../Components/ImageGrid";
import {createObject, fetchAxis, fetchSizes} from "../Controllers/SizesAxisController";
import SizeForm from "../Components/SizeForm";
import {HandleImageClickDesign} from "../Controllers/DesignController";
import ImageGridEje from "../Components/ImageGridEje";


function SizesView() {
    const [sizes, setSizes] = useState([]);
    const [axis, setAxis] = useState([]);
    const [size, setSize]= useState('')


    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setObjId, objId } = useContext(MyContext);


    useEffect(() => {
        async function fetchData() {
            try {
                console.log(objId)
                const anchos = await fetchSizes(objId.coleccion_id, objId.design_id)
                setSizes(anchos)

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const ChooseSize = async (custom_size) => {
        try {
            let selected_id = -1;
            let minimoMayorIgual = Infinity; // Inicializamos con un valor infinito para asegurarnos de que cualquier número en el array será menor
            for (let i = 0; i < sizes.length; i++) {
                if (sizes[i].ancho.code >= custom_size && sizes[i].ancho.code < minimoMayorIgual) {
                    minimoMayorIgual = sizes[i].ancho.code;
                    selected_id = sizes[i].ancho.id;
                }
            }

            console.log(objId);
            let newObj = objId;
            newObj.ancho_valor = parseInt(custom_size);
            newObj.ancho_id = selected_id;
            setObjId(newObj);

            const ejes = await fetchAxis(objId.coleccion_id, objId.design_id,objId.ancho_id)
            setAxis(ejes)


        } catch (error) {
            // Handle error
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const ClickImage = async (axis) => {
        try {
            //assign values to context
            const eje = axis;
            console.log(objId);
            let newObj = objId;
            newObj.eje_id = eje.eje.id;
            setObjId(newObj);

            const response = await createObject(objId.coleccion_id, objId.design_id,objId.ancho_id,objId.eje_id)
            let objectId = response.id

            const url = generatePath("/configuratorObject/:id", { id: objectId })
            // Navigate to the view displaying the newly created ConfigurationObject
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
        <div className="collections-container" style={{ display: 'flex' }}>
            <SizeForm sizes={sizes} onSubmit={ChooseSize}/>
            <ImageGridEje elements={axis} onImageClick={ClickImage}/>
        </div>

    );
}


export default SizesView;

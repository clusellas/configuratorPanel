import {Canvas} from "@react-three/fiber";
import RenderObject from "../Components/RenderObject";
import "../Components/RenderObject.css";

function removeAfterLastPoint(str) {
    if (!str){
        return "";
    }else{
        const lastPointIndex = str.lastIndexOf('.');
        if (lastPointIndex !== -1) {
            return str.substring(0, lastPointIndex);
        }
        return str;
    }

}

export default function RenderObjectView({ Articulo , chosenOptions, reference_for_route}) {
    const ROOT = '/models/'
    const colectionFolder = Articulo.coleccion.code + "/"

    let ref = reference_for_route ? reference_for_route : "";
    let ruta_con_eje = ROOT + colectionFolder + Articulo.CodigoArticulo+ "." + ref + ".obj";
    let ruta_sin_eje = ROOT + colectionFolder + removeAfterLastPoint(Articulo.CodigoArticulo) + "." + ref + ".obj";
    console.log(ruta_con_eje +  ruta_sin_eje)

    return (
        <div className="render-container">
            <Canvas>
                <color attach="background" args={["#9bbee3"]} />
                <fog attach="fog" args={["#9bbee3", 10, 20]} />
                <RenderObject rutas ={[ruta_con_eje, ruta_sin_eje]} chosenOptions={chosenOptions}/>
            </Canvas>
        </div>
    );
}

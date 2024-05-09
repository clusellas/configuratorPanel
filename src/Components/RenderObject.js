import "./RenderObject.css";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import {Environment, MeshReflectorMaterial, OrbitControls, PresentationControls, Stage} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());




export default function RenderObject({ rutas , chosenOptions}) {
    let obj = null;
    let obj_con_eje = useLoader(OBJLoader, rutas[0]);
    let obj_sin_eje = useLoader(OBJLoader, rutas[1]);

    const texture_dict = {
        'TABLMARINO_ASH': useLoader(THREE.TextureLoader, '/textures/TABLMARINO_ASH.png'),
        'DEFAULT': useLoader(THREE.TextureLoader, '/textures/maderaplywood.jpg'),
        'ERROR': useLoader(THREE.TextureLoader, '/textures/maderaplywood.jpg'),
        'LACADO_VERDE' : useLoader(THREE.TextureLoader, '/textures/LACADO_VERDE.png')
    }

    let texture_current_dict = {

    }


    if (obj_con_eje.children.length == 0){
        obj = obj_sin_eje;
    }else{
        obj = obj_con_eje;
    }

    console.log(rutas)
    console.log(chosenOptions)


    let materials_color;
    chosenOptions.forEach((obj, index) => {
        if (obj.opcion.es_material == true){


            chosenOptions.forEach((object_color, index_color) => {

                if(object_color.opcion.orden == obj.opcion.orden + 1 && object_color.opcion.es_color == true){
                    materials_color = object_color;
                }
            });

            let texture_file_name;
            if (materials_color && materials_color.valor.material_file_name){
                texture_file_name = obj.valor.material_folder_name + '_' + materials_color.valor.material_file_name;

            }else{
                texture_file_name = 'ERROR'
            }
            let nombre_grupo_piezas = obj.opcion.nombre_grupo_piezas;
            texture_current_dict[nombre_grupo_piezas]= texture_file_name
        }

    });


    console.log(texture_current_dict)


    obj.traverse(child => {
        if (child instanceof THREE.Mesh) {

            console.log(child.name + '-->' + texture_current_dict[child.name] )

            /*if (child.name === 'LATERALES'){

                const material = new THREE.MeshStandardMaterial( { map: texture_dict["LACADO_VERDE"] } );
                child.material = material;

            }
            else if (child.name === 'FAJA'){
                const material = new THREE.MeshStandardMaterial( { map: texture_dict["TABLMARINO_ASH"] } );
                child.material = material;
            }
            else if (child.name === 'FRONTAL') {
                child.material.map = texture_dict["ERROR"];
            }else {
                child.material.map = texture_dict["DEFAULT"];
            }*/


            if(texture_current_dict.hasOwnProperty(child.name) && texture_dict.hasOwnProperty(texture_current_dict[child.name]) ){

            }
                const material = new THREE.MeshStandardMaterial( { map: texture_dict[texture_current_dict[child.name]] } );
                child.material = material;

            }else{

                const material = new THREE.MeshStandardMaterial( { map: texture_dict['DEFAULT'] } );
                child.material = material;


        }
    });

    console.log(obj)
    return(
        <PresentationControls
            speed={1.5}
            global
            polar={[-0.2, Math.PI / 32]}
            rotation={[Math.PI / 8, Math.PI / 4, 0]}
            azimuth={[-Math.PI / 2, Math.PI / 4]}
        >
            <Stage environment="city" intensity={0.6} castShadow={false}>
                <Suspense fallback={null}>
                    <primitive object={obj} scale={0.005} />;
                </Suspense>
            </Stage>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-2}>
                <planeGeometry args={[170, 170]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={40}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#101010"
                    metalness={0.5}
                    />
            </mesh>
            <directionalLight position={[0, 10, 0]} intensity={0.7} />
            <directionalLight position={[10, 0, 0]} intensity={0.2} />
            <directionalLight position={[0, 0, 10]} intensity={0.6} />

        </PresentationControls>

    );
}

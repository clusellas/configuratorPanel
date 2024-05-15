import "./RenderObject.css";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import {Environment, MeshReflectorMaterial, OrbitControls, PresentationControls, Stage} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import React, {Suspense, useEffect, useRef} from "react";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());


export default function RenderObject({ muebleRoutes, encimeraRoutes, lavaboRoutes, espejoRoutes ,muebleChosenOptions , encimeraChosenOptions , lavaboChosenOptions , espejoChosenOptions }) {

    let mueble = null;
    let mueble_con_eje = useLoader(OBJLoader, muebleRoutes[0]);
    let mueble_sin_eje = useLoader(OBJLoader, muebleRoutes[1]);

    if (mueble_con_eje.children.length > 0){
        mueble = mueble_con_eje;
    }else if(mueble_sin_eje.children.length > 0) {
        mueble = mueble_sin_eje;
    }

    let encimera = null;
    let encimera_con_eje = useLoader(OBJLoader, encimeraRoutes[0]);
    let encimera_sin_eje = useLoader(OBJLoader, encimeraRoutes[1]);

    if (encimera_con_eje.children.length > 0){
        encimera = encimera_con_eje;
    }else if(encimera_sin_eje.children.length > 0) {
        encimera = encimera_sin_eje;
    }

    let lavabo = null;
    let lavabo_con_eje = useLoader(OBJLoader, lavaboRoutes[0]);
    let lavabo_sin_eje = useLoader(OBJLoader, lavaboRoutes[1]);

    if (lavabo_con_eje.children.length > 0){
        lavabo = lavabo_con_eje;
    }else if(lavabo_sin_eje.children.length > 0) {
        lavabo = lavabo_sin_eje;
    }

    let espejo = null;
    let espejo_con_eje = useLoader(OBJLoader, espejoRoutes[0]);
    let espejo_sin_eje = useLoader(OBJLoader, espejoRoutes[1]);

    if (espejo_con_eje.children.length > 0){
        espejo = espejo_con_eje;
    }else if(espejo_sin_eje.children.length > 0) {
        espejo = espejo_sin_eje;
    }

    let muebleBoundingBox;
    let muebleCenter;
    let encimeraBoundingBox ;
    let encimeraCenter;
    let espejoBoundingBox ;
    let espejoCenter;

    const scale = 0.003;
    const zero_z = -10;



    const texture_dict = {
        'TABLMARINO_ASH': useLoader(THREE.TextureLoader, '/textures/TABLMARINO_ASH.png'),
        'TABLMARINO_CHARCOAL': useLoader(THREE.TextureLoader, '/textures/MATERIALES/TAB.MARINO/CHARCOAL.jpg'),
        'TABLMARINO_NOGAL': useLoader(THREE.TextureLoader, '/textures/MATERIALES/TAB.MARINO/NOGAL.jpg'),

        'CARRARA': useLoader(THREE.TextureLoader, '/textures/MATERIALES/PIEDRA/carrara.jpg'),
        'MARFIL': useLoader(THREE.TextureLoader, '/textures/MATERIALES/PIEDRA/crema marfil.jpg'),
        'MARRON': useLoader(THREE.TextureLoader, '/textures/MATERIALES/PIEDRA/marron imperial.jpg'),
        'NEGRO': useLoader(THREE.TextureLoader, '/textures/MATERIALES/PIEDRA/negro marquina.jpg'),
        'GRIS': useLoader(THREE.TextureLoader, '/textures/MATERIALES/PIEDRA/PIETRA GRIS.jpg'),
        'VERDE': useLoader(THREE.TextureLoader, '/textures/MATERIALES/PIEDRA/verde india.jpg'),

        'DEFAULT': useLoader(THREE.TextureLoader, '/textures/maderaplywood.jpg'),
        'ERROR': useLoader(THREE.TextureLoader, '/textures/maderaplywood.jpg'),
        'PARED': useLoader(THREE.TextureLoader, '/textures/MATERIALES/PARED.jpg'),


    }


    let texture_current_dict = {

    }


    let materials_color;

    const computeTotalBoundingBox = (object) => {
        const totalBoundingBox = new THREE.Box3();

        if (object != null){
            object.traverse((child) => {
                if (child.geometry) {
                    // Compute the bounding box of the child's geometry
                    const childGeometry = child.geometry;
                    childGeometry.computeBoundingBox();

                    // Merge the child's bounding box with the total bounding box
                    totalBoundingBox.union(childGeometry.boundingBox);
                }
            });
        }
        // Traverse through all children of the object

        return totalBoundingBox;
    };

    function add_material(child, type){

        if (child instanceof THREE.Mesh) {

            //console.log(child.name + '-->' + texture_current_dict[child.name] )
            let childName = type + '_' + child.name

            //if(texture_current_dict.hasOwnProperty(childName) && texture_dict.hasOwnProperty(texture_current_dict[childName]) ){
            const material = new THREE.MeshStandardMaterial( { map: texture_dict[texture_current_dict[childName]] } );
            child.material = material;
            //}


        }else{

            const material = new THREE.MeshStandardMaterial( { map: texture_dict['DEFAULT'] } );
            child.material = material;


        }

    }


    if (mueble != null){

        muebleChosenOptions.forEach((mueble_opt, index) => {

            if (mueble_opt.opcion.es_material == true){


                muebleChosenOptions.forEach((object_color, index_color) => {

                    if(object_color.opcion.orden == mueble_opt.opcion.orden + 1 && object_color.opcion.es_color == true){
                        materials_color = object_color;
                    }
                });

                let texture_file_name;
                if (materials_color && materials_color.valor.material_file_name){
                    texture_file_name = mueble_opt.valor.material_folder_name + '_' + materials_color.valor.material_file_name;

                }else{
                    texture_file_name = 'ERROR'
                }
                let nombre_grupo_piezas = mueble_opt.opcion.nombre_grupo_piezas;
                texture_current_dict['mueble_' + nombre_grupo_piezas]= texture_file_name
            }

        });

        console.log(texture_current_dict);

        mueble.traverse(child => {
            add_material(child, 'mueble')
        });

        muebleBoundingBox = computeTotalBoundingBox(mueble);
        muebleCenter = new THREE.Vector3();
        muebleBoundingBox.getCenter(muebleCenter);

    }

    materials_color = null;


    if (encimera != null){
        encimeraChosenOptions.forEach((encimera, index) => {
            if (encimera.opcion.es_color == true){

                let texture_file_name;
                if (encimera.valor && encimera.valor.material_file_name){
                    texture_file_name = encimera.valor.material_file_name;
                }else{
                    texture_file_name = 'ERROR'
                }
                let nombre_grupo_piezas = encimera.opcion.nombre_grupo_piezas;
                texture_current_dict['encimera_' + nombre_grupo_piezas]= texture_file_name
            }
        });

        console.log(texture_current_dict);

        encimera.traverse(child => {
            add_material(child, 'encimera')
        });

        encimeraBoundingBox = computeTotalBoundingBox(encimera);
        encimeraCenter = new THREE.Vector3();
        encimeraBoundingBox.getCenter(encimeraCenter);

    }

    if (lavabo != null) {
        materials_color = null;
        lavaboChosenOptions.forEach((lavabo, index) => {
            if (lavabo.opcion.es_material == true) {

                lavaboChosenOptions.forEach((object_color, index_color) => {

                    if (object_color.opcion.orden == encimera.opcion.orden + 1 && object_color.opcion.es_color == true) {
                        materials_color = object_color;
                    }
                });

                let texture_file_name;
                if (materials_color && materials_color.valor.material_file_name) {
                    texture_file_name = lavabo.valor.material_folder_name + '_' + materials_color.valor.material_file_name;

                } else {
                    texture_file_name = 'ERROR'
                }
                let nombre_grupo_piezas = lavabo.opcion.nombre_grupo_piezas;
                texture_current_dict['lavabo_' + nombre_grupo_piezas] = texture_file_name
            }
        });

        lavabo.traverse(child => {
            add_material(child, 'lavabo')
        });

    }

    if(espejo != null){
        materials_color = null;
        espejoChosenOptions.forEach((espejo, index) => {
            if (espejo.opcion.es_material == true){


                espejoChosenOptions.forEach((object_color, index_color) => {

                    if(object_color.opcion.orden == encimera.opcion.orden + 1 && object_color.opcion.es_color == true){
                        materials_color = object_color;
                    }
                });

                let texture_file_name;
                if (materials_color && materials_color.valor.material_file_name){
                    texture_file_name = espejo.valor.material_folder_name + '_' + materials_color.valor.material_file_name;

                }else{
                    texture_file_name = 'ERROR'
                }
                let nombre_grupo_piezas = espejo.opcion.nombre_grupo_piezas;
                texture_current_dict['espejo_' + nombre_grupo_piezas]= texture_file_name
            }

        });
        espejo.traverse(child => {
            add_material(child, 'espejo')
        });

        espejoBoundingBox = computeTotalBoundingBox(mueble);
        espejoCenter = new THREE.Vector3();
        espejoBoundingBox.getCenter(espejoCenter);
    }

    console.log(texture_dict)

    console.log(texture_current_dict)





    console.log(texture_current_dict)


    if (mueble){
        const mueblePosition = new THREE.Vector3(
            (0-muebleCenter.x) * scale,  // Center X of the object objCenter.x
            (400 - muebleBoundingBox.max.y) * scale,  // Position the countertop slightly above the top of the object
            0  // Center Z of the objectobjCenter.z
             );

        mueble.position.copy(mueblePosition);
        console.log('mueble')
        console.log(mueble.position);
        console.log(muebleBoundingBox);
    }

    if(encimera){
        let encimeraPosition;
        if(mueble){
            encimeraPosition = new THREE.Vector3(
                (0 - encimeraCenter.x ) * scale,
                400 * scale,
                (muebleCenter.z  - encimeraCenter.z) * scale
            );
        }else{
            encimeraPosition = new THREE.Vector3(
                (0 - encimeraCenter.x) * scale,
                400 * scale,
                0
            );
        }
        encimera.position.copy(encimeraPosition);
        console.log('encimera')

        console.log(encimera.position);
    }

    if(lavabo){
        let lavaboPosition;
        if(encimera){
            lavaboPosition = new THREE.Vector3(
                encimeraCenter.x * scale, //TODO: CHANGE TO VALUE OF ARTICLE MUEBLE ELSE VALUE EJE ENCIMERA
                (400 + encimeraBoundingBox.max.y)  * scale,
                (encimeraCenter.z) * scale
            );
            lavabo.position.copy(lavaboPosition);
            console.log(lavabo.position);
        }
    }

    if(espejo){
        let centrox = 0;
        if(mueble){
            centrox = muebleCenter.x
        }else if (encimera){
            centrox = encimeraCenter.x
        }

        let espejoPosition = new THREE.Vector3(
            (0-espejoCenter.x)*scale,
            550*scale,
            0.05
        );
        espejo.position.copy(espejoPosition);
        console.log('espejo')

        console.log(espejo.position);

    }




    return(
        <PresentationControls
            speed={1.5}
            global
            polar={[-0.2, Math.PI / 16]}
            zoom={1.5}
            rotation={[Math.PI / 8, Math.PI / 4, 0]}
            azimuth={[-Math.PI / 2, Math.PI / 4]}
        >
            <Suspense fallback={null}>
                <group position-y={-0.75} dispose={null}>
                    {mueble && <primitive object={mueble} scale={scale}/>}
                    {encimera && <primitive  object={encimera} scale={scale}/>}
                    {lavabo && <primitive object={lavabo} scale={scale}/>}
                    {espejo && <primitive object={espejo}  scale={scale}/>}

                    <mesh position={[0, 5, 0]}>
                        <boxGeometry args={[10, 10, 0.1]} />
                        <meshStandardMaterial map={texture_dict[texture_current_dict['PARED']] } />
                    </mesh>

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                        <planeGeometry args={[10, 10]} />
                        <meshStandardMaterial color="#808080" />
                    </mesh>
                </group>

                {/*<primitive object={mirror} scale={scale}/>*/}
            </Suspense>

            <directionalLight position={[0, 10, 0]} intensity={0.7} />
            <directionalLight position={[10, 0, 0]} intensity={0.2} />
            <directionalLight position={[0, 0, 10]} intensity={0.5} />
            <ambientLight intensity={0.2} />

        </PresentationControls>

    );
}

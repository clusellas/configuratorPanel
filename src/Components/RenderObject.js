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


    if (obj_con_eje.children.length == 0){
        obj = obj_sin_eje;
    }else{
        obj = obj_con_eje;
    }

    const texture = useLoader(THREE.TextureLoader, '/textures/maderaplywood.jpg'); // Adjust the path to your texture file

    obj.traverse(child => {
        if (child instanceof THREE.Mesh) {
            console.log(child.name)
            child.material.map = texture;
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

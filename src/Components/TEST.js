import "./RenderObject.css";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = () => {
    /*const materials = useLoader(MTLLoader, "/models/Poimandres.mtl");
    const obj = useLoader(OBJLoader, "/models/Poimandres.obj", (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });*/
    const obj = useLoader(OBJLoader, '/models/B209.120.BP.obj')

    console.log(obj);
    return <primitive object={obj} scale={0.005} />;

};

export default function RenderObject() {
    return (
        <div className="test">
            <Canvas>
                <Suspense fallback={null}>
                    <Scene />
                    <OrbitControls />
                    <Environment preset="sunset" background />
                </Suspense>
            </Canvas>
        </div>
    );
}

import {Euler, GLTF, Mesh, Object3D, Vector3} from "three";
import GLTFLoader from "three-gltf-loader";
import * as React from "react";
import Materials from "./Materials";

const THREE = require('three');
const ReactTHREE = require('react-three');

type MeshPrepInfo = {
    name: string,
    done: (gltf: GLTF) => any
}

const MESHES_DIRECTORY = "/meshes/";
const DEFAULT_GET_MESHES_FN = (gltf: GLTF) => {
    return (gltf.scene.children
        .filter(child => child instanceof Mesh) as Mesh[])
        .map((child: Mesh) => {
            let material = Object.keys(Materials).indexOf(child.name) > -1 ? Materials[child.name] : child.material;
            return <ReactTHREE.Mesh key={child.uuid} geometry={child.geometry} material={material} scale={20} rotation={new Euler(Math.PI/2,0 ,0)} castShadow={true} receiveShadow={true}/>
        });
};
const DEFAULT_MESH_DONE_FN = (gltf: GLTF) => {
    return <ReactTHREE.Object3D scale={0.7} castShadow={true} receiveShadow={true} name={"unnamed-asset"}>{DEFAULT_GET_MESHES_FN(gltf)}</ReactTHREE.Object3D>;
};
const MESHES: MeshPrepInfo[] = [
    {
        name: "pool",
        done: (gltf: GLTF) => {
            return <ReactTHREE.Object3D position={new Vector3(0, 0, 1)} scale={0.9} castShadow={true} receiveShadow={true} name={"pool"}>{DEFAULT_GET_MESHES_FN(gltf)}</ReactTHREE.Object3D>;
        }
    },
    {
        name: "hall",
        done: DEFAULT_MESH_DONE_FN
    }
];

export default class MeshLoader {

    static singleton: MeshLoader | null = null;

    public loadingCurrent: number = 0;
    public loadingTotal: number = 0;
    public gltfs: {[k in string]: GLTF} = {};
    public objects: {[k in string]: Element} = {};

    private loader: GLTFLoader;
    private onLoadCallbacks: (() => void)[] = [];
    private onProgressCallbacks: ((i: number) => void)[] = [];

    static getInstance() {
        if (MeshLoader.singleton === null) {
            MeshLoader.singleton = new MeshLoader();
            // @ts-ignore
            window.meshLoader = MeshLoader.singleton;
        }
        return MeshLoader.singleton;
    }

    private constructor() {
        this.loadingTotal = MESHES.length;
        this.loader = new GLTFLoader();

        MESHES.forEach(({name, done}: MeshPrepInfo) => {
            let path = name.toLowerCase() + ".glb";
            this.loader.load(
                MESHES_DIRECTORY + path,
                (gltf: GLTF) => {
                    this.gltfs[name] = gltf;
                    this.objects[name] = done(gltf);
                    this.loadingCurrent++;
                    if (this.loadingCurrent === this.loadingTotal) {
                        this.onLoadCallbacks.forEach(cb => cb());
                    }
                    this.onProgressCallbacks.forEach(cb => cb(this.loadingCurrent));
                },
                (event: ProgressEvent) => {},
                (error: ErrorEvent) => {}
            );
        });
    }

    onLoad(cb: () => void) {
        this.onLoadCallbacks.push(cb);
    }

    onProgress(cb: (i: number) => void) {
        this.onProgressCallbacks.push(cb);
    }

    isLoaded() {
        return this.loadingCurrent === this.loadingTotal;
    }
}
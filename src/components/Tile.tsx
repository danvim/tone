import React, {Component} from "react";
import {ExtrudeGeometry, Geometry, Object3D, Shape, Vector3} from "three";
import {shapeHex} from "../utils/shapes";
import Axial from "../utils/Coordinates/Axial";
import {TileInfo} from "../utils/mapTypes";
import MeshLoader from "../assets/MeshLoader";
import Materials from "../assets/Materials";

const THREE = require('three');
const ReactTHREE = require('react-three');

export const TILE_SIZE = 20;
export const TILE_WIDTH = Math.sqrt(3) * TILE_SIZE;
export const TILE_HEIGHT = 2 * TILE_SIZE;
const HEX_SHAPE: Shape = shapeHex(TILE_SIZE);
const DEFAULT_EXTRUSION_OPTIONS = {
    step: 1,
    bevelEnabled: true,
    bevelSize: 1,
    bevelSegments: 1,
    bevelThickness: 1
};
type TileProps = {
    axialCoords: string,
    info: TileInfo
};

class Tile extends Component<TileProps, any> {
    private geometry: Geometry;
    private position: Vector3;
    private meshLoader: MeshLoader;
    private buildingElem: Element | null = null;

    constructor(props: TileProps) {
        super(props);

        this.meshLoader = MeshLoader.getInstance();

        this.geometry = new ExtrudeGeometry(
            HEX_SHAPE,
            {
                ...DEFAULT_EXTRUSION_OPTIONS,
                depth: this.tileActualHeight
            }
        );

        let cartesian = Axial.fromString(this.props.axialCoords).toCartesian(TILE_SIZE).asArray;
        this.position = new Vector3(...cartesian, 0);

        if (this.props.info.type === "pool") {
            this.buildingElem = this.meshLoader.objects.pool;
        } else if (this.props.info.type === "hall") {
            this.buildingElem = this.meshLoader.objects.hall;
        }
    }

    get tileActualHeight() {
        return (this.props.info.height || 0)*5;
    }

    recomputeGeometries() {

    }

    render() {
        return (
            <ReactTHREE.Object3D position={this.position} castShadow={true} receiveShadow={true} name={"tile"}>
                <ReactTHREE.Object3D name={"tile-obj"} castShadow={true} receiveShadow={true}>
                    <ReactTHREE.Mesh geometry={this.geometry} material={Materials.Dirt} name={"tile-mesh"} castShadow={true} receiveShadow={true}/>
                </ReactTHREE.Object3D>
                {/*<LineSegments geometry={this.geometry} material={lineMaterial}/>*/}
                <ReactTHREE.Object3D position={new Vector3(0, 0, this.tileActualHeight)} castShadow={true} receiveShadow={true} name={"building-frame"}>
                    {this.buildingElem}
                </ReactTHREE.Object3D>
            </ReactTHREE.Object3D>
        );
    }

}

export default Tile;
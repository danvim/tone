import React, {Component} from "react";
import {ExtrudeGeometry, Geometry, Shape, Vector3} from "three";
import {shapeHex} from "../utils/shapes";

const THREE = require('three');
const ReactTHREE = require('react-three');
const [Object3D, Mesh, LineSegments] = [ReactTHREE.Object3D, ReactTHREE.Mesh, ReactTHREE.LineSegments];

export const TILE_SIZE = 20;
export const TILE_WIDTH = Math.sqrt(3) * TILE_SIZE;
export const TILE_HEIGHT = 2 * TILE_SIZE;
const HEX_SHAPE: Shape = shapeHex(TILE_SIZE);
const DEFAULT_EXTRUSION_OPTIONS = {
    step: 1,
    bevelEnabled: false,
    bevelSize: 1,
    bevelSegments: 1,
    bevelThickness: 1
};

const meshMaterial = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    flatShading: true
});

const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5
});

type TileProps = {
    position: Vector3,
    height: number
};

class Tile extends Component<TileProps, any> {

    private geometry: Geometry;

    constructor(props: TileProps) {
        super(props);

        this.geometry = new ExtrudeGeometry(
            HEX_SHAPE,
            {
                ...DEFAULT_EXTRUSION_OPTIONS,
                depth: this.props.height*5
            }
        );
    }

    render() {
        return (
            <Object3D position={this.props.position}>
                <Mesh geometry={this.geometry} material={meshMaterial}/>
                <LineSegments geometry={this.geometry} material={lineMaterial}/>
            </Object3D>
        );
    }

}

export default Tile;
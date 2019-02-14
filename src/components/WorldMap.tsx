import React, {Component} from "react";
import Tile, {TILE_HEIGHT, TILE_SIZE, TILE_WIDTH} from "./Tile";
import {Vector3} from "three";
import {TileInfo, TileMap} from "../utils/mapTypes";
import Axial from "../utils/Coordinates/Axial";

const THREE = require('three');
const ReactTHREE = require('react-three');

export type WorldMapProps = {
    map: TileMap
}

class WorldMap extends Component<WorldMapProps, any> {
    private tiles: JSX.Element[];

    constructor(props: WorldMapProps) {
        super(props);

        this.tiles = [];

        Object.entries(this.props.map).forEach((pair: [string, TileInfo]) => {
            let axialPos = pair[0];
            let info = pair[1];
            if (info.type !== "void")
                this.tiles.push(<Tile axialCoords={axialPos} info={info} key={axialPos}/>);
        });
    }

    render() {
        return (
            <ReactTHREE.Object3D name={"world-map"}>
                {this.tiles}
            </ReactTHREE.Object3D>
        );
    }

}

export default WorldMap;
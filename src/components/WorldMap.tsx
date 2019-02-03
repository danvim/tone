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
            let cartesian = Axial.fromString(axialPos).toCartesian(TILE_SIZE).asArray;
            if (info.type !== "void")
                this.tiles.push(<Tile position={new Vector3(...cartesian, 0)} height={info.height || 0}/>);
        });
    }

    render() {
        return (
            <ReactTHREE.Object3D>
                {this.tiles}
            </ReactTHREE.Object3D>
        );
    }

}

export default WorldMap;
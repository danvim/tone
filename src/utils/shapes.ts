/**
 * Generates THREE.Shape
 */

import Cartesian from "./Coordinates/Cartesian";
import {polygonCorner} from "./polymath";

const THREE = require('three');

/**
 *
 * @param cornerCount
 * @return function(*=): Shape
 */
const polygonFnGen = (cornerCount: number) => (size: number) => {
    let shape = new THREE.Shape();
    shape.moveTo(...polygonCorner(Cartesian.origin, size, 0, cornerCount).asArray);
    for (let i = 1; i < cornerCount; i++) {
        shape.lineTo(...polygonCorner(Cartesian.origin, size, i, cornerCount).asArray);
    }
    return shape;
};

/**
 *
 * @param size
 * @param corner
 * @return {Shape}
 */
const shapePolygon = (size: number, corner: number) => polygonFnGen(corner)(size);

/**
 *
 * @param size
 * @return {Shape}
 */
const shapeHex = polygonFnGen(6);


export {
    shapeHex,
    shapePolygon
};
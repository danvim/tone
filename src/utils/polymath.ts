import Cartesian from "./Coordinates/Cartesian";

/**
 * @param cornerCount
 * @return {function(*, *, *): Cartesian}
 */
const polygonCornerFnGen = (cornerCount: number) => (center: Cartesian, size: number, i: number) => {
    let angleOne = 360 / cornerCount;
    let angleDeg = angleOne * i - angleOne / 2;
    let angleRad = Math.PI / 180 * angleDeg;
    return new Cartesian(
        center.x + size * Math.cos(angleRad),
        center.y + size * Math.sin(angleRad)
    );
};

const polygonCorner = (center: Cartesian, size: number, i: number, cornerCount: number) =>
    polygonCornerFnGen(cornerCount)(center, size, i);

/**
 *
 * @param center
 * @param size
 * @param i
 * @return {Cartesian}
 */
const hexCorner = polygonCornerFnGen(6);

export {
    polygonCorner,
    hexCorner
};
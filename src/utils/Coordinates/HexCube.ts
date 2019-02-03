import Axial from "./Axial";
import CoordinatesInterface from "./CoordinatesInterface";

export default class HexCube implements CoordinatesInterface<HexCube> {
    public x: number;
    public y: number;
    public z: number;

    static neighbors: HexCube[] = [
        new HexCube(+1, -1, 0), new HexCube(+1, 0, -1), new HexCube(0, +1, -1),
        new HexCube(-1, +1, 0), new HexCube(-1, 0, +1), new HexCube(0, -1, +1),
    ];

    static get origin(): HexCube {
        return new HexCube(0, 0, 0);
    }

    static fromArray(a: [number, number, number]): HexCube {
        return new HexCube(...a);
    }

    static fromString(s: string): HexCube {
        let a = s.split(",").map((i: string) => parseInt(i));
        return HexCube.fromArray([a[0], a[1], a[2]]);
    }

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toAxial() {
        return new Axial(this.x, this.z);
    }

    get asArray(): number[] {
        return [this.x, this.y, this.z];
    };

    get asString(): string {
        return this.asArray.join(",");
    }

    add(hexCube: HexCube): HexCube {
        this.x += hexCube.x;
        this.y += hexCube.y;
        this.z += hexCube.z;
        return this;
    }

    scale(n: number): HexCube {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    }

    tileDistance(t: HexCube): number {
        return (Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)) / 2
    }
}
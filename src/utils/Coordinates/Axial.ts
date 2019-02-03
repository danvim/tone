import HexCube from "./HexCube";
import CoordinatesInterface from "./CoordinatesInterface";
import Cartesian from "./Cartesian";

export default class Axial implements CoordinatesInterface<Axial> {
    public q: number;
    public r: number;

    static neighbors = [
        new Axial(+1, 0), new Axial(+1, -1), new Axial(0, -1),
        new Axial(-1, 0), new Axial(-1, +1), new Axial(0, +1),
    ];

    static get origin(): Axial {
        return new Axial(0, 0);
    }

    static fromArray(a: [number, number]): Axial {
        return new Axial(...a);
    }

    static fromString(s: string): Axial {
        let a = s.split(",").map((i: string) => parseInt(i));
        return Axial.fromArray([a[0], a[1]]);
    }

    constructor(q: number, r: number) {
        this.q = q;
        this.r = r;
    }

    toHexCube() {
        return new HexCube(this.q, -this.q-this.r, this.r);
    }

    toCartesian(size: number) {
        let x = size * (Math.sqrt(3) * this.q  +  Math.sqrt(3)/2 * this.r);
        let y = size * (3/2 * this.r);
        return new Cartesian(x, y);
    }

    get asArray(): number[] {
        return [this.q, this.r];
    };

    get asString(): string {
        return this.asArray.join(",");
    }

    add(axial: Axial): Axial {
        this.q += axial.q;
        this.r += axial.r;
        return this;
    }

    scale(n: number): Axial {
        this.q *= n;
        this.r *= n;
        return this;
    }

    tileDistance(t: Axial): number {
        return (Math.abs(this.q - t.q) + Math.abs(this.q + this.r - t.q - t.r) + Math.abs(this.r - t.r)) / 2
    }

}
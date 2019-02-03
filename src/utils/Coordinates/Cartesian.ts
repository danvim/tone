import CoordinatesInterface from "./CoordinatesInterface";

export default class Cartesian implements CoordinatesInterface<Cartesian> {
    public x: number;
    public y: number;

    static neighbors: Cartesian[] = [
        new Cartesian(-1, -1), new Cartesian(0, -1), new Cartesian(1, -1),
        new Cartesian(-1, 0), new Cartesian(1, 0),
        new Cartesian(-1, 1), new Cartesian(0, 1), new Cartesian(1, 1)
    ];

    static get origin() {
        return new Cartesian(0, 0);
    }

    static fromArray(a: [number, number]): Cartesian {
        return new Cartesian(...a);
    }

    static fromString(s: string): Cartesian {
        let a = s.split(",").map((i: string) => parseInt(i));
        return Cartesian.fromArray([a[0], a[1]]);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get asArray(): number[] {
        return [this.x, this.y];
    }

    get asString(): string {
        return this.asArray.join(",");
    }

    add(coords: Cartesian): Cartesian {
        this.x += coords.x;
        this.y += coords.y;
        return this;
    }

    scale(n: number): Cartesian {
        this.x *= n;
        this.y *= n;
        return this;
    }

    euclideanDistance(t: Cartesian): number {
        return Math.sqrt((this.x - t.x) ** 2 + (this.y - t.y) ** 2);
    }

    tileDistance(t: Cartesian): number {
        return (this.x - t.x) + (this.y - t.y);
    }
}
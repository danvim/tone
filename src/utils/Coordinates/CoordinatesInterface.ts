export default interface CoordinatesInterface<T> {
    add(t: T): T;
    scale(n: Number): T;
    readonly asArray: number[];
    readonly asString: string;
}
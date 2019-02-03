export type TileType = "empty" | "void" | "pool";

export type TileInfo = {
    type: TileType,
    height?: number
};

export type TileMap = {
    [K in string]: TileInfo
}
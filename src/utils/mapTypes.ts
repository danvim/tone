export type TileType = "empty" | "void" | "pool" | "hall";

export type TileInfo = {
    type: TileType,
    height?: number
};

export type TileMap = {
    [K in string]: TileInfo
}
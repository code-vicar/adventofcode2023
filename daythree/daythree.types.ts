export enum EngineNodeType {
    Digit,
    Dot,
    Other
}
export interface IEngineNode {
    valueId: number;
    value: number | undefined;
    char: string;
    type: EngineNodeType;
}

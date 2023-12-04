import { EngineNodeType, IEngineNode } from "./daythree.types";
import { get2DPosition } from "./utils";

export function parseInput(width: number, rawSchematic: string[]): IEngineNode[] {
    const length = width * rawSchematic.length;

    let valueId: number | undefined;

    const schematic: IEngineNode[] = [];

    for (let i = 0; i < length; i++) {
        const { column, row }  = get2DPosition(width, i);
        const char = rawSchematic[row].charAt(column);
        // console.log(char);
        if (/\d/.test(char)) {
            valueId = valueId ?? i;
            schematic.push({
                type: EngineNodeType.Digit,
                value: 0,
                char,
                valueId
            });
        } else {
            if (valueId !== undefined) {
                // calculate value
                const nodes = schematic.slice(valueId, i);
                const valueStr = nodes.map(n => n.char).join("");
                const value = parseInt(valueStr, 10);
                // console.log(`position ${i}`, nodes, valueStr, value);
                for (let j = valueId; j < i; j++) {
                    schematic[j].value = value;
                }
            }
            valueId = undefined;
            schematic.push({
                type: char === "." ? EngineNodeType.Dot : EngineNodeType.Other,
                value: undefined,
                char,
                valueId: i
            })
        }
    }

    if (valueId !== undefined) {
        // calculate value
        const nodes = schematic.slice(valueId, length - 1);
        const valueStr = nodes.map(n => n.value).join();
        const value = parseInt(valueStr, 10);
        // console.log(`position ${length - 1}`, nodes, valueStr, value);
        for (let j = valueId; j < length - 1; j++) {
            schematic[j].value = value;
        }
    }

    return schematic;
}

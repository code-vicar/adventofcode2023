import { EngineNodeType, IEngineNode } from "./daythree.types";
import { get2DPosition, getIndex } from "./utils";

export function traverse(width: number, schematic: IEngineNode[]): {
    sum: number,
    sumOfGearRatios: number
} {
    const visited = new Set<number>();
    let sum = 0;
    let sumOfGearRatios = 0;
    for (let i = 0; i < schematic.length; i++) {
        const currentCell = schematic[i];
        if (currentCell.type === EngineNodeType.Other) {
            const { row, column } = get2DPosition(width, i);
            const toVisit = [
                getIndex(width, row - 1, column - 1), // NW
                getIndex(width, row - 1, column),     // N
                getIndex(width, row - 1, column + 1), // NE
                getIndex(width, row, column - 1),     // W
                getIndex(width, row, column + 1),     // E
                getIndex(width, row + 1, column - 1), // SW
                getIndex(width, row + 1, column),     // S
                getIndex(width, row + 1, column + 1)  // SE
            ];
            const gearValues = [];
            for (const neighborIdx of toVisit) {
                const neighbor = schematic[neighborIdx];
                if (neighbor && !visited.has(neighbor.valueId)) {
                    sum += neighbor.value || 0;
                    if (currentCell.char === "*" && neighbor.value !== undefined) {
                        gearValues.push(neighbor.value);
                    }
                    visited.add(neighbor.valueId);
                }
            }
            if (gearValues.length === 2) {
                sumOfGearRatios = sumOfGearRatios + (gearValues[0]*gearValues[1]);
            }
        }
    }
    return { sum, sumOfGearRatios };
}

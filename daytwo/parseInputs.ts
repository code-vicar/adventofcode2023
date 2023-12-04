import { ICubeSet, ISample } from "./game.types";

function toNumber(val?: string): number {
    if (!val) {
        return 0;
    }
    return parseInt(val, 10);
}

function parseInputLine(line: string): ISample | undefined {
    const gameId = line.match(/game ([\d]+):/i)?.[1];
    if (!gameId) {
        return undefined;
    }
    const subSetInputs = line.split(";");
    const subSets: ICubeSet[] = subSetInputs.map((subSetInput) => {
        const [redReg, greenReg, blueReg] = ["red", "green", "blue"].map(pattern => new RegExp(`([\\d]+)\\s*${pattern}([^a-zA-Z\\d]|$)`, "i"));
        return {
            red: toNumber(subSetInput.match(redReg)?.[1]),
            green: toNumber(subSetInput.match(greenReg)?.[1]),
            blue: toNumber(subSetInput.match(blueReg)?.[1])
        };
    });
    return {
        id: parseInt(gameId, 10),
        cubeSubsets: subSets
    }
}

export default function parseInputs(inputs: string[]): ISample[] {
    return inputs.map(parseInputLine).filter((s): s is ISample => !!s);
}

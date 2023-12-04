import { ICubeSet, IGame2Results, ISample, ISampleMinimumSetResult } from "./game.types";

function getMinimumSet(sample: ISample): ISampleMinimumSetResult {
    const maxRed = Math.max(...sample.cubeSubsets.map(sub => sub.red));
    const maxBlue = Math.max(...sample.cubeSubsets.map(sub => sub.blue));
    const maxGreen = Math.max(...sample.cubeSubsets.map(sub => sub.green));
    return {
        minSet: {
            red: maxRed,
            blue: maxBlue,
            green: maxGreen
        },
        sampleId: sample.id
    }
}

export default function getMinimumSets(bag: ICubeSet, samples: ISample[]): IGame2Results {
    return {
        cubeSet: bag,
        results: samples.map(sample => getMinimumSet(sample))
    }
}

import { ICubeSet, IGameResults, ISample, ISamplePossibleTestResult } from "./game.types";

function isPossible(bag: ICubeSet, sample: ISample): ISamplePossibleTestResult {
    return {
        isPossible: !sample.cubeSubsets.some(set => set.blue > bag.blue || set.red > bag.red || set.green > bag.green),
        sampleId: sample.id
    }
}

export default function checkSamples(bag: ICubeSet, samples: ISample[]): IGameResults {
    return {
        cubeSet: bag,
        results: samples.map(sample => isPossible(bag, sample))
    }
}

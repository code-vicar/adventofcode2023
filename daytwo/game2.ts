import getMinimumSets from "./getMinimumSets";
import { ICubeSet } from "./game.types";
import parseInputs from "./parseInputs";
import testSampleStrings from "./test_samples.json";
import sampleStrings from "./samples.json";

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const bag: ICubeSet = {
    red: 12,
    green: 13,
    blue: 14
};

const testSamples = parseInputs(testSampleStrings);
const { results: testResults } = getMinimumSets(bag, testSamples);
const testAnswer = testResults.reduce<number>((sum, result) => {
    return sum + (result.minSet.blue * result.minSet.green * result.minSet.red);
}, 0);

console.log(`test answer: ${testAnswer}`);

const samples = parseInputs(sampleStrings);
const { results } = getMinimumSets(bag, samples);
const answer = results.reduce<number>((sum, result) => {
    return sum + (result.minSet.blue * result.minSet.green * result.minSet.red);
}, 0);

console.log(`answer: ${answer}`);

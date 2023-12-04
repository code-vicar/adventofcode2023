import checkSamples from "./getPossibleSets";
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
// console.log(JSON.stringify(testSamples, undefined, 2));

const { results: testResults } = checkSamples(bag, testSamples);
// console.log(JSON.stringify(results, undefined, 2));

const sumOfAllPossibleTestSamples = testResults.reduce<number>((sum, result) => {
    return result.isPossible ? sum + result.sampleId : sum;
}, 0);

console.log(`test answer: ${sumOfAllPossibleTestSamples}`);

const samples = parseInputs(sampleStrings);
const { results } = checkSamples(bag, samples);

const sumOfAllPossibleSamples = results.reduce<number>((sum, result) => {
    return result.isPossible ? sum + result.sampleId : sum;
}, 0);

console.log(`answer: ${sumOfAllPossibleSamples}`);

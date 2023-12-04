import testInput from "./test_input.json";
import input from "./input.json";
import { parseInput } from './parseInput';
import { traverse } from "./traverse";

const testSchematic = parseInput(testInput[0].length, testInput);
const testAnswer = traverse(testInput[0].length, testSchematic);

console.log(testAnswer);

const width = input[0].length;
const schematic = parseInput(width, input);
const answer = traverse(width, schematic);
console.log(answer);
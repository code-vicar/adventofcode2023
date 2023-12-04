import testInput from "./test_input.json";
import part1Input from "./part1input.json";
import { parseInput } from "./parseInput";
import { sumWinners } from "./sumWinners";
import { cardCount } from "./cardCount";

const testData = parseInput(testInput);
const data = parseInput(part1Input);

const partOneAnswer = sumWinners(data);

console.log(partOneAnswer);

const partTwoAnswer = cardCount(data);

console.log(partTwoAnswer);

const testPart2 = cardCount(testData);
console.log(testPart2);

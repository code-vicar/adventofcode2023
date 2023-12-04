import { ICard } from "./dayfour.types";

function parseLine(line: string) {
    const lineParts = line.split("|");
    const firstPart = lineParts[0];
    const secondPart = lineParts[1];
    const cardNumRegex = /card[\s]+([\d]+)[\s]*:/i
    const cardNumMatch = firstPart.match(cardNumRegex);
    if (!cardNumMatch) {
        return;
    }
    const cardNumber = parseInt(cardNumMatch[1], 10);
    const winningNumbers = new Set<number>();
    firstPart.replace(cardNumRegex, "").split(" ").filter(s => !/^\s*$/.test(s)).map(s => parseInt(s, 10)).forEach(n => winningNumbers.add(n));
    const drawnNumbers = secondPart.split(" ").filter(s => !/^\s*$/.test(s)).map(s => parseInt(s, 10));
    return {
        id: cardNumber,
        winningNumbers,
        drawnNumbers,
        winCount: drawnNumbers.reduce<number>((count, drawnNumber) => winningNumbers.has(drawnNumber) ? count + 1 : count, 0)
    };
}

export function parseInput(input: string[]): ICard[] {
    return input.map(parseLine).filter((c): c is ICard => !!c);
}

import { ICard } from "./dayfour.types";

export function sumWinners(set: ICard[]): number {
    return set.reduce<number>((sum, card) => {
        if (card.winCount === 0) {
            return sum;
        }
        return sum += Math.pow(2, card.winCount - 1);
    }, 0);
}

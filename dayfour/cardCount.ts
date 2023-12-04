import { ICard } from "./dayfour.types";

/**
 * Multiples Map      [1, 2, 3, 4,  5,  6]
 * >> 1       3        1, 1, 1, 1,  1,  0
 * >> 2       2        1, 2, 3, 3,  1,  0
 * >> 3       2        1, 2, 4, 7,  5,  0
 * >> 4       1        1, 2, 4, 8, 13,  0
 * >> 5       0        1, 2, 4, 8, 14,  0
 * >> 6       0        1, 2, 4, 8, 14,  1
 * 
 * —
 * 
 * Const currentVal = Current index + 1;
 * For j in n wins:
 *   If (i + j < len)
 *     Val at i + j +=  currentVal;
 * 
 * Sum all from 0 -> Len
 */

export function cardCount(cards: ICard[]): number {
    const multiples = new Map<number, number>();

    for (let i = 0; i < cards.length; i++) {
        const currentCardCount = (multiples.get(i) || 0) + 1;
        multiples.set(i, currentCardCount);
        for (let j = 1; j <= cards[i].winCount; j++) {
            multiples.set(i + j, (multiples.get(i + j) || 0) + currentCardCount);
        }
    }
    
    let sum = 0;
    for (let i = 0; i < cards.length; i++) {
        sum += multiples.get(i) || 0;
    }
    return sum;
}
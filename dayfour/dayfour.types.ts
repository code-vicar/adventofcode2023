export interface ICard {
    id: number;
    winningNumbers: Set<number>;
    drawnNumbers: number[];
    winCount: number;
}
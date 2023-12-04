
/**
 * @param width width of the 2d grid
 * @param row 0 based index of the row
 * @param column 0 based index of the column
 * 
 * width === 10
 * 
 * 0  1  2  3  4  5  6  7  8  9
 * 10 11 12 13 14 15 16 17 18 19
 * 
 * (width * row) + column
 * (10 * 0) + 8 === 8
 * (10 * 1) + 7 === 17
 */
export function getIndex(width: number, row: number,  column: number) {
    return (width * row) + column;
}

export function get2DPosition(width: number, index: number) {
    const row = Math.floor(index/width);
    const column = index % width;
    return {
        row,
        column
    };
}

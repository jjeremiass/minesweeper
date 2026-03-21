export function generateGrid(rows, cols) {
    return Array.from({ length: rows }, (_, y)=>
        Array.from({ length: cols }, (_, x) => ({
            x,
            y,
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighbourMines: 0
        }))
    );
}
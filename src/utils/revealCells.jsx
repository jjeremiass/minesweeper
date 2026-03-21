export function revealCells(grid, x, y) {
    const rows = grid.length;
    const cols = grid[0].length;
  
    function floodFill(x, y) {
      if (x < 0 || x >= cols || y < 0 || y >= rows) return;
      const cell = grid[y][x];
      if (cell.isRevealed || cell.isFlagged) return;
  
      cell.isRevealed = true;
  
      if (cell.neighborMines === 0 && !cell.isMine) {
        // recursively reveal neighbors
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx !== 0 || dy !== 0) floodFill(x + dx, y + dy);
          }
        }
      }
    }
  
    floodFill(x, y);
    return grid;
  }
export function calculateNeighbors(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x].isMine) {
        grid[y][x].neighborMines = 0;
        continue;
      }
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            if (grid[ny][nx].isMine) count++;
          }
        }
      }
      grid[y][x].neighborMines = count;
    }
  }
  return grid;
}
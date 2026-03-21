export function placeMines(grid, mineCount, safeCell) {
  const rows = grid.length;
  const cols = grid[0].length;
  const safePositions = new Set();

  if (safeCell) {
    const { safeX, safeY } = safeCell;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = safeX + dx;
        const ny = safeY + dy;
        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
          safePositions.add(`${nx},${ny}`);
        }
      }
    }
  }

  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);

    if (grid[y][x].isMine) continue;
    if (safePositions.has(`${x},${y}`)) continue;

    grid[y][x].isMine = true;
    minesPlaced++;
  }

  return grid;
}
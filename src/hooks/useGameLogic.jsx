import { useState} from "react";
import { generateGrid } from "../utils/generateGrid";
import { placeMines } from "../utils/placeMines";
import { calculateNeighbors } from "../utils/calculateNeighbors";
import { revealCells } from "../utils/revealCells";

export function useGameLogic(rows = 10, cols = 10, mineCount = 10) {

  const [gameStatus, setGameStatus] = useState("playing"); // playing | won | lost
  const [explodedCell, setExplodedCell] = useState(null);
  const [grid, setGrid] = useState(() => generateGrid(rows, cols));
  const [firstClick, setFirstClick] = useState(true);
  

  function handleReveal(x, y) {
    if (gameStatus !== "playing") return;

    const cell = grid[y][x];
    if (cell.isFlagged || cell.isRevealed) return;
  
    let newGrid = grid.map(row => row.map(c => ({ ...c }))); // deep copy
  
    if (firstClick) {
      newGrid = placeMines(newGrid, mineCount, { safeX: x, safeY: y });
      newGrid = calculateNeighbors(newGrid);
      setFirstClick(false);
    }
  
    if (newGrid[y][x].isMine) {
      setExplodedCell({ x, y });
      newGrid = newGrid.map(row =>
        row.map(c => ({ ...c, isRevealed: true }))
      );
      setGrid(newGrid);
      setGameStatus("lost");
      return;
    }
  
    newGrid = revealCells(newGrid, x, y);
    setGrid(newGrid);
  
    if (checkWin(newGrid)) setGameStatus("won");
  }
  

  function handleFlag(x, y) {
    if (gameStatus !== "playing") return;

    const cell = grid[y][x];
    if (cell.isRevealed) return;

    const newGrid = grid.map(row =>
      row.map(c =>
        c.x === x && c.y === y ? { ...c, isFlagged: !c.isFlagged } : c
      )
    );

    setGrid(newGrid);
  }

  function resetGame() {
    setGrid(generateGrid(rows, cols));
    setGameStatus("playing");
    setExplodedCell(null);
    setFirstClick(true)
  }

  function checkWin(currentGrid) {
    return currentGrid.every(row =>
      row.every(c => (c.isMine ? true : c.isRevealed))
    );
  }

  return {
    grid,
    gameStatus,
    explodedCell,
    handleReveal,
    handleFlag,
    resetGame,
  };
}

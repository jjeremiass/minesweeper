import React from "react";
import Grid from "./Grid";
import { useGameLogic } from "../hooks/useGameLogic";
import { useKeyboardControls } from "../hooks/useKeyboardControls";

export default function Game({ rows, cols, mines, onBack }) {
  const {
    grid,
    gameStatus,
    explodedCell,
    handleReveal,
    handleFlag,
    resetGame
  } = useGameLogic(rows, cols, mines);

  const cursor = useKeyboardControls(
    grid, 
    handleReveal, 
    handleFlag,
    resetGame,
    onBack
  );

  return (
    <div className="app-container">
      <h1>Minesweeper</h1>

      {/* Now the Back to Menu button actually works */}
      <button onClick={onBack}>Back to Menu</button>
      <button
        onClick={(e) => {
          resetGame();
          e.target.blur(); // ✅ removes focus from button
        }}>
        Restart</button>

      <p>Status: {gameStatus}</p>

      <Grid
        grid={grid}
        onReveal={handleReveal}
        onFlag={handleFlag}
        cursor={cursor}
        explodedCell={explodedCell}
      />
    </div>
  );
}
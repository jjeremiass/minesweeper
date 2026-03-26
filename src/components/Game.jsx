import React, {useState, useEffect} from "react";
import Grid from "./Grid";
import Help from "./Help";
import { useGameLogic } from "../hooks/useGameLogic";
import { useKeyboardControls } from "../hooks/useKeyboardControls";

export default function Game({ rows, cols, mines, onBack }) {
  const [showHelp, setShowHelp] = useState(false);
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

  useEffect(() => {
    function handleKey(e) {
      if (e.repeat) return;
      if (e.key.toLowerCase() === "h") setShowHelp(prev => !prev);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="app-container">
      <h1>Minesweeper</h1>
      <button 
        onClick={onBack}
        style={{
          border: "1px solid #000",
          background: "#e8e6e6",
          cursor: "pointer"}}>
          Back to Menu</button>
      <button
        onClick={(e) => {
          resetGame();
          e.target.blur();
        }}
        style={{
          border: "1px solid #000",
          background: "#e8e6e6",
          cursor: "pointer"
        }}>
        Restart</button>

        <button
          onClick={() => setShowHelp(prev => !prev)}
          style={{
            border: showHelp ? "1px solid #007bff" : "1px solid #000",
            background: showHelp ? "#e6f0ff" : "#e8e6e6",
            cursor: "pointer"
          }}h
        >
          Help (H)
        </button>

        
      <p>Status: {gameStatus}</p>

      <Help visible={showHelp} />

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
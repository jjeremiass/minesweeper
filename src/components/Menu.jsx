import React from "react";

function Menu({ onStart }) {
  return (
    <div className="app-container">
      <h1>Minesweeper</h1>

      <h2>Select Difficulty</h2>

      <button
        onClick={() =>
          onStart({ rows: 8, cols: 8, mines: 10 })
        }
      >
        Easy
      </button>

      <button
        onClick={() =>
          onStart({ rows: 10, cols: 10, mines: 15 })
        }
      >
        Medium
      </button>

      <button
        onClick={() =>
          onStart({ rows: 12, cols: 12, mines: 25 })
        }
      >
        Hard
      </button>
    </div>
  );
}

export default Menu;
import React from "react";

function Cell({ cell, onReveal, onFlag, isSelected, isExploded }) {
  
  function handleClick() {
    onReveal(cell.x, cell.y);
  }

  function handleRightClick(e) {
    e.preventDefault();
    onFlag(cell.x, cell.y);
  }

  function getCellContent() {
    // 🚩 Flag always visible unless revealed logic overrides
    if (cell.isFlagged && !cell.isRevealed) return "🚩";

    if (!cell.isRevealed) return "";

    if (cell.isFlagged && !cell.isMine && cell.isRevealed) {
      return "❌";
    }

    // 💣 Mines
    if (cell.isMine) {
      return isExploded ? "💥" : "💣";
    }

    // 🔢 Numbers
    if (cell.neighborMines > 0) {
      return cell.neighborMines;
    }

    return "";
  }

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleRightClick}
      className={`cell 
        ${cell.isRevealed ? "revealed" : ""} 
        ${isSelected ? "selected" : ""}
        ${isExploded ? "exploded" : ""}
        ${cell.neighborMines > 0 ? `n${cell.neighborMines}` : ""}
      `}
    >
      {getCellContent()}
    </div>
  );
}

export default Cell;
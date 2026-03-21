import React from "react";
import Cell from "./Cell";

function Grid({ grid, onReveal, onFlag, cursor, explodedCell }) {
  return (
    <div className="grid">
      {grid.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              cell={cell}
              onReveal={onReveal}
              onFlag={onFlag}
              isSelected={cursor.x === x && cursor.y === y}
              isExploded={
                explodedCell &&
                explodedCell.x === x &&
                explodedCell.y === y
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}


export default Grid;

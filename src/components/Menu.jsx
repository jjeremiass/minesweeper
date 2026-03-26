import React, { useState, useEffect } from "react";

function Menu({ onStart }) {
  const difficulties = [
    { label: "Easy", rows: 8, cols: 8, mines: 10 },
    { label: "Medium", rows: 10, cols: 10, mines: 15 },
    { label: "Hard", rows: 12, cols: 12, mines: 25 },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    function handleKey(e) {
      if (e.repeat) return;

      switch (e.key) {
        case "ArrowLeft":
          setSelectedIndex((prev) =>
            prev === 0 ? difficulties.length - 1 : prev - 1
          );
          break;
        case "ArrowRight":
          setSelectedIndex((prev) =>
            prev === difficulties.length - 1 ? 0 : prev + 1
          );
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          {
          const d = difficulties[selectedIndex];
          onStart({ rows: d.rows, cols: d.cols, mines: d.mines });
          }
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, onStart]);

  return (
    <div className="app-container">
      <h1>Minesweeper</h1>
      <h2>Select Difficulty</h2>

      <div
        className="difficulty-buttons"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {difficulties.map((d, index) => (
          <button
            key={d.label}
            onClick={() =>
              onStart({ rows: d.rows, cols: d.cols, mines: d.mines })
            }
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              padding: "10px 15px",
              border:
                index === selectedIndex ? "2px solid #007bff" : "1px solid #000",
              background: index === selectedIndex ? "#e6f0ff" : "#fff",
              cursor: "pointer",
            }}
          >
            <div>{d.label}</div>
            <div style={{ fontSize: "0.9rem", color: "#555" }}>
              {d.rows}x{d.cols} {d.mines} mines
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu;
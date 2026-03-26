import React, { useEffect, useRef } from "react";

function Menu({ onStart }) {
  const buttonsRef = useRef([]);

  useEffect(() => {
    buttonsRef.current[0]?.focus();

    function handleKey(e) {
      const currentIndex = buttonsRef.current.findIndex(
        btn => btn === document.activeElement
      );

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (currentIndex + 1) % buttonsRef.current.length;
        buttonsRef.current[next]?.focus();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev =
          (currentIndex - 1 + buttonsRef.current.length) %
          buttonsRef.current.length;
        buttonsRef.current[prev]?.focus();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="app-container">
      <h1>Minesweeper</h1>

      <h2>Select Difficulty</h2>

      <button
        ref={el => (buttonsRef.current[0] = el)}
        onClick={() => onStart({ rows: 8, cols: 8, mines: 10 })}
      >
        Easy
      </button>

      <button
        ref={el => (buttonsRef.current[1] = el)}
        onClick={() => onStart({ rows: 10, cols: 10, mines: 15 })}
      >
        Medium
      </button>

      <button
        ref={el => (buttonsRef.current[2] = el)}
        onClick={() => onStart({ rows: 12, cols: 12, mines: 25 })}
      >
        Hard
      </button>
    </div>
  );
}

export default Menu;
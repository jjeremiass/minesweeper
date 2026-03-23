import { useEffect, useState } from "react";

export function useKeyboardControls(grid, onReveal, onFlag) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleKey(e) {
      if (e.repeat) return;
      if (!grid.length) return;

      const rows = grid.length;
      const cols = grid[0].length;

      setCursor(prev => {
        let { x, y } = prev;

        switch (e.key) {
          case "ArrowUp":
            y = Math.max(0, y - 1);
            break;
          case "ArrowDown":
            y = Math.min(rows - 1, y + 1);
            break;
          case "ArrowLeft":
            x = Math.max(0, x - 1);
            break;
          case "ArrowRight":
            x = Math.min(cols - 1, x + 1);
            break;
          case "Enter":
          case " ":
            onReveal(x, y);
            return prev;
          case "f":
          case "F":
            onFlag(x, y);
            return prev;
          default:
            return prev;
        }

        return { x, y };
      });
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [grid, onReveal, onFlag]);

  return cursor;
}
import React from "react";

export default function Help({ visible }) {
  if (!visible) return null;

  return (
    <div
      className="help-panel"
      style={{
        margin: "20px auto",
        width: "400px",
        border: "2px solid #007bff",
        padding: "10px",
        backgroundColor: "#e6f0ff",
        borderRadius: "8px",
        textAlign: "left",
      }}
    >
      <h3 style={{textAlign:"center"}}>Controls</h3>
      <ul>
        <li>Reveal cell: Left Click / Enter / Space</li>
        <li>Flag cell: Right Click / F</li>
        <li>Move active cell: Arrow keys</li>
        <li>Restart game: Click Restart / R</li>
        <li>Return to menu: Click Back to Menu / M</li>
        <li>Toggle this help panel: Click Help / H</li>
      </ul>
    </div>
  );
}
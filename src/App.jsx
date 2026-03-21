import React, { useState } from "react";
import "./styles/grid.css"
import Menu from "./components/Menu";
import Game from "./components/Game";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState(0);
  const [settings, setSettings] = useState({
    rows: 10,
    cols: 10,
    mines: 10
  });

  function startGame(newSettings) {
    setSettings(newSettings);
    setGameStarted(true);
  }

  function goToMenu() {
    setGameStarted(false);
    setGameId(prev => prev + 1); // force remount of Game
  }

  if (!gameStarted) {
    return <Menu onStart={startGame} />;
  }

  // Pass goToMenu as a prop
  return (
    <Game
      key={gameId}
      rows={settings.rows}
      cols={settings.cols}
      mines={settings.mines}
      onBack={goToMenu} 
    />
  );
}

export default App;
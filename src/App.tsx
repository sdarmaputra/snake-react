import { Fragment, useEffect, useState } from 'react';
import './App.css';
import GameArena from './components/GameArena';
import GameControls from './components/GameControls';
import { initialGameConfig, initialSnakePositions } from './configs';
import {
  GameConfig,
  ArenaConfig,
  Positions,
  Position,
} from './types/Arena';
import { Direction } from './types/Control';
import changeDirection from './utils/change-direction';
import moveSnake from './utils/move-snake';
import randomizeMealPosition from './utils/randomize-meal-position';

function initiateMealPositions(arenaConfig: ArenaConfig): Positions {
  return Array(3).fill(null).map((value, index) => (
    randomizeMealPosition(arenaConfig, index + 1)
  ));
}

function App() {
  const [gameConfig, setGameConfig] = useState<GameConfig>(initialGameConfig);
  const [snakePositions, setSnakePositions] = useState<Positions>(initialSnakePositions);
  const [mealPositions, setMealPositions] = useState<Positions>(initiateMealPositions(gameConfig.arenaConfig));
  const [direction, setDirection] = useState<Direction>('right');
  let movementInterval: number | undefined = undefined;

  function stopSnakeMovement(): void {
    clearInterval(movementInterval);
    movementInterval = undefined;
  }

  function startSnakeMovement(): void {
    movementInterval = window.setInterval(() => {
      try {
        setSnakePositions(moveSnake(snakePositions, direction, gameConfig));
      } catch (error) {
        stopSnakeMovement();
        alert(error.message);
      }
    }, 300);
  }

  function eat(eatenMealPosition: Position): void {
    setMealPositions([
      ...mealPositions.filter(({ x, y }) => (
        !(x === eatenMealPosition.x && y === eatenMealPosition.y)
      )),
      randomizeMealPosition(gameConfig.arenaConfig),
    ]);
    setGameConfig({
      ...gameConfig,
      snakeConfig: {
        ...gameConfig.snakeConfig,
        length: gameConfig.snakeConfig.length + 1,
      }
    });
  }

  function changeSnakeDirection(newDirection: Direction) {
    setDirection(changeDirection(newDirection, direction));
  }

  useEffect(() => {
    startSnakeMovement();

    return function cleanup() {
      stopSnakeMovement();
    }
  });

  return (
    <Fragment>
      <GameArena
        config={gameConfig.arenaConfig}
        snakePositions={snakePositions}
        mealPositions={mealPositions}
        onEat={eat}
      />

      <GameControls onChangeDirection={changeSnakeDirection} />
    </Fragment>
  );
}

export default App;

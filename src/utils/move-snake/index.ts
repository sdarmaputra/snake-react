import {
  ArenaConfig,
  GameConfig,
  Position,
  Positions,
} from '../../types/Arena';
import { Direction } from '../../types/Control';

function locateHead(
  latestPosition: Position,
  direction: Direction,
  arenaConfig: ArenaConfig,
): Position {
  const errorMessage = 'Ouch!';
  let newX: number;
  let newY: number;

  switch (direction) {
    case 'up':
      newY = latestPosition.y - 1;
      if (newY < 0) throw new Error(errorMessage);
      return { ...latestPosition, y: newY };
    case 'down':
      newY = latestPosition.y + 1;
      if (newY > arenaConfig.height - 1) throw new Error(errorMessage);
      return { ...latestPosition, y: newY };
    case 'right':
      newX = latestPosition.x + 1;
      if (newX > arenaConfig.width - 1) throw new Error(errorMessage);
      return { ...latestPosition, x: newX };
    case 'left':
      newX = latestPosition.x - 1;
      if (newX < 0) throw new Error(errorMessage);
      return { ...latestPosition, x: newX };
    default:
      return latestPosition;
  }
}

export default function moveSnake(
  positions: Positions,
  direction: Direction,
  gameConfig: GameConfig,
): Positions {
  const newPositions: Positions = [...positions];
  const head: Position = positions[positions.length - 1];
  const newHead: Position = locateHead(head, direction, gameConfig.arenaConfig);

  newPositions.push(newHead);

  if (newPositions.length > gameConfig.snakeConfig.length) {
    newPositions.shift();
  }

  return newPositions;
}

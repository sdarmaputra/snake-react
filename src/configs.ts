import { GameConfig, Positions } from './types/Arena';

export const initialGameConfig: GameConfig = {
  arenaConfig: {
    width: 28,
    height: 24,
  },
  snakeConfig: {
    length: 4,
  },
};

export const initialSnakePositions: Positions = [
  { x: 10, y: 1 },
  { x: 11, y: 1 },
  { x: 12, y: 1 },
  { x: 13, y: 1 },
];

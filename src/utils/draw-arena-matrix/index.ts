import {
  ArenaConfig,
  ArenaDrawerOptions,
  ArenaDrawerResult,
  ArenaMatrix,
  Position,
} from '../../types/Arena';

const defaultArenaConfig: ArenaConfig = {
  width: 32,
  height: 32,
};

export default function drawArenaMatrix(
  drawerOptions: ArenaDrawerOptions | null,
): ArenaDrawerResult {
  const {
    arenaConfig = defaultArenaConfig,
    mealPositions = [],
    snakePositions = [],
  } = drawerOptions || {};
  const arenaMatrix: ArenaMatrix = Array(arenaConfig.height);

  let eatenMealPosition: Position | null = null;

  for (let row = 0; row < arenaConfig.height; row += 1) {
    for (let col = 0; col < arenaConfig.width; col += 1) {
      if (!Array.isArray(arenaMatrix[row])) {
        arenaMatrix[row] = [];
      }

      arenaMatrix[row][col] = 'empty';
    }
  }

  mealPositions.forEach(({ x, y }) => {
    arenaMatrix[y][x] = 'meal';
  });

  snakePositions.forEach(({ x, y }) => {
    if (arenaMatrix[y][x] === 'meal') {
      eatenMealPosition = { x, y };
    }
    arenaMatrix[y][x] = 'snake';
  });

  return {
    arenaMatrix,
    eatenMealPosition,
  };
}

import drawArenaMatrix from './index';

describe('when executed', () => {
  it('should return arenaMatrix and eatenMealPosition', () => {
    expect(drawArenaMatrix()).toEqual({
      arenaMatrix: expect.any(Array),
      eatenMealPosition: null,
    });
  });

  it('should render 32 rows arenaMatrix by default', () => {
    expect(drawArenaMatrix().arenaMatrix.length).toBe(32);
  });

  it('should render 32 empty columns arenaMatrix by default', async () => {
    const matrix = drawArenaMatrix().arenaMatrix;

    matrix.forEach((row) => {
      expect(row.length).toBe(32);

      row.forEach((col) => {
        expect(col).toBe('empty');
      });
    });
  });
});

describe('when arenaConfig is provided', () => {
  it('should render arenaMatrix with defined size in arenaConfig', () => {
    const arenaConfig = { width: 8, height: 8 };
    const matrix = drawArenaMatrix({ arenaConfig }).arenaMatrix;

    expect(matrix.length).toBe(arenaConfig.height);
    matrix.forEach((row) => {
      expect(row.length).toBe(arenaConfig.width);
    });
  });
});

describe('when snakePositions is provided', () => {
  it('should render snake', () => {
    const snakePositions = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ];
    const matrix = drawArenaMatrix({ snakePositions }).arenaMatrix;

    snakePositions.forEach(({ x, y }) => expect(matrix[y][x]).toBe('snake'));
  });
});

describe('when mealPositions is provided', () => {
  it('should render meals', () => {
    const mealPositions = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ];
    const matrix = drawArenaMatrix({ mealPositions }).arenaMatrix;

    mealPositions.forEach(({ x, y }) => expect(matrix[y][x]).toBe('meal'));
  });
});

describe('when any snake position meet any meal position', () => {
  it('should return eatenMealPosition and remove meal from matrix', () => {
    const eatenMeal = { x: 3, y: 1 };
    const snakePositions = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      eatenMeal,
    ];
    const mealPositions = [
      eatenMeal,
      { x: 9, y: 1 },
      { x: 10, y: 1 },
    ];
    const { arenaMatrix, eatenMealPosition } = drawArenaMatrix({
      mealPositions,
      snakePositions,
    });

    expect(eatenMealPosition).toEqual({ x: 3, y: 1 });
    expect(arenaMatrix[eatenMeal.y][eatenMeal.x]).toBe('snake');
  });
});

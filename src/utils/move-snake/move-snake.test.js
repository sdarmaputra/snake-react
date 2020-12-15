import moveSnake from './index';

const gameConfigMock = {
  arenaConfig: {
    width: 8,
    height: 8,
  },
  snakeConfig: {
    length: 3,
  },
};

describe.each([
  [
    'direction is "right" and not reaching end of arena',
    'increment x position of head',
    'right',
    [
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
    ],
    [
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
    ],
  ],
  [
    'direction is "left" and not reaching end of arena',
    'decrement x position of head',
    'left',
    [
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
    ],
    [
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 3, y: 1 },
    ],
  ],
  [
    'direction is "up" and not reaching end of arena',
    'decrement y position of head',
    'up',
    [
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
    ],
    [
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 4, y: 0 },
    ],
  ],
  [
    'direction is "down" and not reaching end of arena',
    'increment y position of head',
    'down',
    [
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
    ],
    [
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
    ],
  ],
])('when %s', (conditionTitle, actionTitle, direction, currentPosition, nextPosition) => {
  it(`should ${actionTitle}`, () => {
    expect(moveSnake(currentPosition, direction, gameConfigMock)).toEqual(nextPosition);
  });
});

describe.each([
  [
    'direction is "right" and reaching end of arena',
    'right',
    [
      { x: 6, y: 1 },
      { x: 7, y: 1 },
      { x: 8, y: 1 },
    ],
  ],
  [
    'direction is "left" and reaching end of arena',
    'left',
    [
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ],
  ],
  [
    'direction is "up" and reaching end of arena',
    'up',
    [
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
    ],
  ],
  [
    'direction is "down" and reaching end of arena',
    'down',
    [
      { x: 2, y: 7 },
      { x: 3, y: 7 },
      { x: 4, y: 7 },
    ],
  ],
])('when %s', (conditionTitle, direction, currentPosition) => {
  it('should throw an error', () => {
    expect(() => moveSnake(currentPosition, direction, gameConfigMock)).toThrow();
  });
});

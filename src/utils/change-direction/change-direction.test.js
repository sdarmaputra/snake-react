import changeDirection from './index';

describe.each([
  ['up', 'right', 'up'],
  ['down', 'right', 'down'],
  ['left', 'right', 'right'],
  ['right', 'right', 'right'],
  ['up', 'left', 'up'],
  ['down', 'left', 'down'],
  ['right', 'left', 'left'],
  ['left', 'left', 'left'],
  ['left', 'up', 'left'],
  ['right', 'up', 'right'],
  ['down', 'up', 'up'],
  ['up', 'up', 'up'],
  ['left', 'down', 'left'],
  ['right', 'down', 'right'],
  ['up', 'down', 'down'],
  ['down', 'down', 'down'],
  [undefined, 'right', 'right'],
  [undefined, 'left', 'left'],
  [undefined, 'up', 'up'],
  [undefined, 'down', 'down'],
])('when next direction is "%s" and current direction is "%s"', (newDirection, currentDirection, result) => {
  it(`should return ${result}`, () => {
    expect(changeDirection(newDirection, currentDirection)).toBe(result);
  });
});

import { Direction } from '../../types/Control';

const opposites = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up',
};

export default function changeDirection(
  newDirection: Direction,
  currentDirection: Direction,
): Direction {
  return (opposites[newDirection] === currentDirection)
    ? currentDirection
    : (newDirection || currentDirection);
}

import './GameArena.scss';
import {
  ArenaConfig,
  Positions,
  Position,
} from '../../types/Arena';
import drawArenaMatrix from '../../utils/draw-arena-matrix';

type GameArenaProps = {
  config: ArenaConfig,
  snakePositions: Positions,
  mealPositions: Positions,
  onEat: (eatenMealPosition: Position) => void,
};

export default function GameArena({ config, snakePositions, mealPositions, onEat }: GameArenaProps) {
  const { arenaMatrix, eatenMealPosition } = drawArenaMatrix({
    mealPositions,
    snakePositions,
    arenaConfig: config,
  });

  if (eatenMealPosition){
    onEat(eatenMealPosition);
  }

  return (
    <div className="arena">
      {arenaMatrix.map((row, rowIndex) =>
        <div className="arena__row" key={rowIndex}>
          {row.map((cellType, colIndex) =>
            <div className={`arena__cell arena__${cellType}`} key={colIndex} />
          )}
        </div>
      )}
    </div>
  );
}

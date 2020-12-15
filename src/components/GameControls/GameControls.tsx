import { FormEvent, MutableRefObject, useEffect, useRef } from 'react';
import './GameControls.scss';
import { Direction } from '../../types/Control';

type GameControlsProps = {
  onChangeDirection: (direction: Direction) => void,
};

type KeyDirectionMap = {
  [directionKey: string]: MutableRefObject<HTMLButtonElement | null>,
};

export default function GameControls({ onChangeDirection }: GameControlsProps) {
  const left = useRef<HTMLButtonElement | null>(null);
  const up = useRef<HTMLButtonElement | null>(null);
  const right = useRef<HTMLButtonElement | null>(null);
  const down = useRef<HTMLButtonElement | null>(null);
  const keyDirectionMap: KeyDirectionMap = {
    ArrowLeft: left,
    ArrowUp: up,
    ArrowRight: right,
    ArrowDown: down,
  };

  function clickButton(event: FormEvent): void {
    const element = event.target as HTMLButtonElement;
    const direction: Direction = element.value as Direction;

    onChangeDirection(direction);

    element.classList.add('controls__button--pressed');
    setTimeout(() => {
      element.classList.remove('controls__button--pressed');
    }, 200);
  }

  useEffect(() => {
    console.log('useef con')
    document.addEventListener('keydown', (event) => {
      const button = keyDirectionMap[event.code];
      if (button && button.current) button.current.click();
    });
  }, []);

  return (
    <div className="controls">
      <button
        ref={up}
        className="controls__button"
        data-testid="up-button"
        value="up"
        onClick={clickButton}
      >
        &uarr;
      </button>

      <div className="controls__middle">
        <button
          ref={left}
          className="controls__button"
          data-testid="left-button"
          value="left"
          onClick={clickButton}
        >
          &larr;
        </button>
        <div className="controls__button controls__button--empty">
          &nbsp;
        </div>
        <button
          ref={right}
          className="controls__button"
          data-testid="right-button"
          value="right"
          onClick={clickButton}
        >
          &rarr;
        </button>
      </div>

      <button
        ref={down}
        className="controls__button"
        data-testid="down-button"
        value="down"
        onClick={clickButton}
      >
        &darr;
      </button>
    </div>
  )
}

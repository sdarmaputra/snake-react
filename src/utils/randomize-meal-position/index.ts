import { ArenaConfig, Position } from '../../types/Arena';

export default function randomizeMealPosition(
  arenaConfig: ArenaConfig,
  randomizerNumber = 1,
): Position {
  return {
    x: Math.floor((Math.random() / randomizerNumber) * (arenaConfig.width - 1)),
    y: Math.floor((Math.random() / randomizerNumber) * (arenaConfig.height - 1)),
  };
}

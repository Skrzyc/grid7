import { Devvit } from '@devvit/public-api';
import Game, { Field } from '../logic/Game.js';
import { Globals } from '../logic/Globals.js';
import { ColorsLib } from '../utils/ColorsLib.js';

export const Board = ({ grid, pos }: { grid: Field[]; pos: { x: number; y: number } }) => {
  const { sizeX, sizeY } = Game;

  const colors = { ...ColorsLib };
  const { playerChar } = Globals;

  const rows: JSX.Element[] = [];
  for (let i = 0; i < sizeY; i++) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < sizeX; j++) {
      const field = grid[Math.round(i * sizeX) + j];
      console.assert(field !== undefined, `Board.tsx :: field undefined at x:${j}, y:${i}`);

      const player = pos.x === j && pos.y === i ? playerChar : undefined;
      row.push(
        <text
          size="xlarge"
          minWidth="13px"
          style={'body'}
          color={colors[player ? 'player' : field.active ? `${field.value}` : 'back']}
        >
          {player ?? field.value}
        </text>
      );
    }
    rows.push(<hstack>{row}</hstack>);
  }

  console.log('Board :: refresh');
  return (
    <vstack padding="xsmall" border="thin" borderColor={ColorsLib.accent}>
      {rows}
    </vstack>
  );
};

import { Devvit } from '@devvit/public-api';
import ImageButton from '../details/ImageButton.js';
import Game from '../logic/Game.js';

export const SteeringButtons = ({ game }: { game: Game }) => {
  const isOff = game.state.gameover;
  const move = (x: number, y: number) => game.update({ x: x, y: y });

  return (
    <hstack>
      <ImageButton url={'arrow/left.png'} onPressMethod={() => move(-1, 0)} disable={isOff} />
      <ImageButton url={'arrow/right.png'} onPressMethod={() => move(1, 0)} disable={isOff} />
      <ImageButton url={'arrow/up.png'} onPressMethod={() => move(0, -1)} disable={isOff} />
      <ImageButton url={'arrow/down.png'} onPressMethod={() => move(0, 1)} disable={isOff} />
      <ImageButton url={'arrow/left-up.png'} onPressMethod={() => move(-1, -1)} disable={isOff} />
      <ImageButton url={'arrow/left-down.png'} onPressMethod={() => move(-1, 1)} disable={isOff} />
      <ImageButton url={'arrow/right-up.png'} onPressMethod={() => move(1, -1)} disable={isOff} />
      <ImageButton url={'arrow/right-down.png'} onPressMethod={() => move(1, 1)} disable={isOff} />
    </hstack>
  );
};

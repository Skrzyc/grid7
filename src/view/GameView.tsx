import { Devvit } from '@devvit/public-api';
import ActionButton from '../details/ActionButton.js';

import { SharedProps } from '../types/SharedProps.js';
import { ColorsLib } from '../utils/ColorsLib.js';
import { Board } from './Board.js';
import { SteeringButtons } from './SteeringButtons.js';

export const GameView = ({ props, goBack }: { props: SharedProps; goBack: () => void }) => {
  const { game } = props;

  return !game ? (
    <></>
  ) : (
    <vstack padding="medium" grow alignment="start middle" backgroundColor={ColorsLib.back}>
      <hstack grow>
        <ActionButton mode="primary" onPressMethod={goBack} label="" iconName="home" size="small" />
      </hstack>
      <spacer size="small" />
      <text size="medium" color={ColorsLib[game.state.msg.type]}>
        {game.state.msg.text}
      </text>
      <spacer size="small" />
      <text size="xlarge" color={ColorsLib.accent}>
        Score: {game.scorePercents}
      </text>
      <spacer size="small" />
      <Board grid={game.grid} pos={game.pos} />
      <spacer size="small" />
      <SteeringButtons game={game} />
    </vstack>
  );
};

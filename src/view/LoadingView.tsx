import { Devvit } from '@devvit/public-api';
import { ColorsLib } from '../utils/ColorsLib.js';

export default function LoadingView(): JSX.Element {
  return (
    <vstack height="100%" width="100%" alignment="middle center" backgroundColor={ColorsLib.back}>
      <text size="xxlarge" color={ColorsLib.accent}>
        Loading ...
      </text>
    </vstack>
  );
}

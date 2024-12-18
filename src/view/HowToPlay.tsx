import { Devvit } from '@devvit/public-api';
import { ColorsLib } from '../utils/ColorsLib.js';

export default function HowToPlay(): JSX.Element {
  return (
    <vstack>
      <text size="xlarge" color={ColorsLib.accent}>
        How To Play
      </text>
      <spacer size="medium" />
      <text size="xsmall">Try to erase as much of screen as possible</text>
      <spacer size="medium" />
      <text size="xsmall">You can only move the amount of squares according to</text>
      <text size="xsmall">to the nearest number value in the specific direction</text>
      <spacer size="medium" />
      <text size="xsmall">You can only move the amount of squares according to</text>
      <text size="xsmall">to the nearest number value in the specific direction</text>
      <spacer size="medium" />
      <text size="xsmall">You can move in 8 directions as long you land </text>
      <text size="xsmall">in bounds and on the not cleared field</text>
    </vstack>
  );
}

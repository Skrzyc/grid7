import { Devvit } from '@devvit/public-api';
import { ColorsLib } from '../utils/ColorsLib.js';

export default function About(): JSX.Element {
  return (
    <vstack>
      <text size="xlarge" color={ColorsLib.accent}>
        About
      </text>
      <spacer size="medium" />
      <text>Inspired by Greed</text>
    </vstack>
  );
}

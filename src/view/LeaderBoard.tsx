import { Devvit } from '@devvit/public-api';
import { ColorsLib } from '../utils/ColorsLib.js';

export default function LeaderBoard(): JSX.Element {
  // load scores

  const scores: { userName: string; score: number }[] = [];
  for (let i = 0; i < 20; i++) {
    scores.push({ userName: 'userName', score: i * 0.05 });
  }

  scores.sort((a, b) => b.score - a.score);
  const scoresValue = scores.slice(0, 9).map((obj, idx) => (
    <text size="small" color={ColorsLib[(idx + 1).toString()]}>
      {[idx + 1, obj.userName.slice(0, 9), obj.score.toFixed(2)].join(' : ')}
    </text>
  ));

  return (
    <vstack>
      <text size="xlarge" color={ColorsLib.accent}>
        LeaderBoard
      </text>
      <spacer size="medium" />
      {...scoresValue}
    </vstack>
  );
}

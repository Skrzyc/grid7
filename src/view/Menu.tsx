import { Devvit, useState } from '@devvit/public-api';
import ActionButton from '../details/ActionButton.js';
import { SharedProps } from '../types/SharedProps.js';
import { ColorsLib } from '../utils/ColorsLib.js';
import { Debug } from '../utils/Debug.js';
import { logger } from '../utils/Logger.js';
import About from './About.js';
import { GameView } from './GameView.js';
import HowToPlay from './HowToPlay.js';
import LeaderBoard from './LeaderBoard.js';
import { Pages } from './Pages.js';

export const Menu = ({ props }: { props: SharedProps }) => {
  const { startFromGame, active: isDebugMode } = Debug;

  const [isGame, setGame] = useState(startFromGame && isDebugMode);
  const [page, setPage] = useState(Pages.About);

  const { back: backColor } = ColorsLib;

  const backToMenu = () => setGame(false);
  const playGame = () => setGame(true);

  const showScores = () => setPage(Pages.LeaderBoard);
  const showTutorial = () => setPage(Pages.HowToPlay);
  const showAbout = () => setPage(Pages.About);

  logger.log('Menu :: refresh');
  return isGame ? (
    <GameView props={props} goBack={backToMenu} />
  ) : (
    <vstack grow alignment="start middle" gap="medium" backgroundColor={backColor}>
      <vstack padding="medium" gap="small" height="50%" alignment="start middle">
        <ActionButton mode="success" onPressMethod={playGame} label="PLAY" size="large" iconName="play" />
        <ActionButton mode="primary" onPressMethod={showAbout} label="ABOUT" size="small" />
        <ActionButton mode="primary" onPressMethod={showTutorial} label="HOW TO PLAY?" size="small" />
        <ActionButton
          mode="primary"
          onPressMethod={showScores}
          label="LEADERBOARD"
          size="small"
          disabled={true}
        />
      </vstack>
      <vstack padding="medium" height="50%">
        {page === Pages.LeaderBoard ? <LeaderBoard /> : page === Pages.About ? <About /> : <HowToPlay />}
      </vstack>
    </vstack>
  );
};

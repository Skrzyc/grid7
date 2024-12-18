import { Devvit } from '@devvit/public-api';
import Game from '../logic/Game.js';

export type SharedProps = { game: Game | undefined; context: Devvit.Context };

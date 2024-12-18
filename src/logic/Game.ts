import { Debug } from '../utils/Debug.js';
import { logger } from '../utils/Logger.js';
import MathUtils from '../utils/MathUtils.js';

export type Field = { value: number; active: boolean };

export default class Game {
  static sizeX = 23;
  static sizeY = 14;

  readonly rules = {
    allowMovementThroughEmpty: true,
    allowEdgeToEdgeMovement: false,
    maxNumber: 7,
  };

  readonly isDebug;

  private _grid: Field[] = [];
  private validMoves: { x: number; y: number }[] = [];
  private _pos = { x: 0, y: 0 };

  state = {
    msg: { text: 'Welcome', type: 'info' },
    score: 0,
    gameover: false,
  };

  constructor() {
    this.initGame();

    this.isDebug = Debug.active && Debug.printLogs;

    if (this.isDebug) logger.log('Game.ts :: Game initialized');
  }

  loadFromConfig(grid: Field[], pos: { x: number; y: number }) {
    this._grid = grid;
    this._pos = pos;
  }

  initGame() {
    this.createGrid();

    const pos = { x: MathUtils.randInt(0, this.sizeX - 1), y: MathUtils.randInt(0, this.sizeY - 1) };
    this._pos = pos;
    this._grid[pos.y * this.sizeX + pos.x].active = false;

    this.updateValidMoves();
  }

  resetGame() {
    this.state = { msg: { text: 'Game Restarted', type: 'info' }, gameover: false, score: 0 };
    this.initGame();

    if (this.isDebug) logger.log('Game.ts :: Game Restarted');
  }

  update(move: { x: number; y: number }) {
    if (this.state.gameover) return;
    const validMove = this.validMoves.some((xy) => xy.x === move.x && xy.y === move.y);

    if (!validMove) {
      this.state.msg = { text: 'Wrong Move', type: 'warn' };
      if (this.isDebug) logger.log('Game.ts :: Invalid Move');
      return;
    }
    const { value } = this.getField(this.pos.x + move.x, this.pos.y + move.y);
    const { sizeX, sizeY } = this;

    // deactivate fields
    for (let i = 1; i <= value; i++) {
      const x = MathUtils.outerRange(this.pos.x + i * move.x, sizeX);
      const y = MathUtils.outerRange(this.pos.y + i * move.y, sizeY);
      this._grid[y * sizeX + x].active = false;
    }

    // update pos
    this.pos.x = MathUtils.outerRange(this.pos.x + move.x * value, this.sizeX);
    this.pos.y = MathUtils.outerRange(this.pos.y + move.y * value, this.sizeY);

    // updateScore
    this.updateScore();

    // update msg
    this.state.msg = { text: 'Keep Going', type: 'info' };

    if (this.isDebug) logger.log('Game.ts :: Valid Move');

    // updateValidMoves
    this.updateValidMoves();
  }

  private updateValidMoves() {
    const { pos, rules, sizeX, sizeY } = this;
    const { allowEdgeToEdgeMovement: edgeMove, allowMovementThroughEmpty: moveOnEmpty } = rules;

    const validMoves: { x: number; y: number }[] = [];
    this.getAllMoves().forEach((move) => {
      const dirField = { x: pos.x + move.x, y: pos.y + move.y };

      // check if first field is inBounds
      if (this.isPosOutOfBounds(dirField.x, dirField.y) && !edgeMove) return;

      // check if first field is available
      const { value, active } = this.getField(dirField.x, dirField.y);
      if (!active) return;

      // check if other <2,n> fields available and in bounds
      let otherValid = true;
      for (let i = moveOnEmpty ? value : 2; i <= value; i++) {
        const [xIdx, yIdx] = [pos.x + i * move.x, pos.y + i * move.y];
        if (!(this.isPosInBounds(xIdx, yIdx) || edgeMove)) {
          otherValid = false;
          break;
        }

        const [x, y] = [MathUtils.outerRange(xIdx, sizeX), MathUtils.outerRange(yIdx, sizeY)];
        if (!this.getField(x, y).active) {
          otherValid = false;
          break;
        }
      }

      if (otherValid) validMoves.push(move);
    });

    if (validMoves.length <= 0) {
      this.state.gameover = true;
      this.state.msg = { type: 'gameover', text: 'GameOver' };
      if (this.isDebug) logger.log('Game.ts :: Game Over');
      return;
    }

    this.validMoves = validMoves;
  }

  private createGrid() {
    for (let i = 0; i < this.sizeY * this.sizeX; i++) {
      this._grid.push({ value: this.getRandNum(), active: true });
    }
  }

  private getRandNum() {
    return MathUtils.randInt(1, Math.min(9, this.rules.maxNumber));
  }

  private updateScore() {
    const { grid, sizeX, sizeY } = this;
    this.state.score = grid.filter((field) => !field.active).length / (sizeX * sizeY - 1);
  }

  private getField(x: number, y: number): Field {
    const { grid, sizeX, sizeY } = this;
    [x, y] = [MathUtils.outerRange(x, sizeX), MathUtils.outerRange(y, sizeY)];
    return grid[y * sizeX + x] as Field;
  }

  private getAllMoves(): { x: number; y: number }[] {
    const moves: { x: number; y: number }[] = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i === 0 && j === 0)) moves.push({ x: j, y: i });
      }
    }
    return moves;
  }

  get scorePercents(): number {
    return parseFloat((this.state.score * 100).toFixed(2));
  }

  private isPosOutOfBounds(x: number, y: number): boolean {
    return x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY;
  }

  private isPosInBounds(x: number, y: number) {
    return !this.isPosOutOfBounds(x, y);
  }

  get grid() {
    return this._grid;
  }

  get pos() {
    return this._pos;
  }

  get sizeX() {
    return Game.sizeX;
  }

  get sizeY() {
    return Game.sizeY;
  }
}

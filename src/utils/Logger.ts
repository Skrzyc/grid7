export default class Logger {
  constructor() {}

  log(msg: string) {
    console.log(msg);
  }

  logWithTime(msg: string) {
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    console.log(`[${timeString}] ${msg}`);
  }
}

const logger = new Logger();

export { logger };

// todo: adjust the name outerRange -> to sth like: wrapInRange / forceNumberInRange / cycleNumber / ...

export default class MathUtils {
  /**
   * Return Random Integer number <start, end>
   *
   * start <= num <= end
   */
  static randInt(start: number, end: number): number {
    if (end === start) return Math.round(start);
    if (end < start) {
      [start, end] = [end, start];
    }
    return Math.round(Math.random() * (end - start) + start);
  }

  /**
   * Forces the number to stay in to specified range applying
   * the difference from the other bound <min, max)
   *
   * min <= num < max
   *
   * Examples:
   *
   * MathUtils.outerRange(11, 10, 2) => 3
   * MathUtils.outerRange(5, 5, 0) => 0
   * MathUtils.outerRange(6, 5, 0) => 1
   */
  static outerRange(num: number, max: number, min = 0) {
    const [lowerBound, upperBound] = [num >= min, num < max];
    if (!lowerBound) return max + (num % max);
    if (!upperBound) return min + (num % max);
    return num;
  }

  static randomFromList<T>(list: T[]): T | undefined {
    if (list.length === 0) return undefined;
    return list[Math.floor(Math.random() * list.length)];
  }
}

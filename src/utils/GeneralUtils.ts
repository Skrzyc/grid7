/**
 *  Example Useage
 *
 *  async () => { await msDelay(300).then(() => {console.log('do something')})}
 */
export function msDelay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/**
 * Joins strings with underscore
 *
 * Example
 * underjoin('post', 32) => 'post_32'
 */
export function underJoin(...args: (string | number)[]): string {
  return args.join('_');
}

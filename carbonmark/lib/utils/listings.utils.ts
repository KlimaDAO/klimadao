/** Takes a `days` argument, converts it to seconds and adds it to the current date timestamp
 * @returns {string} timestamp in Unix seconds
 */
export const getExpirationTimestamp = (days: number): string => {
  // 1000ms/s * 60s/m * 60m/hr * 24hr/d * days
  const milliseconds = 1000 * 60 * 60 * 24 * days;
  const expireTimestamp = Date.now() + milliseconds;
  return Math.floor(expireTimestamp / 1000).toString(); // ms to seconds
};

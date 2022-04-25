/*
 * Transforms seconds into a localized and readable format.
 */
export function prettifySeconds(seconds: number, locale = "en") {
  const then = new Date();
  then.setSeconds(then.getSeconds() + seconds);
  return then.toLocaleString(locale, {
    timeStyle: "short",
    dateStyle: "short",
  });
}

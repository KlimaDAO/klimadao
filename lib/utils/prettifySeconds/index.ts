/*
 * Transforms seconds into a localized and readable format.
 */
export function prettifySeconds(seconds: number) {
  const then = new Date();
  then.setSeconds(then.getSeconds() + seconds);
  return then.toLocaleString("en", {
    timeStyle: "short",
    dateStyle: "short",
  });
}

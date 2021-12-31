import * as timeDelta from "time-delta";

/*
 * Transforms seconds into a localized and readable format.
 * The calling app must initialize the time locale definitions
 */
export function prettifySeconds(
  locale: string,
  seconds: number,
  resolution?: string
) {
  const instance = timeDelta.create({
    locale,
    unitType: "short",
  });
  const now = new Date();
  const then = new Date();
  then.setSeconds(then.getSeconds() + seconds);
  if (resolution === "day") {
    then.setSeconds(now.getSeconds());
    then.setMinutes(now.getMinutes());
    then.setHours(now.getHours());
  }

  return instance.format(now, then);
}

export const getElapsedTime = (params: {
  locale: string;
  timeStamp: number;
}) => {
  const now = Date.now();
  const elapsedSeconds = Math.abs((params.timeStamp * 1000 - now) / 1000);

  const rtf = new Intl.RelativeTimeFormat(params.locale, {
    numeric: "auto",
    style: "long",
  });

  if (elapsedSeconds < 3600) {
    return rtf.format(Math.floor(-elapsedSeconds / 60), "minutes");
  } else if (elapsedSeconds < 86400) {
    return rtf.format(Number((-elapsedSeconds / 3600).toPrecision(2)), "hours");
  } else if (elapsedSeconds < 604800) {
    return rtf.format(Number((-elapsedSeconds / 86400).toPrecision(1)), "day");
  } else {
    return rtf.format(
      Number((-elapsedSeconds / 604800).toPrecision(1)),
      "week"
    );
  }
};

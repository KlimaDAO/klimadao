export const getFormattedDate = (timestamp: number, locale = "en") => {
    const dateObj = new Date(timestamp * 1000); //expects milliseconds
    const time = new Intl.DateTimeFormat(locale, {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);
    const date = new Intl.DateTimeFormat(locale, {
      timeZone: "UTC",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dateObj);
  
    return `UTC ${time} | ${date}`;
  };
  
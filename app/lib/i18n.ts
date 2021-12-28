import { i18n } from "@lingui/core";
import { en, fr } from "make-plural/plurals";
<<<<<<< HEAD
import enTime from "time-delta/locales/en";
import frTime from "time-delta/locales/fr";
import * as timeDelta from "time-delta";
import { prettifySeconds as prettifySecondsLib } from "@klimadao/lib/utils";
=======
>>>>>>> 80779ba... Translation framework (#43)

interface ILocales {
  [locale: string]: {
    plurals: (
      n: number | string,
      ord?: boolean
    ) => "zero" | "one" | "two" | "few" | "many" | "other";
<<<<<<< HEAD
    time: any;
  };
}
const locales: ILocales = {
  en: { plurals: en, time: enTime },
  fr: { plurals: fr, time: frTime },
=======
  };
}
const locales: ILocales = {
  en: { plurals: en },
  fr: { plurals: fr },
>>>>>>> 80779ba... Translation framework (#43)
};

for (const key in locales) {
  const locale = locales[key];
  i18n.loadLocaleData(key, { plurals: locale.plurals });
<<<<<<< HEAD
  timeDelta.addLocale(locale.time);
=======
  //i18n.loadLocaleData("fr", { plurals: fr });
>>>>>>> 80779ba... Translation framework (#43)
}
async function load(locale: string) {
  const { messages } = await import(`../locale/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

/**
 * Load messages for requested locale and activate it.
<<<<<<< HEAD
 * Stores the choice in localestorage
=======
 * This function isn't part of the LinguiJS library because there're
 * many ways how to load messages  from REST API, from file, from cache, etc.
>>>>>>> 80779ba... Translation framework (#43)
 */
async function activate(locale: string) {
  load(locale);
  window.localStorage.setItem("locale", locale);
}

<<<<<<< HEAD
/**
 * Initializes locale (retrieve current locale fron localstorage if possible)
 */
=======
>>>>>>> 80779ba... Translation framework (#43)
function init() {
  var locale = window.localStorage.getItem("locale") as string;
  if (!Object.keys(locales).includes(locale)) locale = "en";
  load(locale);
}

<<<<<<< HEAD
/**
 * Localizes an amount of seconds
 */
function prettifySeconds(seconds: number) {
  return prettifySecondsLib(i18n.locale, seconds);
}

export { locales, activate, init, prettifySeconds };
=======
export { locales, activate, init };
>>>>>>> 80779ba... Translation framework (#43)

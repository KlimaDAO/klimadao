import { i18n } from "@lingui/core";
import { en, fr } from "make-plural/plurals";
import enTime from "time-delta/locales/en";
import frTime from "time-delta/locales/fr";
import * as timeDelta from "time-delta";
import { prettifySeconds as prettifySecondsLib } from "@klimadao/lib/utils";
import { IS_PRODUCTION } from "lib/constants";

// Define locales
interface ILocales {
  [locale: string]: {
    plurals: (
      n: number | string,
      ord?: boolean
    ) => "zero" | "one" | "two" | "few" | "many" | "other";
    time: any;
  };
}
const locales: ILocales = {
  en: { plurals: en, time: enTime },
  fr: { plurals: fr, time: frTime },
};
// Add pseudo locale only in development
if (!IS_PRODUCTION) {
  locales["pseudo"] = { plurals: en, time: enTime };
}

// Load localedata
for (const key in locales) {
  const locale = locales[key];
  i18n.loadLocaleData(key, { plurals: locale.plurals });
  timeDelta.addLocale(locale.time);
}
async function load(locale: string) {
  const { messages } = await import(`../locale/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

/**
 * Load messages for requested locale and activate it.
 * Stores the choice in localestorage
 */
async function activate(locale: string) {
  load(locale);
  window.localStorage.setItem("locale", locale);
}

/**
 * Initializes locale (retrieve current locale fron localstorage if possible)
 */
function init() {
  var locale = window.localStorage.getItem("locale") as string;
  if (!Object.keys(locales).includes(locale)) locale = "en";
  load(locale);
}

/**
 * Localizes an amount of seconds
 */
function prettifySeconds(seconds: number, resolution?: string) {
  // There is no such thing as time-delta pseudo localisation
  const locale = i18n.locale != "pseudo" ? i18n.locale : "en";
  return prettifySecondsLib(locale, seconds);
}

export { locales, activate, init, prettifySeconds };

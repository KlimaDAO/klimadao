import { i18n } from "@lingui/core";
import { en, fr } from "make-plural/plurals";
import { prettifySeconds as prettifySecondsLib } from "@klimadao/lib/utils";
import { IS_PRODUCTION } from "lib/constants";

// TODO: remove NODE_ENV=test hack from package.json https://github.com/lingui/js-lingui/issues/433

// Define locales
interface ILocales {
  [locale: string]: {
    plurals: (
      n: number | string,
      ord?: boolean
    ) => "zero" | "one" | "two" | "few" | "many" | "other";
    time: string;
  };
}
const locales: ILocales = {
  en: { plurals: en, time: "en-US" },
  fr: { plurals: fr, time: "fr-FR" },
};

// Add pseudo locale only in development
if (!IS_PRODUCTION) {
  locales["pseudo"] = { plurals: en, time: "en-US" };
}

// Load localedata
for (const key in locales) {
  const locale = locales[key];
  i18n.loadLocaleData(key, { plurals: locale.plurals });
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
 * Initializes locale (retrieve current locale from localstorage if possible)
 */
async function init() {
  let locale = window.localStorage.getItem("locale") as string;
  if (!Object.keys(locales).includes(locale)) locale = "en";
  await load(locale);
  return locale;
}

/**
 * Localizes an amount of seconds
 * TODO: revert temp fix and pass locale back down to prettify
 */
function prettifySeconds(seconds: number) {
  return prettifySecondsLib(seconds);
}

export { locales, activate, init, prettifySeconds };

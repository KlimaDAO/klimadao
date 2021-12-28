import { i18n } from "@lingui/core";
import { en, fr } from "make-plural/plurals";

interface ILocales {
  [locale: string]: {
    plurals: (
      n: number | string,
      ord?: boolean
    ) => "zero" | "one" | "two" | "few" | "many" | "other";
  };
}
const locales: ILocales = {
  en: { plurals: en },
  fr: { plurals: fr },
};

for (const key in locales) {
  const locale = locales[key];
  i18n.loadLocaleData(key, { plurals: locale.plurals });
  //i18n.loadLocaleData("fr", { plurals: fr });
}
async function load(locale: string) {
  const { messages } = await import(`../locale/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

/**
 * Load messages for requested locale and activate it.
 * This function isn't part of the LinguiJS library because there're
 * many ways how to load messages  from REST API, from file, from cache, etc.
 */
async function activate(locale: string) {
  load(locale);
  window.localStorage.setItem("locale", locale);
}

function init() {
  var locale = window.localStorage.getItem("locale") as string;
  if (!Object.keys(locales).includes(locale)) locale = "en";
  load(locale);
}

export { locales, activate, init };

import { i18n } from "@lingui/core";
import { en, fr, de, ru, zh, ko, es } from "make-plural/plurals";
import { IS_PRODUCTION, IS_LOCAL_DEVELOPMENT } from "lib/constants";
import { urls } from "@klimadao/lib/constants";

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
  de: { plurals: de, time: "de-DE" },
  ru: { plurals: ru, time: "ru-RU" },
  "zh-CN": { plurals: zh, time: "zh-CN" },
  es: { plurals: es, time: "es-ES" },
};

// Add pseudo locale only in development
if (!IS_PRODUCTION) {
  locales["ko"] = { plurals: ko, time: "ko-KR" };
  locales["en-pseudo"] = { plurals: en, time: "en-US" };
}

// Validate locale language tag
export const localeExists = (locale: string) =>
  Object.keys(locales).includes(locale);

// Load localedata
for (const key in locales) {
  const locale = locales[key];
  i18n.loadLocaleData(key, { plurals: locale.plurals });
}

/**
 * Loads a translation file
 */
async function loadTranslation(locale = "en") {
  let data;
  if (IS_LOCAL_DEVELOPMENT) {
    // dynamic loading in dev https://lingui.js.org/ref/loader.html
    data = await import(`@lingui/loader!../locale/${locale}/messages.po`);
  } else {
    data = await import(`../locale/${locale}/messages`);
  }
  return data.messages;
}

async function load(locale: string) {
  const messages = await loadTranslation(locale);
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
async function initLocale(localeFromURL: string | null) {
  // Load user locale
  let locale = localeFromURL || window.localStorage.getItem("locale");
  if (!locale || (!!locale && !localeExists(locale))) locale = "en";
  await load(locale);
  return locale;
}

export const createLinkWithLocaleSubPath = (
  url: string,
  locale = "en"
): string => {
  // ensure that the locale is added right after the main Site URL
  // klimadao.finance/LOCALE/the/other/sub/page
  if (url.startsWith(urls.home)) {
    return url.replace(urls.home, `${urls.home}/${locale}`);
  }
  return `${url}/${locale}`;
};

export { locales, activate, initLocale };

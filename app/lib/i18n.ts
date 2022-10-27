import { i18n } from "@lingui/core";
import { IS_LOCAL_DEVELOPMENT, IS_PRODUCTION } from "lib/constants";
import { urls } from "@klimadao/lib/constants";
import { getLocales } from "@klimadao/lib/utils";

export const locales = getLocales(IS_PRODUCTION);

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
  await load(locale);
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

export { activate, initLocale };

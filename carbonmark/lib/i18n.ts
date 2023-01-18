import { getLocales } from "@klimadao/lib/utils";
import { i18n } from "@lingui/core";
import { IS_LOCAL_DEVELOPMENT, IS_PRODUCTION } from "lib/constants";

export const locales = getLocales(IS_PRODUCTION);

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

export const createLinkWithLocaleQuery = (url: string, locale = "en"): string =>
  `${url}?locale=${locale}`;

export { loadTranslation };

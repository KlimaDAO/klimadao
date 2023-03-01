import { getLocales } from "@klimadao/lib/utils";
import { i18n, Messages } from "@lingui/core";
import { IS_LOCAL_DEVELOPMENT, IS_PRODUCTION } from "lib/constants";

export const locales = getLocales(IS_PRODUCTION);

export const activateLocale = (locale: string, messages: Messages) => {
  i18n.loadLocaleData(locale, { plurals: locales[locale].plurals });
  i18n.load(locale, messages);
  i18n.activate(locale);
};

/**
 * Loads a translation file
 */
export const loadTranslation = async (locale = "en"): Promise<Messages> => {
  let data;
  if (IS_LOCAL_DEVELOPMENT) {
    // dynamic loading in dev https://lingui.js.org/ref/loader.html
    data = await import(`@lingui/loader!../locale/${locale}/messages.po`);
  } else {
    data = await import(`../locale/${locale}/messages`);
  }
  return data.messages;
};

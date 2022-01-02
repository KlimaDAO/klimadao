import { i18n } from "@lingui/core";
import { en, fr } from "make-plural/plurals";
import enTime from "time-delta/locales/en";
import frTime from "time-delta/locales/fr";
import * as timeDelta from "time-delta";
import { prettifySeconds as prettifySecondsLib } from "@klimadao/lib/utils";

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

for (const key in locales) {
  const locale = locales[key];
  i18n.loadLocaleData(key, { plurals: locale.plurals });
  timeDelta.addLocale(locale.time);
}
/**
 * Loads a translation file
 */
async function loadTranslation(locale: string, isProduction = true) {
  let data;
  if (isProduction) {
    data = await import(`../locale/${locale}/messages`);
  } else {
    data = await import(`@lingui/loader!../locale/${locale}/messages.po`);
  }
  return data.messages;
}

export { locales, loadTranslation };

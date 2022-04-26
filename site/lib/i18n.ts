import { i18n } from "@lingui/core";
import { en, fr, de, ru, zh } from "make-plural/plurals";
import { IS_LOCAL_DEVELOPMENT, IS_PRODUCTION } from "lib/constants";

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
};
// Add pseudo locale only in development
if (!IS_PRODUCTION) {
  locales["ru"] = { plurals: ru, time: "ru-RU" };
  locales["zh-CN"] = { plurals: zh, time: "zh-CN" };
  locales["en-pseudo"] = { plurals: en, time: "en-US" };
}

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

export { locales, loadTranslation };

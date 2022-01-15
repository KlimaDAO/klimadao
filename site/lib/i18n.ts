import { i18n } from "@lingui/core";
import { en, fr } from "make-plural/plurals";
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

for (const key in locales) {
  const locale = locales[key];
  i18n.loadLocaleData(key, { plurals: locale.plurals });
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

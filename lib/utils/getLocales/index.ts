import { en, fr, de, ru, zh, ko, es, hi } from "make-plural/plurals";
import { IS_PRODUCTION } from "../../constants";

// TODO: remove NODE_ENV=test hack from package.json https://github.com/lingui/js-lingui/issues/433
// Define locales
interface ILocales {
  [locale: string]: {
    plurals: (
      n: number | string,
      ord?: boolean
    ) => "zero" | "one" | "two" | "few" | "many" | "other";
    time: string;
    label: string;
    production_ready: boolean;
  };
}

const locales: ILocales = {
  en: { plurals: en, time: "en-US", label: "English", production_ready: true },
  fr: { plurals: fr, time: "fr-FR", label: "Français", production_ready: true },
  de: { plurals: de, time: "de-DE", label: "Deutsch", production_ready: true },
  ru: { plurals: ru, time: "ru-RU", label: "Русский", production_ready: true },
  "zh-CN": {
    plurals: zh,
    time: "zh-CN",
    label: "中文",
    production_ready: true,
  },
  es: { plurals: es, time: "es-ES", label: "Español", production_ready: true },
  hi: { plurals: hi, time: "hi-IN", label: "हिन्दी", production_ready: true },
  ko: { plurals: ko, time: "ko-KR", label: "한국어", production_ready: false },
  "en-pseudo": {
    plurals: en,
    time: "en-US",
    label: "Pseudo",
    production_ready: false,
  },
};

export const getLocales = (): ILocales => {
  const result: ILocales = {};
  Object.keys(locales).forEach((locale) => {
    if (locales[locale].production_ready || !IS_PRODUCTION) {
      result[locale] = locales[locale];
    }
  });
  return result;
};

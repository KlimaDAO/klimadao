import { de, en, es, fr, hi, ko, ru, zh } from "make-plural/plurals";

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
  };
}

const productionLocales: ILocales = {
  en: { plurals: en, time: "en-US", label: "English" },
  fr: { plurals: fr, time: "fr-FR", label: "Français" },
  de: { plurals: de, time: "de-DE", label: "Deutsch" },
  ru: { plurals: ru, time: "ru-RU", label: "Русский" },
  "zh-CN": {
    plurals: zh,
    time: "zh-CN",
    label: "中文",
  },
  es: { plurals: es, time: "es-ES", label: "Español" },
  hi: { plurals: hi, time: "hi-IN", label: "हिन्दी" },
};

const stagingLocales: ILocales = Object.assign({}, productionLocales, {
  ko: { plurals: ko, time: "ko-KR", label: "한국어" },
  "en-pseudo": {
    plurals: en,
    time: "en-US",
    label: "Pseudo",
  },
});

export const getLocales = (is_production: boolean): ILocales => {
  return is_production ? productionLocales : stagingLocales;
};

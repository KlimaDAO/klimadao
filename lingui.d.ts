export type Config = {
  locales: string[];
  sourceLocale: "en";
  fallbackLocales: {
    default: "en";
  };
  pseudoLocale: "en-pseudo";
  catalogs: [
    {
      path: string;
      include: string[];
      exclude: string[];
    }
  ];
  service?: {
    name: "TranslationIO";
    apiKey: string;
  };
};

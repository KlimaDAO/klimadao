// Base lingui config
const config = {
  locales: ["en", "fr", "en-pseudo"],
  sourceLocale: "en",
  fallbackLocales: {
    default: "en",
  },
  pseudoLocale: "en-pseudo",
  catalogs: [
    {
      path: "<rootDir>/locale/{locale}/messages",
      include: ["<rootDir>/"],
      exclude: ["**/node_modules/**"],
    },
  ],
};

// Adds translation io service if KLIMA_TRANSLATION_IO_KEY environnement variable is setup
if (process.env.KLIMA_TRANSLATION_IO_KEY) {
  config.service = {
    name: "TranslationIO",
    apiKey: process.env.KLIMA_TRANSLATION_IO_KEY,
  };
}
module.exports = config;

module.exports = {
  locales: ["en", "fr", "pseudo"],
  sourceLocale: "en",
  fallbackLocales: {
    default: "en",
  },
  pseudoLocale: "pseudo",
  catalogs: [
    {
      path: "<rootDir>/locale/{locale}/messages",
      include: ["<rootDir>/"],
      exclude: ["**"],
    },
  ]
};

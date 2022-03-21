module.exports = {
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
      exclude: ["**/node_modules/**", "lingui.config.js"],
    },
  ]
};

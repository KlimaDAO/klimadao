/**
 * @typedef { import("./lingui").Config } Config
 */

/** @type {Config} */
const config = {
  locales: ["en", "en-pseudo", "fr", "de"],
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

module.exports = config;

/**
 * @typedef { import("./lingui").Config } Config
 */

/** @type {Config} */
const config = {
  locales: ["en", "zh-CN", "en-pseudo", "fr", "de", "ru", "es", "ko"],
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

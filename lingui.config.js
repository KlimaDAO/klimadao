/**
 * @typedef { import("./lingui").Config } Config
 */

/** @type {Config} */
const config = {
  locales: ["en", "zh-CN", "en-pseudo", "fr", "de", "ru", "es", "ko", "hi"],
  sourceLocale: "en",
  extractBabelOptions: {
    presets: [
      "@babel/preset-typescript",
      "@babel/preset-react",
      "@babel/preset-flow",
    ],
  },
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

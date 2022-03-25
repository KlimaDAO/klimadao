// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../lingui.config.js");

// Adds translation io service if env var is available
if (process.env.TRANSLATIONIO_KEY_SITE) {
  config.service = {
    name: "TranslationIO",
    apiKey: process.env.TRANSLATIONIO_KEY_SITE,
  };
}

module.exports = config;

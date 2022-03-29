// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../lingui.config.js");

const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;
const TRANSLATIONIO_KEY_SITE = process.env.TRANSLATIONIO_KEY_SITE;

// Adds translation io service if env var is available
if (GITHUB_WORKSPACE && TRANSLATIONIO_KEY_SITE) {
  config.service = {
    name: "TranslationIO",
    apiKey: TRANSLATIONIO_KEY_SITE,
  };
} else {
  console.log("NOT RUNNING ON GITHUB");
  throw new Error("NOT RUNNING ON GITHUB");
}

module.exports = config;

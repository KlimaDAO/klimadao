// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../lingui.config.js");

const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;
const TRANSLATIONIO_KEY_CARBON_DATA = process.env.TRANSLATIONIO_KEY_CARBON_DATA;

if (GITHUB_WORKSPACE && !TRANSLATIONIO_KEY_CARBON_DATA) {
  console.log("Running on GITHUB without the API key => exit");
  throw new Error("ON GITHUB WITHOUT THE API KEY");
} else if (TRANSLATIONIO_KEY_CARBON_DATA) {
  // Adds translation io service if env var is available
  config.service = {
    name: "TranslationIO",
    apiKey: TRANSLATIONIO_KEY_CARBON_DATA,
  };
}

module.exports = config;

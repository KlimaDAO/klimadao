const fs = require("fs");
const path = require("path");

const packageJson = require("../carbonmark-api/package.json");
const version = packageJson.version;

const constantsPath = path.join(__dirname, "../carbonmark/lib/constants.ts");
let constants = fs.readFileSync(constantsPath, "utf8");

constants = constants.replace(
  /(API_PROD_URL = "https:\/\/v)[^\.]*\.[^\.]*\.[^\.]*(\.api\.carbonmark\.com")/,
  `$1${version}$2`
);

fs.writeFileSync(constantsPath, constants);

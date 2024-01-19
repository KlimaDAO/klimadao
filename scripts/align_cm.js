const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const packageJson = require("../carbonmark-api/package.json");
const version = packageJson.version;

const constantsPath = path.join(__dirname, "../carbonmark/lib/constants.ts");
let constants = fs.readFileSync(constantsPath, "utf8");

constants = constants.replace(
  /(API_PROD_URL = "https:\/\/v)[^\.]*\.[^\.]*\.[^\.]*(\.api\.carbonmark\.com")/,
  `$1${version}$2`
);

/** Update the constants file with the correct api version */
fs.writeFile(constantsPath, constants, (writeError) => {
  if (writeError) {
    console.error(`Error writing file: ${writeError}`);
    return;
  }
  // Change into the carbonmark directory and run generate:types
  exec(
    "npm run generate:types",
    { cwd: path.join(__dirname, "../carbonmark") },
    (execError, stdout, stderr) => {
      console.log(`Current directory: ${process.cwd()}`);
      if (execError) {
        console.error(`exec error: ${execError}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
});

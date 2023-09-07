import fs from "fs";
import path from "path";

// const SCHEMA_URL = "https://v1.1.0.api.carbonmark.com/openapi.json";
const SCHEMA_URL = "http://localhost:3003/openapi.json";

(async function () {
  const resp = await fetch(SCHEMA_URL);
  const schema = await resp.json();
  fs.writeFileSync(
    path.join(__dirname, "../.generated", "carbonmark-api.schema.ts"),
    // Client is unable to infer directly from json see: https://github.com/microsoft/TypeScript/issues/32063
    `export default ${JSON.stringify(schema, null, 2)} as const`
  );
})();

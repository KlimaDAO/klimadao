import fs from "fs";
import path from "path";

const SCHEMA_URL = "https://v1.1.0.api.carbonmark.com/openapi.json";
// const SCHEMA_URL = "http://localhost:3003/openapi.json";

/**
 * This script fetches the CarbonMark API schema from the provided URL and writes it to a local file.
 * This allows the client to infer types from the schema.
 *
 * SCHEMA_URL: The URL of the CarbonMark API schema.
 *
 * Note: Uncomment the localhost SCHEMA_URL to develop against a local API instance.
 */
(async function () {
  const resp = await fetch(SCHEMA_URL);

  if (!resp.ok) throw new Error(`Error fetching schema: ${resp.status}`);

  const schema = await resp.json();
  fs.writeFileSync(
    path.join(__dirname, "../.generated", "carbonmark-api.schema.ts"),
    // Client is unable to infer directly from json see: https://github.com/microsoft/TypeScript/issues/32063
    `export default ${JSON.stringify(schema, null, 2)} as const`
  );
})();

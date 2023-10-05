import fs from "fs";
import path from "path";
import { urls } from "../lib/constants";

const SCHEMA_URL = `${urls.api.base}/openapi.json`;

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
    path.join(__dirname, "../.generated", "carbonmark-api.schema.json"),
    // Client is unable to infer directly from json see: https://github.com/microsoft/TypeScript/issues/32063
    // `export default ${JSON.stringify(schema, null, 2)} as const`
    JSON.stringify(schema, null, 2)
  );
})();

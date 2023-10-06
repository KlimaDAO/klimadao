import fs from "fs";
import path from "path";
import { urls } from "../../carbonmark/lib/constants";

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
    path.join(__dirname, "../", "carbonmark-api.schema.json"),
    JSON.stringify(schema, null, 2)
  );
})();

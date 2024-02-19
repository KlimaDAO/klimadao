import nock from "nock";
import { ProvenanceRecord } from "src/models/ProvenanceRecord.model";
import { GRAPH_URLS } from "../../../../../src/app.constants";
import { fixtures } from "../../../../fixtures";
const retires = fixtures.digitalCarbon.retireWithProvenance;

export const mockDigitalCarbonProvenanceRecords = (
  override?: ProvenanceRecord[]
) =>
  nock(GRAPH_URLS["polygon"].digitalCarbon)
    .post("", (body) => body.query.includes("getProvenanceRecordsByHash"))
    .reply(200, {
      data: { retires: override ?? retires },
    });

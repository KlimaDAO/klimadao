import nock from "nock";
import { GRAPH_URLS } from "../../../../../src/app.constants";
import { fixtures } from "../../../../fixtures";
const mockProvenanceRecord = fixtures.digitalCarbon.provenanceRecord;

export const mockDigitalCarbonProvenanceRecords = () =>
  nock(GRAPH_URLS["polygon"].digitalCarbon)
    .post("")
    .reply(200, {
      data: { provenanceRecords: [mockProvenanceRecord] },
    });

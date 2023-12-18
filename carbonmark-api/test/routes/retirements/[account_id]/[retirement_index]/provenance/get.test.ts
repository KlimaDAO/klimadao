import { FastifyInstance } from "fastify";
import { pick } from "lodash";
import nock from "nock";
import { GRAPH_URLS } from "../../../../../../src/app.constants";
import { fixtures } from "../../../../../fixtures";
import { build } from "../../../../../helper";
import { DEV_URL } from "../../../../../test.constants";
const mockOffetRetirementIds = fixtures.offsets.retirementTransactionIds;
const mockProvenanceRecord = fixtures.digitalCarbon.provenanceRecord;

describe("GET /retirements/:account_id/:retirement_index/provenance", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    try {
      fastify = await build();
    } catch (e) {
      console.error(
        "/retirements/[:account_id]/[:retirement_index]/provenance get.test.ts setup failed",
        e
      );
    }
  });
  test("Returns a retirement provenance from account id and retirement index", async () => {
    // Mock retirement id query
    nock(GRAPH_URLS["polygon"].offsets).post("").reply(200, {
      data: mockOffetRetirementIds,
    });

    // Mock retirement provenance query
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: { provenanceRecords: [mockProvenanceRecord] },
      });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/retirements/0x0a1g3hcbteay53hd9ee1q8e06b56e8cd6767z52a/1/provenance`,
    });
    const record = await response.json();
    const transformedRecord = {
      ...pick(mockProvenanceRecord, [
        "id",
        "receiver",
        "sender",
        "token",
        "registrySerialNumbers",
      ]),
      originalAmount: 3,
      remainingAmount: 3,
      transactionType: "RETIREMENT",
      updatedAt: 1701095377,
      createdAt: 1701095377,
    };
    expect(response.statusCode).toEqual(200);
    expect(record).toEqual([transformedRecord, transformedRecord]);
  });
});

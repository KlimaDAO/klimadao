import { FastifyInstance } from "fastify";
import { pick } from "lodash";
import { fixtures } from "../../../../fixtures";
import { build } from "../../../../helper";
import { DEV_URL } from "../../../../test.constants";
import { mockDigitalCarbonProvenanceRecords } from "./get.test.mocks";

const mockProvenanceRecord =
  fixtures.digitalCarbon.retireWithProvenance[0].provenance;

describe("GET /retirements/:id/provenance", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    try {
      fastify = await build();
    } catch (e) {
      console.error(
        "/retirements/[:id]/provenance get.test.ts setup failed",
        e
      );
    }
  });
  test("Returns a retirement provenance by hash", async () => {
    mockDigitalCarbonProvenanceRecords();

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/retirements/0xa049a8354af988a4285eadc5c540590d26d95bca1c6a85c873e32a5c280e7509/provenance`,
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
    console.log("cad", record);
    console.log("cad2", transformedRecord);
    expect(response.statusCode).toEqual(200);
    expect(record).toEqual([transformedRecord, transformedRecord]);
  });
  test("Retirement provenance found", async () => {
    mockDigitalCarbonProvenanceRecords([]);
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/retirements/0xa049a8354af988a4285eadc5c540590d26d95bca1c6a85c873e32a5c280e7519/provenance`,
    });
    expect(response.statusCode).toEqual(404);
  });
});

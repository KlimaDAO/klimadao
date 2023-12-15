import { FastifyInstance } from "fastify";
import { omit } from "lodash";
import nock from "nock";
import { HUBSPOT_URLS } from "../../../src/app.constants";
import { build } from "../../helper";
import { DEV_URL, MOCK_BANK_TRANSFER_DATA } from "../../test.constants";

describe("POST /retire/bank-transfer", () => {
  let fastify: FastifyInstance;

  beforeEach(async () => {
    fastify = await build();
  });

  test("with valid form data", async () => {
    const SUCCESS_RESPONSE = {
      status: "ok",
      message:
        "<p>Thanks for submitting the form. Our team will be in touch in the coming days.&nbsp;</p>",
    };

    nock(HUBSPOT_URLS.payWithBankTransfer)
      .post("")
      .reply(200, SUCCESS_RESPONSE);

    const response = await fastify.inject({
      method: "POST",
      url: `${DEV_URL}/retire/bank-transfer`,
      body: MOCK_BANK_TRANSFER_DATA,
    });
    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(SUCCESS_RESPONSE);
  });

  test("with missing quantity field in form data", async () => {
    const ERROR_RESPONSE = {
      status: "error",
      message: "Something went wrong",
    };

    nock(HUBSPOT_URLS.payWithBankTransfer).post("").reply(400, ERROR_RESPONSE);

    const response = await fastify.inject({
      method: "POST",
      url: `${DEV_URL}/retire/bank-transfer`,
      body: omit(MOCK_BANK_TRANSFER_DATA, "quantity"),
    });
    const data = await response.json();
    expect(response.statusCode).toEqual(400);
    expect(data).toEqual(ERROR_RESPONSE);
  });
});

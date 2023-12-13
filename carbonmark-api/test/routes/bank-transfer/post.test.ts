import { FastifyInstance } from "fastify";
import nock from "nock";
import { HUBSPOT_URLS } from "../../../src/app.constants";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";

describe("POST /retire/bank-transfer", () => {
  let fastify: FastifyInstance;

  beforeEach(async () => {
    fastify = await build();
  });

  test("with valid form data", async () => {
    const SUCCESS_RESPONSE = {
      success: "ok",
      message:
        "Thanks for submitting the form. Our team will be in touch in the coming days.",
    };

    nock(HUBSPOT_URLS.payWithBankTransfer)
      .post("")
      .reply(200, SUCCESS_RESPONSE);

    const response = await fastify.inject({
      method: "POST",
      url: `${DEV_URL}/retire/bank-transfer`,
      body: {
        quantity: 1,
        email: "test@carbonmark.com",
        phone_number: "01 000 0000",
        company_name: "Carbonmark",
        first_name: "John",
        last_name: "Doe",
        job_title: "Engineer",
        project_name: "Test Project",
        beneficiary_name: "John Doe",
        beneficiary_address: "0x000000000000000000000",
        retirement_message: "This is the message",
      },
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
      body: {
        email: "test@carbonmark.com",
        phone_number: "01 000 0000",
        first_name: "John",
        last_name: "Doe",
        job_title: "Engineer",
        project_name: "Test Project",
        beneficiary_name: "John Doe",
        beneficiary_address: "0x000000000000000000000",
        retirement_message: "This is the message",
      },
    });
    const data = await response.json();
    expect(response.statusCode).toEqual(400);
    expect(data).toEqual(ERROR_RESPONSE);
  });
});

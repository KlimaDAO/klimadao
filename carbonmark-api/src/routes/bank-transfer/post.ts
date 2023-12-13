import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HUBSPOT_URLS } from "../../../src/app.constants";
import { RequestBody } from "./post.schema";

export const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Body: Static<typeof RequestBody> }>,
    reply: FastifyReply
  ) {
    const response = await fetch(HUBSPOT_URLS.payWithBankTransfer, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          {
            name: "retirement_amount",
            objectTypeId: "0-1",
            value: request?.body?.quantity,
          },
          {
            name: "email",
            objectTypeId: "0-1",
            value: request?.body?.email,
          },
          {
            name: "phone",
            objectTypeId: "0-1",
            value: request?.body?.phone_number,
          },
          {
            name: "company",
            objectTypeId: "0-1",
            value: request?.body?.company_name,
          },
          {
            name: "jobtitle",
            objectTypeId: "0-1",
            value: request?.body?.job_title,
          },
          {
            name: "firstname",
            objectTypeId: "0-1",
            value: request?.body?.first_name,
          },
          {
            name: "lastname",
            objectTypeId: "0-1",
            value: request?.body?.last_name,
          },
          {
            name: "who_will_this_retirement_be_credited_to_",
            objectTypeId: "0-1",
            value: request?.body?.beneficiary_name,
          },
          {
            name: "beneficiary_wallet_address",
            objectTypeId: "0-1",
            value: request?.body?.beneficiary_address,
          },
          {
            name: "project_names___volumes_of_interest",
            objectTypeId: "0-1",
            value: request?.body?.project_name,
          },
          {
            name: "retirement_message",
            objectTypeId: "0-1",
            value: request.body.retirement_message,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return reply.status(400).send({
        status: "error",
        message: "Something went wrong",
      });
    }

    return reply.status(200).send({
      status: "ok",
      message: data.inlineMessage,
    });
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "POST",
    url: "/retire/bank-transfer",
    handler: handler(fastify),
  });

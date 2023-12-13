import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestBody } from "./post.schema";

export const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Body: Static<typeof RequestBody> }>,
    reply: FastifyReply
  ) {
    // const portalId = "26010207"; // carbonmark
    // const formGuid = "2f87cd63-f8a7-43e9-9483-ac541a614762"; // a.k.a. `formId`
    // https://share-eu1.hsforms.com/1-lt2xk7_SAKFOEbja0IcXQ2dlwda

    const portalId = "143789599"; // carbonmark
    const formGuid = "662823ee-752e-4788-b61a-21ea4de1cc5a"; // a.k.a. `formId`

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            {
              name: "how_much_would_you_like_to_retire_",
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
              name: "project_names_of_interest", // todo change to carbonmark one...
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
      }
    );

    const json = await response.json();

    if (!response.ok) {
      return reply.status(400).send({
        status: json.status,
        message: "Something went wrong",
        errors: json.errors,
      });
    }

    console.log(json);

    return reply.status(200).send({
      status: "ok",
      message: json.inlineMessage,
    });
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "POST",
    url: "/retire/bank-transfer",
    handler: handler(fastify),
  });

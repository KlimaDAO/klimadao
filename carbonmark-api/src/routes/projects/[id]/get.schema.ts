import { Static, Type } from "@sinclair/typebox";
import { DetailedProjectModel } from "../../../models/DetailedProject.model";
import { NetworkParam } from "../../../models/NetworkParam.model";
import { CreditId } from "../../../utils/CreditId";

export const params = Type.Object({
  id: Type.RegEx(CreditId.ValidCreditIdRegex, {
    description: "Project id & vintage",
    examples: ["VCS-191-2008"],
  }),
});

export type Params = Static<typeof params>;

const querystring = Type.Object({
  expiresAfter: Type.Optional(
    Type.String({
      description:
        "Only return projects listings that expire after this timestamp (Unix seconds)",
      examples: ["1620000000"],
    })
  ),
});

export type Querystring = Static<typeof querystring> & {
  network: NetworkParam;
};

export const schema = {
  summary: "Project details",
  description: "Retrieve a carbon project by its project ID",
  tags: ["Projects"],
  params,
  querystring,
  response: {
    200: {
      description: "Project with id",
      content: {
        "application/json": {
          schema: DetailedProjectModel,
        },
      },
    },
  },
};

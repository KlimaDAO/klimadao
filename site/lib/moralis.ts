import Moralis from "moralis/node.js";
import { putPledgeParams } from "queries/pledge";
import * as yup from "yup";

export const MoralisClient = Moralis.start({
  appId: process.env.NEXT_PUBLIC_MORALIS_APP_ID,
  serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL,
  masterKey: process.env.MORALIS_SECRET,
});

export type Footprint = {
  timestamp: number;
  total: number;
};

export type Pledge = {
  objectId: string;
  address: string;
  name: string;
  pledge: string;
  methodology: string;
  footprint: Footprint[];
};

export const formSchema = yup
  .object({
    objectId: yup.string().nullable(),
    address: yup.string().required(),
    name: yup.string().required("Enter a name"),
    pledge: yup.string().required("Enter a pledge").max(280),
    methodology: yup.string().required("Enter a methodology").max(280),
    footprint: yup
      .number()
      .required("Enter your footprint")
      .min(1, "Enter a value greater than 1"),
  })
  .noUnknown();

export type PledgeFormValues = yup.InferType<typeof formSchema>;

export const pledgeResolver = (pledge: Pledge): PledgeFormValues => {
  const currentFootprint = pledge.footprint
    ? pledge.footprint.at(-1)?.total
    : 0;

  return {
    objectId: pledge.objectId,
    address: pledge.address || "",
    name: pledge.name || "",
    pledge: pledge.pledge || "",
    methodology: pledge.methodology || "",
    footprint: currentFootprint as number,
  };
};

// Moralis queries
export const getPledgeByAddress = async (address: string) => {
  await MoralisClient;

  const Pledge = Moralis.Object.extend("Pledge");
  const query = new Moralis.Query(Pledge);

  return await query.equalTo("address", address).first();
};

export const findOrCreatePledge = async (params: putPledgeParams) => {
  await MoralisClient;

  if (!params.sessionToken) throw new Error("Unauthorized");

  const userSession = await findUserSession(params.sessionToken);
  if (!userSession) throw new Error("Invalid Session");

  const Pledge = Moralis.Object.extend("Pledge");
  const pledgeObject = params.pledge.objectId
    ? await new Moralis.Query(Pledge).get(params.pledge.objectId)
    : new Pledge();

  const currentFootprint = pledgeObject.get("footprint");
  const footprint =
    params.pledge.objectId && currentFootprint
      ? buildFootprint(currentFootprint, params.pledge.footprint)
      : [{ timestamp: Date.now(), total: params.pledge.footprint }];

  pledgeObject.set({ ...params.pledge, footprint });

  return await pledgeObject.save(null, { useMasterKey: true });
};

const buildFootprint = (
  currentFootprint: Footprint[],
  newFootprint: number
): Footprint[] => {
  if (currentFootprint.at(-1)?.total === newFootprint) return currentFootprint;

  return [...currentFootprint, { timestamp: Date.now(), total: newFootprint }];
};

export const findUserSession = async (sessionToken: string) => {
  const query = new Moralis.Query("_Session");
  return await query
    .equalTo("sessionToken", sessionToken)
    .first({ useMasterKey: true });
};

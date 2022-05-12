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
  id: string;
  ownerAddress: string;
  name: string;
  description: string;
  methodology: string;
  footprint: Footprint[];
};

export const formSchema = yup
  .object({
    id: yup.string().uuid(),
    ownerAddress: yup.string().required(),
    name: yup.string().required("Enter a name"),
    description: yup
      .string()
      .required("Enter a pledge")
      .max(280, "Enter less than 280 characters"),
    methodology: yup
      .string()
      .required("Enter a methodology")
      .max(280, "Enter less than 280 characters"),
    footprint: yup
      .number()
      .typeError("Enter your estimated carbon footprint")
      .required("Enter your estimated carbon footprint")
      .min(1, "Value needs to be greater than 1"),
  })
  .noUnknown();

export type PledgeFormValues = yup.InferType<typeof formSchema>;

export const pledgeResolver = (pledge: Pledge): PledgeFormValues => {
  const currentFootprint = pledge.footprint
    ? pledge.footprint.at(-1)?.total
    : 0;

    console.log({pledge})

  return {
    id: pledge.id || "",
    ownerAddress: pledge.ownerAddress || "",
    name: pledge.name || "",
    description: pledge.description || "",
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

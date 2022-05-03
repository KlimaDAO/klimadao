import Moralis from "moralis/node.js";
import { putPledgeParams } from "queries/pledge";

export const MoralisClient = Moralis.start({
  appId: process.env.NEXT_PUBLIC_MORALIS_APP_ID,
  serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL,
  masterKey: process.env.MORALIS_SECRET,
});

export interface Pledge {
  address: string;
  pledge: string;
  footprint: number[];
  methodology: string;
  name: string;
  objectId: string;
}

export const pledgeResolver = (pledge: Pledge): Pledge => ({
  objectId: pledge.objectId,
  address: pledge.address || "",
  name: pledge.name || "",
  pledge: pledge.pledge || "",
  methodology: pledge.methodology || "",
  footprint: pledge.footprint || [],
});

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
  const newPledge = params.pledge.objectId
    ? await new Moralis.Query(Pledge).get(params.pledge.objectId)
    : new Pledge();

  newPledge.set({
    ...params.pledge,
    footprint: [params.pledge.footprint],
  });

  return await newPledge.save(null, { useMasterKey: true });
};

export const findUserSession = async (sessionToken: string) => {
  const query = new Moralis.Query("_Session");
  return await query
    .equalTo("sessionToken", sessionToken)
    .first({ useMasterKey: true });
};

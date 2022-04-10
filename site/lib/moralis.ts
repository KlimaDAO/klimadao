import Moralis from "moralis/node.js";

export const MoralisClient = Moralis.start({
  appId: process.env.NEXT_PUBLIC_MORALIS_APP_ID,
  serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL,
  masterKey: process.env.MORALIS_SECRET,
});

export interface Pledge {
  address: string;
  description: string;
  footprint: number[];
  methodology: string;
  name: string;
  objectId: string;
}

export const pledgeResolver = (pledge: Pledge) => ({
  objectId: pledge.objectId,
  address: pledge.address || "",
  name: pledge.name || "",
  description: pledge.description || "",
  methodology: pledge.methodology || "",
  footprint: pledge.footprint || [],
});

export const getPledgeByAddress = async (address: string) => {
  await MoralisClient;

  const Pledge = Moralis.Object.extend("Pledge");
  const query = new Moralis.Query(Pledge);

  return await query.equalTo("address", address).first();
};

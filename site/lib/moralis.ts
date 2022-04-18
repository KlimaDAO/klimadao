import Moralis from "moralis/node.js";

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

export const findOrCreatePledgeById = async (params) => {
  await MoralisClient;

  const userSession = await findUserSession(params.sessionToken);
  if (!userSession) throw new Error('')

  const user = userSession?.get("user");

  console.log(params.pledge)

  // const acl = new Moralis.ACL();
  // acl.setPublicReadAccess(true);
  // acl.setWriteAccess(user.id, true);

  // const Pledge = Moralis.Object.extend("Pledge");
  // const newPledge = new Pledge({
  //   ...params.pledge,
  //   footprint: [params.pledge.footprint],
  // });
  // newPledge.setACL(acl);

  // return await newPledge.save();
};

export const findUserSession = async (sessionToken: string) => {
  const query = new Moralis.Query("_Session");
  return await query
    .equalTo("sessionToken", sessionToken)
    .first({ useMasterKey: true });
};

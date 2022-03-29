import Moralis from "moralis/node.js";

export const MoralisClient = Moralis.start({
  appId: process.env.NEXT_PUBLIC_MORALIS_APP_ID,
  serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL,
});

export const getPledgeByAddress = async (address: string) =>
  await Moralis.Cloud.run("getPledge", { address }, { useMasterKey: true });

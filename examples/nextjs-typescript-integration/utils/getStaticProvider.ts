import { JsonRpcProvider } from "ethers";

/** Polygon RPC can be unstable. For production, we recommend paying for a private Infura or Alchemy URL */
const StaticProvider = new JsonRpcProvider("https://rpc.ankr.com/polygon", {
  chainId: 137,
  name: "Polygon",
});

export const getStaticProvider = () => {
  return StaticProvider;
};

import { ethers } from "ethers";

interface Params {
  address: string;
  signature: string;
  nonce: string;
}

export const verifySignature = (params: Params): void => {
  console.log(params);
  const decodedAddress = ethers.utils.verifyMessage(
    params.nonce,
    params.signature
  );
  console.log(decodedAddress);

  if (decodedAddress.toLowerCase() !== params.address) {
    throw new Error("Invalid signature");
  }
};

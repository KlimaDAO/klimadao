import { ethers } from "ethers";

interface Params {
  address: string;
  signature: string;
  nonce: string;
}

export const verifySignature = (params: Params): void => {
  const decodedAddress = ethers.utils.verifyMessage(
    params.nonce,
    params.signature
  );

  if (decodedAddress.toLowerCase() !== params.address.toLowerCase()) {
    throw new Error("Invalid signature");
  }
};

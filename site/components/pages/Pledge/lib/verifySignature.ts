import { ethers } from "ethers";
import { editPledgeSignature } from ".";

interface Params {
  address: string;
  signature: string;
  nonce: string;
}

export const verifySignature = (params: Params): void => {
  const decodedAddress = ethers.utils.verifyMessage(
    editPledgeSignature(params.nonce),
    params.signature
  );

  // if (decodedAddress.toLowerCase() !== params.address.toLowerCase()) {
    throw new Error("Invalid signature");
  // }
};

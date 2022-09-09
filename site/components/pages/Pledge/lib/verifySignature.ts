import { ethers } from "ethers";
import { editPledgeSignature } from ".";

interface Params {
  /* Expected signer. If the decoded address does not match, this will throw an error */
  address: string;
  /* Expected nonce. If the signed nonce does not match, ethers will throw an error */
  nonce: string;
  /* The signed string sent from the client */
  signature: string;
}

export const decodeSignerAddress = (params: {
  nonce: string;
  signature: string;
}) => {
  const decodedAddress = ethers.utils.verifyMessage(
    editPledgeSignature(params.nonce), // expected signed string and expected nonce e.g. "sign pledge 0123145181"
    params.signature // actual signature, which can be either 1. pledge owner, 2. secondary wallet 3. random wallet trying to hack us
  );
  return decodedAddress;
};

export const verifySignature = (params: Params): void => {
  // TODO: we need to extract this so we can first check who signed: owner vs secondary wallet?
  const decodedAddress = decodeSignerAddress({
    nonce: params.nonce,
    signature: params.signature,
  });

  if (decodedAddress.toLowerCase() !== params.address.toLowerCase()) {
    throw new Error("Invalid signature");
  }
};

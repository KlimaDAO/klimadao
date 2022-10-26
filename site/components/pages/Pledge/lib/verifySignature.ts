import { ethers } from "ethers";
import { editPledgeMessage, verifyGnosisSignature } from ".";

interface Params {
  address: string;
  /* The signed string sent from the client */
  signature: string;
  /* Expected nonce. If the signed nonce does not match, ethers will throw an error */
  nonce: string;
}

<<<<<<< HEAD
export const decodeSignerAddress = (params: {
  nonce: string;
  signature: string;
}): string | undefined => {
  const decodedAddress = ethers.utils.verifyMessage(
    editPledgeSignature(params.nonce), // expected signed string and expected nonce e.g. "sign pledge 0123145181"
    params.signature // actual signature, which can be either 1. pledge owner, 2. secondary wallet 3. random wallet trying to hack us
=======
const verifyWalletSignature = (params: {
  address: string;
  signature: string;
  message: string;
}) => {
  const decodedAddress = ethers.utils.verifyMessage(
    params.message,
    params.signature
>>>>>>> 1c7cd028230df93ad570e7bf575578fd01f4c450
  );

  return decodedAddress;
};

export const verifySignature = (params: Params): void => {
  const decodedAddress = decodeSignerAddress({
    nonce: params.nonce,
    signature: params.signature,
  });
  if (decodedAddress?.toLowerCase() !== params.address.toLowerCase()) {
    throw new Error("Invalid signature");
  }
};

<<<<<<< HEAD
// return a boolean
export const verifySignedMessage = (params: {
  expectedMessage: string;
  expectedAddress: string;
  signature: string;
}): boolean => {
  const decodedAddress = ethers.utils
    .verifyMessage(params.expectedMessage, params.signature)
    ?.toLowerCase();
  return decodedAddress === params.expectedAddress.toString().toLowerCase();
=======
export const verifySignature = async (params: Params): Promise<void> => {
  const message = editPledgeMessage(params.nonce);

  // Gnosis
  if (params.signature === "0x") {
    await verifyGnosisSignature({
      address: params.address,
      message,
    });
  } else {
    verifyWalletSignature({
      address: params.address,
      signature: params.signature,
      message,
    });
  }
>>>>>>> 1c7cd028230df93ad570e7bf575578fd01f4c450
};

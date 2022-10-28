import { utils } from "ethers";
import { editPledgeMessage, verifyGnosisSignature } from ".";
import { verifyGnosisSignature } from ".";

interface Params {
  address: string;
  /* The signed string sent from the client */
  signature: string;
  /* Expected nonce. If the signed nonce does not match, ethers will throw an error */
  expectedMessage: string;
}

export const decodeSignerAddress = (params: {
  signature: string;
  expectedMessage: string;
}): string => {
  const decodedAddress = utils.verifyMessage(
    params.expectedMessage, // expected signed string and expected nonce e.g. "sign pledge 0123145181"
    params.signature // actual signature, which can be either 1. pledge owner, 2. secondary wallet 3. random wallet trying to hack us
  );

  return decodedAddress;
};

export const verifySignature = async (params: Params) => {
  const decodedAddress = decodeSignerAddress({
    signature: params.signature,
    expectedMessage: params.expectedMessage,
  });

  // Gnosis
  if (params.signature === "0x") {
    await verifyGnosisSignature({
      address: params.address,
      message: params.expectedMessage,
    });
  }

  if (decodedAddress.toLowerCase() !== params.address.toLowerCase()) {
    throw new Error("Invalid signature");
  }
};

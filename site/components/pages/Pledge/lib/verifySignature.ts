import { utils } from "ethers";
import { editPledgeMessage, verifyGnosisSignature } from ".";

interface Params {
  address: string;
  signature: string;
  nonce: string;
}

const verifyWalletSignature = (params: {
  address: string;
  signature: string;
  message: string;
}) => {
  const decodedAddress = utils.verifyMessage(params.message, params.signature);

  if (decodedAddress.toLowerCase() !== params.address.toLowerCase()) {
    throw new Error("Invalid signature");
  }
};

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
};

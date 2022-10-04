import { ethers } from "ethers";
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
  const decodedAddress = ethers.utils.verifyMessage(
    params.message,
    params.signature
  );

  if (decodedAddress.toLowerCase() !== params.address.toLowerCase()) {
    throw new Error("Invalid signature");
  }
};

export const verifySignature = async (params: Params): Promise<void> => {
  // Expected signature generated server-side
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

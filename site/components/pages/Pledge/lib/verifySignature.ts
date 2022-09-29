import { ethers } from "ethers";
import { editPledgeSignature } from ".";
import { verifyGnosisSignature } from "./verifyGnosisSafeMultisig";

interface Params {
  address: string;
  signature: string;
  nonce: string;
}

export const verifySignature = async (params: Params): Promise<void> => {
  if (params.signature === "0x") {
    await verifyGnosisSignature({
      address: params.address,
      // todo rename this util to getEditPledgeMessage()
      message: editPledgeSignature(params.nonce),
    });
    return;
  }

  const signature = editPledgeSignature(params.nonce);
  const decodedAddress = ethers.utils.verifyMessage(
    signature,
    params.signature
  );

  if (decodedAddress.toLowerCase() !== params.address.toLowerCase()) {
    throw new Error("Invalid signature");
  }
};

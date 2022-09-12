import { ethers } from "ethers";
import { editPledgeSignature } from ".";

interface Params {
  address: string;
  signature: string;
  nonce: string;
}

export const verifySignature = async (params: Params): Promise<void> => {
  // Gnosis multisig wallets are already validated client side
  if (params.signature === "0x") return;

  const signature = editPledgeSignature(params.nonce);
  const decodedAddress = ethers.utils.verifyMessage(
    signature,
    params.signature
  );

  if (decodedAddress.toLowerCase() !== params.address.toLowerCase()) {
    throw new Error("Invalid signature");
  }
};

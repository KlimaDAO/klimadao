import { ethers } from "ethers";
import { editPledgeSignature } from ".";
import { getJsonRpcProvider } from "@klimadao/lib/utils";
import GnosisSafeSignMessageLib from "@klimadao/lib/abi/GnosisSafeSignMessageLib.json";

interface Params {
  address: string;
  signature: string;
  nonce: string;
}

const FIVE_MINUTES = 5 * 60 * 1000;

const verifyGnosisSafeSignature = async (
  signature: string,
  address: string
): Promise<void> => {
  const gnosisSafeContract = new ethers.Contract(
    address,
    GnosisSafeSignMessageLib.abi,
    getJsonRpcProvider()
  );
  const messageHash = ethers.utils.hashMessage(signature);
  const getMessageHash = await gnosisSafeContract.getMessageHash(messageHash);
  const signedEvent = gnosisSafeContract.filters.SignMsg(getMessageHash);

  const waitForSignedEvent = (): Promise<void> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        gnosisSafeContract.removeListener(signedEvent, () => resolve());
        reject(new Error("Gnosis safe signature verification timed out"));
      }, FIVE_MINUTES);

      gnosisSafeContract.once(signedEvent, () => resolve());
    });

  await waitForSignedEvent();
};

export const verifySignature = async (params: Params): Promise<void> => {
  const signature = editPledgeSignature(params.nonce);

  if (params.signature === "0x") {
    await verifyGnosisSafeSignature(signature, params.address);
  } else {
    const decodedAddress = ethers.utils.verifyMessage(
      signature,
      params.signature
    );

    if (decodedAddress.toLowerCase() !== params.address.toLowerCase()) {
      throw new Error("Invalid signature");
    }
  }
};

import { ethers } from "ethers";
import { editPledgeSignature } from ".";
import { getJsonRpcProvider } from "@klimadao/lib/utils";
import GnosisSafe from "@klimadao/lib/abi/GnosisSafe.json";

interface Params {
  address: string;
  signature: string;
  nonce: string;
}

const FIVE_MINUTES = 5 * 60 * 1000;

const verifyGnosisSafeSignature = async (
  signature: string,
  address: string
) => {
  const gnosisSafeContract = new ethers.Contract(
    address,
    GnosisSafe.abi,
    getJsonRpcProvider()
  );
  const messageHash = ethers.utils.hashMessage(signature);
  const getMessageHash = await gnosisSafeContract.getMessageHash(messageHash);
  const signedEvent = gnosisSafeContract.filters.SignMsg(getMessageHash);

  const waitForSignedEvent = (): Promise<void> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        gnosisSafeContract.removeListener(signedEvent, () => resolve());
        reject();
      }, FIVE_MINUTES);

      console.log("...waiting");

      gnosisSafeContract.once(signedEvent, async () => {
        console.log("signed messaged with hash event emitted");
        resolve();
      });
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

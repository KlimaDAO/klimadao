import { ethers } from "ethers";
import { getJsonRpcProvider } from "@klimadao/lib/utils";
import GnosisSafeSignMessageLib from "@klimadao/lib/abi/GnosisSafeSignMessageLib.json";

const ONE_HOUR = 60 * 60 * 1000;

export const verifyGnosisSafeMultisig = async (params: {
  signature: string;
  address: string;
}): Promise<void> => {
  const provider = getJsonRpcProvider();
  const gnosisSafeContract = new ethers.Contract(
    params.address,
    GnosisSafeSignMessageLib.abi,
    provider
  );
  const messageHash = ethers.utils.hashMessage(params.signature);
  const getMessageHash = await gnosisSafeContract.getMessageHash(messageHash);
  const signedEvent = gnosisSafeContract.filters.SignMsg(getMessageHash);

  const waitForSignedEvent = (): Promise<void> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        gnosisSafeContract.removeListener(signedEvent, () => resolve());
        reject(new Error("Gnosis safe signature verification timed out"));
      }, ONE_HOUR);

      gnosisSafeContract.once(signedEvent, () => resolve());
    });

  await waitForSignedEvent();
};

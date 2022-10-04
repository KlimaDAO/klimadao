import { ethers } from "ethers";
import { getJsonRpcProvider } from "@klimadao/lib/utils";
import GnosisSafeSignMessageLib from "@klimadao/lib/abi/GnosisSafeSignMessageLib.json";

const ONE_HOUR = 60 * 60 * 1000;

export const waitForGnosisSignature = async (params: {
  message: string;
  address: string;
}): Promise<void> => {
  const provider = getJsonRpcProvider();
  const gnosisSafeContract = new ethers.Contract(
    params.address,
    GnosisSafeSignMessageLib.abi,
    provider
  );
  const messageHash = ethers.utils.hashMessage(params.message);
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

export const verifyGnosisSignature = async (params: {
  /** Plain un-hashed string with expected nonce */
  message: string;
  /** Address of the multisig contract */
  address: string;
}) => {
  const provider = getJsonRpcProvider();
  const gnosisSafeContract = new ethers.Contract(
    params.address,
    GnosisSafeSignMessageLib.abi,
    provider
  );
  const messageHash = ethers.utils.hashMessage(params.message);
  const getMessageHash = await gnosisSafeContract.getMessageHash(messageHash);

  const signedEvent = gnosisSafeContract.filters.SignMsg(getMessageHash);
  // signature event must be in the last 5 blocks (10 seconds)
  const currentBlock = await provider.getBlockNumber();
  const events = await gnosisSafeContract.queryFilter(
    signedEvent,
    currentBlock - 5
  );

  if (events.length < 1) {
    throw new Error("Gnosis signature not found");
  }
};

import { BigNumberish, Contract, ethers, utils } from "ethers";
import { getJsonRpcProvider } from "@klimadao/lib/utils";
import GnosisSafeSignMessageLib from "@klimadao/lib/abi/GnosisSafeSignMessageLib.json";
import { polygonNetworks } from "@klimadao/lib/constants";

const ONE_HOUR = 60 * 60 * 1000;

export const waitForSignatures = async (params: {
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

// https://github.com/safe-global/safe-contracts/blob/ee92957307653ae6cf7312bbcb1a13c6884ea6ea/src/utils/execution.ts
export const EIP712_SAFE_MESSAGE_TYPE = {
  // "SafeMessage(bytes message)"
  SafeMessage: [{ type: "bytes", name: "message" }],
};

// https://github.com/safe-global/safe-contracts/blob/ee92957307653ae6cf7312bbcb1a13c6884ea6ea/src/utils/execution.ts
export const calculateSafeMessageHash = (
  safe: Contract,
  message: string,
  chainId: BigNumberish
): string => {
  return utils._TypedDataEncoder.hash(
    { verifyingContract: safe.address, chainId },
    EIP712_SAFE_MESSAGE_TYPE,
    { message: ethers.utils.hashMessage(message) }
  );
};

/**
 * Check if given message string has been signed by the multisig
 * Throws if no signature was found, or multiple were found
 */
export const verifyGnosisSignature = async (params: {
  /** Plain un-hashed string with expected nonce */
  message: string;
  /** Address of the multisig contract */
  address: string;
}) => {
  const provider = getJsonRpcProvider();
  const Safe = new ethers.Contract(
    params.address,
    GnosisSafeSignMessageLib.abi,
    provider
  );
  const safeMessageHash = calculateSafeMessageHash(
    Safe,
    params.message,
    polygonNetworks.mainnet.chainId
  );
  const filter = Safe.filters.SignMsg(safeMessageHash);
  // signature event must be in the last 5 blocks (10 seconds)
  const currentBlock = await provider.getBlockNumber();
  const evts = await Safe.queryFilter(filter, currentBlock - 5);
  if (evts.length < 1) {
    throw new Error("Gnosis signature not found");
  }
};

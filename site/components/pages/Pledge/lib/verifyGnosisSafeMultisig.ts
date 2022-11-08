import { Contract, utils } from "ethers";
import { polygonNetworks } from "@klimadao/lib/constants";
import GnosisSafeSignMessageLib from "@klimadao/lib/abi/GnosisSafeSignMessageLib.json";
import { getJsonRpcProvider } from "@klimadao/lib/utils";

const ONE_HOUR = 60 * 60 * 1000;

export const waitForGnosisSignature = async (params: {
  message: string;
  address: string;
}): Promise<void> => {
  const provider = getJsonRpcProvider();
  const gnosisSafeContract = new Contract(
    params.address,
    GnosisSafeSignMessageLib.abi,
    provider
  );
  const messageHash = utils.hashMessage(params.message);
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
const EIP712_SAFE_MESSAGE_TYPE = {
  // "SafeMessage(bytes message)"
  SafeMessage: [{ type: "bytes", name: "message" }],
};

// https://github.com/safe-global/safe-contracts/blob/ee92957307653ae6cf7312bbcb1a13c6884ea6ea/src/utils/execution.ts
const calculateSafeMessageHash = (safe: Contract, message: string): string => {
  return utils._TypedDataEncoder.hash(
    {
      verifyingContract: safe.address,
      chainId: polygonNetworks.mainnet.chainId,
    },
    EIP712_SAFE_MESSAGE_TYPE,
    { message: utils.hashMessage(message) }
  );
};

export const verifyGnosisSignature = async (params: {
  /** Plain un-hashed string with expected nonce */
  message: string;
  /** Address of the multisig contract */
  address: string;
}) => {
  const provider = getJsonRpcProvider();
  const gnosisSafeContract = new Contract(
    params.address,
    GnosisSafeSignMessageLib.abi,
    provider
  );
  const getMessageHash = calculateSafeMessageHash(
    gnosisSafeContract,
    params.message
  );

  const signedEvent = gnosisSafeContract.filters.SignMsg(getMessageHash);
  // signature event must be in the last 5 blocks (10 seconds)
  const events = await gnosisSafeContract.queryFilter(signedEvent, -10);

  if (events.length < 1) {
    throw new Error("Gnosis signature not found");
  }
};

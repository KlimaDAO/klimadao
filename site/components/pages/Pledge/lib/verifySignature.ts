import { ethers } from "ethers";
import { editPledgeSignature } from ".";
import { getJsonRpcProvider } from "@klimadao/lib/utils";
import GnosisSafe from "@klimadao/lib/abi/GnosisSafe.json";

interface Params {
  address: string;
  signature: string;
  nonce: string;
}

const EIP_1217_MAGIC_VALUE = "0x1626ba7e";

const verifyGnosisSafeSignature = async (signature, address) => {
  const messageHash = ethers.utils.hashMessage(signature);
  const gnosisSafeContract = new ethers.Contract(
    address,
    GnosisSafe.abi,
    getJsonRpcProvider().getSigner(address)
  );

  const _signature = "0x";
  const response = await gnosisSafeContract.isValidSignature(
    messageHash,
    _signature
  );

  console.log(response);

  if (response !== EIP_1217_MAGIC_VALUE) {
    throw new Error("Invalid signature");
  }
};

export const verifySignature = async (params: Params): Promise<void> => {
  if (params.signature === "0x") {
    await verifyGnosisSafeSignature(
      editPledgeSignature(params.nonce),
      params.address
    );
  } else {
    const decodedAddress = ethers.utils.verifyMessage(
      editPledgeSignature(params.nonce),
      params.signature
    );

    if (decodedAddress.toLowerCase() !== params.address.toLowerCase()) {
      throw new Error("Invalid signature");
    }
  }
};

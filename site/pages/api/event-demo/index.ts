import LiveOffset from "@klimadao/lib/abi/LiveOffset.json";
import { addresses } from "@klimadao/lib/constants";
import { getInfuraUrl, getJsonRpcProvider } from "@klimadao/lib/utils";
import { LIVE_OFFSET_WALLET_MNEMONIC } from "@klimadao/site/lib/secrets";
import { formSchema } from "components/pages/EventDemo/lib/formSchema";
import {
  RetirementData,
  retirementDataSchema,
} from "components/pages/EventDemo/lib/retirementDataSchema";
import { Contract, ContractTransaction, utils, Wallet } from "ethers";
import { NextApiHandler } from "next";

if (!LIVE_OFFSET_WALLET_MNEMONIC) {
  throw new Error(
    "This environment does not have the LIVE_OFFSET_WALLET_MNEMONIC variable. Add it to your .env.local file?"
  );
}

const provider = getJsonRpcProvider(
  getInfuraUrl({
    chain: "polygon",
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID!,
  })
);
const wallet = Wallet.fromMnemonic(LIVE_OFFSET_WALLET_MNEMONIC).connect(
  provider
);
const LiveOffsetContract = new Contract(
  addresses["mainnet"].liveOffsetContract,
  LiveOffset.abi,
  wallet
);

export interface APIDefaultResponse {
  message: string;
}
const USE_DUMMY_DATA = false;

const eventDemo: NextApiHandler<RetirementData | APIDefaultResponse> = async (
  req,
  res
) => {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({ message: "Bad request." });
    }
    // throws if invalid
    const formData = formSchema.validateSync(req.body);

    if (USE_DUMMY_DATA) {
      // TEMPORARY DEMO MODE, DELETE ME
      const response = retirementDataSchema.validateSync({
        index: "3",
        beneficiaryAddress: "0x123",
        quantity: "1",
        transactionHash: "0x456",
      });
      await new Promise((resolve) =>
        setTimeout(() => resolve(undefined), 3000)
      );
      res.status(400).json(response);
      return;
    }
    // get event-specific data for constructing urls and UI messaging
    const [beneficiaryAddress, quantity] =
      await LiveOffsetContract.getEventData();

    // create retirement
    const txn: ContractTransaction = await LiveOffsetContract.singleOffset(
      formData.name,
      formData.loveLetter,
      {
        maxFeePerGas: utils.parseUnits("60", 9),
        maxPriorityFeePerGas: utils.parseUnits("60", 9),
      }
    );
    const receipt = await txn.wait(1);

    const index = LiveOffsetContract.interface
      .parseLog(receipt.logs[receipt.logs.length - 2])
      .args.index.toNumber();

    // validate data against our expected schema, and make typescript happy
    const response = retirementDataSchema.validateSync({
      index,
      beneficiaryAddress,
      quantity: utils.formatUnits(quantity, 18),
      transactionHash: receipt.transactionHash,
    });

    res.status(200).json(response);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
      return;
    }
    res.status(500).json({ message: "Unknown error, check server logs" });
  }
};

export default eventDemo;

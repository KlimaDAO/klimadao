import { addresses } from "@klimadao/lib/constants";
import { formSchema } from "components/pages/EventDemo/lib/formSchema";
import { Contract, ContractTransaction, providers, Wallet } from "ethers";
import { getInfuraUrlPolygon } from "lib/getInfuraUrl";
import { NextApiHandler } from "next";
import { LIVE_OFFSET_WALLET_MNEMONIC } from "@klimadao/site/lib/secrets";
import LiveOffset from "@klimadao/lib/abi/LiveOffset.json";
import {
  RetirementData,
  retirementDataSchema,
} from "components/pages/EventDemo/lib/retirementDataSchema";
import { getRetirementIndexFromReceipt } from "components/pages/EventDemo/lib/getRetirementIndexFromReceipt";

if (!LIVE_OFFSET_WALLET_MNEMONIC) {
  throw new Error(
    "This environment does not have the LIVE_OFFSET_WALLET_MNEMONIC variable. Add it to your .env.local file?"
  );
}

const provider = new providers.JsonRpcProvider(getInfuraUrlPolygon());
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
const USE_DUMMY_DATA = true;

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
      res.status(200).json(response);
      return;
    }
    // get event-specific data for constructing urls and UI messaging
    const [beneficiaryAddress, quantity] =
      await LiveOffsetContract.getEventData();
    console.log("got event data: ", beneficiaryAddress, quantity);
    // create retirement
    const txn: ContractTransaction = await LiveOffsetContract.singleOffset(
      formData.name,
      formData.loveLetter
    );
    const receipt = await txn.wait(1);

    // parse event logs to get the new retirement's index for constructing url
    const index = getRetirementIndexFromReceipt(receipt);
    console.log("parsed index: ", index);
    // validate data against our expected schema, and make typescript happy
    const response = retirementDataSchema.validateSync({
      index,
      beneficiaryAddress,
      quantity,
      transactionHash: receipt.transactionHash,
    });

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    }
    res.status(500).json({ message: "Unknown error, check server logs" });
  }
};

export default eventDemo;

import { addresses } from "@klimadao/lib/constants";
import { RetirementReceipt } from "@klimadao/lib/types/offset";
import { BigNumber, Contract, Wallet } from "ethers";
import { parseUnits } from "ethers-v6";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { INFURA_ID, LIVE_OFFSET_WALLET_MNEMONIC } from "lib/shared/secrets";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import IERC20 from "../../../../lib/abi/IERC20.json";
import KlimaRetirementAggregatorV2 from "../../../../lib/abi/KlimaRetirementAggregatorV2.json";
const LIVE_WALLET_ADDRESS = "0xa17b52d5e17254b03dfdf7b4dff2fc0c6108faac";

/** @temp hardcoded until we can populate with other options  */
const projectTokenAddress = "0x05e917686251e427034251087602da609e57f693";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!LIVE_OFFSET_WALLET_MNEMONIC) {
    throw new Error(
      "This environment does not have the LIVE_OFFSET_WALLET_MNEMONIC variable. Add it to your .env.local file?"
    );
  }

  const provider = getStaticProvider({ infuraId: INFURA_ID });
  const wallet = Wallet.fromMnemonic(LIVE_OFFSET_WALLET_MNEMONIC).connect(
    provider
  );

  if (process.env.SHOULD_DO_APPROVAL) {
    console.debug(`Beginning transactions approval up to ${"10"} tonnes...`);
    const contract = new Contract(
      projectTokenAddress, // address of whatever token we are retiring
      IERC20.abi,
      wallet
    );
    const approveTxn = await contract.approve(
      addresses["mainnet"].retirementAggregatorV2,
      parseUnits("10", 18).toString() /// 99,999 followed by 18 decimal places
    );
    console.debug(`Executing transactions approval up to ${"10"} tonnes...`);
    await approveTxn.wait(1);
    console.debug(`Transactions approved up to ${"10"} tonnes`);
  }

  const params = req.body;
  const args = [
    // params.projectTokenAddress, // address of token to retire (the one they picked)
    projectTokenAddress,
    // parseUnits(params.quantity,18),  // quantity to retire (18 decimal bigint)
    parseUnits("0.001", 18),
    LIVE_WALLET_ADDRESS, // beneficiary address (in this case just the server wallet's address)
    params.name, // optional input from the user?
    params.message, // DEFAULT TEXT e.g. "Compensating for COP 23 travel emissions with Carbonmark & EcoRegistry"
    0,
  ];
  const abi = KlimaRetirementAggregatorV2.abi;
  // retire transaction
  const aggregator = new Contract(
    addresses["mainnet"]["retirementAggregatorV2"],
    abi,
    wallet
  );
  const newRetirementIndex: BigNumber = await aggregator.callStatic[
    "c3RetireExactC3T"
  ](...args);

  console.debug(`Building retirement transaction with args: ${args}`);
  const txn = await aggregator.c3RetireExactC3T(...args);

  console.debug(`Executing transaction with args: ${args}`);
  const receipt: RetirementReceipt = await txn.wait(1);

  console.debug(`Successful transaction with args: ${args}`);

  const url = `https://carbonmark.com/retirements/${wallet.address}/${newRetirementIndex}`;

  return res.status(200).json({ url, transaction: receipt.transactionHash });
};

export default handler;

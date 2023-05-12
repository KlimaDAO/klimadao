import { getContract } from "@klimadao/lib/utils";
import type { BigNumber } from "ethers";
import { providers, utils } from "ethers";
import { OnStatusHandler } from "lib/statusMessage";
import { isPoolToken } from "../RetireForm";
import type {
  RetireCarbonTransactionProps,
  RetireCarbonTransactionResult,
  RetirementReceipt,
} from "./retireTypes";

export const handleRetire = async (props: RetireCarbonTransactionProps) => {
  try {
    if (!props.address || !props.provider) return;
    const {
      address,
      provider,
      quantity,
      beneficiaryAddress,
      beneficiaryName,
      retirementMessage,
      onStatus,
      tokenSymbol,
      projectAddress,
      setRetireModalOpen,
      setRetirementTransactionHash,
      setRetirementTotals,
    } = props;
    let retirement: RetireCarbonTransactionResult;
    if (!isPoolToken(props.retirementToken)) {
      retirement = await retireProjectTokenTransaction({
        address,
        symbol: tokenSymbol,
        projectTokenAddress: projectAddress,
        signer: provider.getSigner(),
        quantity,
        beneficiaryAddress,
        beneficiaryName,
        retirementMessage,
        onStatus,
      });
      if (retirement) {
        setRetireModalOpen(false);
        // this opens RetirementSuccessModal
        setRetirementTransactionHash(retirement.receipt.transactionHash);
        setRetirementTotals(retirement.retirementTotals);
      }
      // close TransactionModal
    } else {
      console.log("Not a pool token");
    }
  } catch (e) {
    return;
  }
};

export const retireProjectTokenTransaction = async (params: {
  address: string;
  symbol: string;
  projectTokenAddress: string;
  signer: providers.JsonRpcSigner;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  onStatus: OnStatusHandler;
}): Promise<RetireCarbonTransactionResult> => {
  enum TransferMode {
    EXTERNAL = 0,
    INTERNAL = 1,
    EXTERNAL_INTERNAL = 2,
    INTERNAL_TOLERANT = 3,
  }
  try {
    const args = [
      params.projectTokenAddress,
      utils.parseUnits(params.quantity, 18),
      params.beneficiaryAddress || (await params.signer.getAddress()),
      params.beneficiaryName,
      params.retirementMessage,
      TransferMode.EXTERNAL,
    ];

    // retire transaction
    const aggregator = getContract({
      contractName: "retirementAggregatorV2",
      provider: params.signer,
    });

    console.log("params", utils.parseUnits(params.quantity, 6).toString());
    const method = params.symbol.startsWith("TCO2")
      ? "toucanRetireExactTCO2"
      : "c3RetireExactC3T";

    params.onStatus("userConfirmation");

    console.log("args", args);

    const newRetirementIndex: BigNumber = await aggregator.callStatic[method](
      ...args
    );
    console.log("newRetirementIndex", newRetirementIndex);

    const txn = await aggregator[method](...args);
    params.onStatus("networkConfirmation");
    const receipt: RetirementReceipt = await txn.wait(1);

    console.log("Retirement Receipt:", receipt);

    return {
      receipt,
      retirementTotals: newRetirementIndex.toNumber(),
    };
  } catch (e: any) {
    if (e.code === 4001) {
      params.onStatus("error", "userRejected");
      throw e;
    }
    params.onStatus("error");
    console.error(e);
    throw e;
  }
};

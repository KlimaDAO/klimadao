import { NetworkParam } from ".generated/carbonmark-api-sdk/types";
import { getContract } from "@klimadao/lib/utils";
import type { BigNumber } from "ethers";
import { providers } from "ethers";
import { parseUnits } from "ethers-v6";
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
      tokenAddress,
      tokenId,
      tokenStandard,
      network,
      setRetireModalOpen,
      setRetirementTransactionHash,
      setRetirementTotals,
      setRetirementBlockNumber,
    } = props;
    let retirement: RetireCarbonTransactionResult;
    if (!isPoolToken(props.retirementToken)) {
      retirement = await retireProjectTokenTransaction({
        address,
        symbol: tokenSymbol,
        tokenAddress,
        tokenId,
        tokenStandard,
        signer: provider.getSigner(),
        quantity,
        beneficiaryAddress,
        beneficiaryName,
        retirementMessage,
        network,
        onStatus,
      });
      if (retirement) {
        setRetireModalOpen(false);
        // this opens RetirementSuccessModal
        setRetirementBlockNumber(retirement.receipt.blockNumber);
        setRetirementTransactionHash(retirement.receipt.transactionHash);
        setRetirementTotals(retirement.retirementTotals);
      } else {
      }
    }
  } catch (e: any) {
    if (e.code === 4001) {
      props.onStatus("error", "userRejected");
      throw e;
    }
    props.onStatus("error");
    console.error(e);
    throw e;
  }
};

export const retireProjectTokenTransaction = async (params: {
  address: string;
  symbol: string;
  tokenAddress: string;
  tokenId: string;
  tokenStandard: string;
  signer: providers.JsonRpcSigner;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  network: NetworkParam;
  onStatus: OnStatusHandler;
}): Promise<RetireCarbonTransactionResult> => {
  enum TransferMode {
    EXTERNAL = 0,
    INTERNAL = 1,
    EXTERNAL_INTERNAL = 2,
    INTERNAL_TOLERANT = 3,
  }

  let args: (string | bigint | TransferMode)[] = [];
  let method = "";
  let network: "mainnet" | "testnet" = "mainnet";

  if (params.network === "polygon") {
    network = "mainnet";
  }
  if (params.network === "mumbai") {
    network = "testnet";
  }

  switch (params.tokenStandard) {
    case "ERC1155":
      args = [
        params.tokenAddress,
        params.tokenId,
        params.quantity,
        "", // retiring entity string
        params.beneficiaryAddress || (await params.signer.getAddress()),
        params.beneficiaryName,
        params.retirementMessage,
        TransferMode.EXTERNAL,
      ];

      if (params.symbol.startsWith("ICR")) {
        method = "icrRetireExactCarbon";
      }
      break;
    case "ERC20":
      args = [
        params.tokenAddress,
        parseUnits(params.quantity, 18),
        params.beneficiaryAddress || (await params.signer.getAddress()),
        params.beneficiaryName,
        params.retirementMessage,
        TransferMode.EXTERNAL,
      ];
      method = params.symbol.startsWith("TCO2")
        ? "toucanRetireExactTCO2"
        : "c3RetireExactC3T";
      break;
    default:
      break;
  }

  try {
    // retire transaction
    const aggregator = getContract({
      contractName: "retirementAggregatorV2",
      provider: params.signer,
      network: network,
    });

    params.onStatus("userConfirmation");

    const newRetirementIndex: BigNumber = await aggregator.callStatic[method](
      ...args
    );

    const txn = await aggregator[method](...args);
    params.onStatus("networkConfirmation");
    const receipt: RetirementReceipt = await txn.wait(1);

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

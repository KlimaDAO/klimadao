import { NetworkParam } from ".generated/carbonmark-api-sdk/types";
import IERC1155 from "@klimadao/lib/abi/IERC1155.json";
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import { addresses } from "@klimadao/lib/constants";
import { formatUnits } from "@klimadao/lib/utils";
import { Contract, constants, providers } from "ethers";
import { parseUnits } from "ethers-v6";
import {
  getAggregatorIsApprovedForAll,
  getAggregatorV2Allowance,
} from "lib/actions";
import { OnStatusHandler, TxnStatus } from "lib/statusMessage";

export const hasApproval = async (params: {
  tokenStandard: string;
  quantity: string;
  address: string;
  provider: providers.JsonRpcProvider;
  tokenAddress: string;
  network: NetworkParam;
}) => {
  if (params.tokenStandard === "ERC1155") {
    const aggregatorApproval = await getAggregatorIsApprovedForAll({
      userAddress: params.address,
      tokenAddress: params.tokenAddress,
      network: params.network,
    });
    return aggregatorApproval;
  } else {
    const aggregatorAllowance = await getAggregatorV2Allowance({
      userAddress: params.address,
      tokenAddress: params.tokenAddress,
    });

    return (
      !!Number(aggregatorAllowance) &&
      Number(aggregatorAllowance) >= Number(params.quantity)
    );
  }
};

export const approveProjectToken = async (params: {
  value: string;
  signer: providers.JsonRpcSigner;
  tokenAddress: string;
  tokenStandard: string;
  network: NetworkParam;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  let aggregatorAddress;
  switch (params.network) {
    case "polygon":
      aggregatorAddress = addresses["mainnet"].retirementAggregatorV2;
      break;
    case "mumbai":
      aggregatorAddress = addresses["testnet"].retirementAggregatorV2;
      break;
    default:
      break;
  }

  try {
    if (params.tokenStandard === "ERC1155") {
      const contract = new Contract(
        params.tokenAddress,
        IERC1155.abi,
        params.signer
      );
      params.onStatus("userConfirmation", "");
      const txn = await contract.setApprovalForAll(aggregatorAddress, true);
      params.onStatus("networkConfirmation", "");
      await txn.wait(1);
      params.onStatus("done", "Approval was successful");
      return constants.MaxUint256.toString();
    } else {
      const contract = new Contract(
        params.tokenAddress,
        IERC20.abi,
        params.signer
      );
      const parsedValue = parseUnits(params.value, 18);
      params.onStatus("userConfirmation", "");
      const txn = await contract.approve(
        addresses["mainnet"].retirementAggregatorV2,
        parsedValue.toString()
      );
      params.onStatus("networkConfirmation", "");
      await txn.wait(1);
      params.onStatus("done", "Approval was successful");
      return formatUnits(parsedValue, 18);
    }
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    console.error(error);
    throw error;
  }
};

interface HandleApproveProps {
  provider?: providers.JsonRpcProvider;
  retirementQuantity: string;
  updateStatus: (statusType: TxnStatus, message?: string) => void;
  tokenAddress: string;
  tokenStandard: string;
  network: NetworkParam;
}

export const handleApprove = async (props: HandleApproveProps) => {
  try {
    if (!props.provider) return;

    await approveProjectToken({
      value: props.retirementQuantity,
      signer: props.provider.getSigner(),
      onStatus: props.updateStatus,
      tokenAddress: props.tokenAddress,
      tokenStandard: props.tokenStandard,
      network: props.network,
    });
  } catch (e) {
    console.error("handleApprove error", e);
  }
  return;
};

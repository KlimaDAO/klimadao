import IERC20 from "@klimadao/lib/abi/IERC20.json";
import { addresses } from "@klimadao/lib/constants";
import { formatUnits } from "@klimadao/lib/utils";
import { Contract, providers, utils } from "ethers";
import { getAggregatorV2Allowance } from "lib/actions";
import { OnStatusHandler, TxnStatus } from "lib/statusMessage";

export const getApprovalValue = (quantity: string): string => {
  return quantity;
};

export const hasApproval = async (params: {
  quantity: string;
  address: string;
  provider: providers.JsonRpcProvider;
  projectAddress: string;
}) => {
  const aggregatorAllowance = await getAggregatorV2Allowance({
    userAddress: params.address,
    tokenAddress: params.projectAddress,
  });
  console.log("aggregatorAllowance", aggregatorAllowance);

  return (
    !!Number(aggregatorAllowance) &&
    Number(aggregatorAllowance) >= Number(params.quantity)
  );
};

export const approveProjectToken = async (params: {
  value: string;
  signer: providers.JsonRpcSigner;
  projectTokenAddress: string;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const contract = new Contract(
      params.projectTokenAddress,
      IERC20.abi,
      params.signer
    );
    const parsedValue = utils.parseUnits(params.value, 18);
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(
      addresses["mainnet"].retirementAggregatorV2,
      parsedValue.toString()
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Approval was successful");
    return formatUnits(parsedValue, 18);
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
  projectAddress: string;
}

export const handleApprove = async (props: HandleApproveProps) => {
  try {
    if (!props.provider) return;

    const approvedValue = await approveProjectToken({
      value: getApprovalValue(props.retirementQuantity),
      signer: props.provider.getSigner(),
      onStatus: props.updateStatus,
      projectTokenAddress: props.projectAddress,
    });
    console.log("Approved Value: ", approvedValue);
  } catch (e) {
    console.log("handleApprove error", e);
  }
  return;
};

import { ethers } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { addresses } from "../../constants";
import OffsetConsumption from "../../abi/OffsetConsumption.json";
import { formatUnits } from "..";

const provider = getJsonRpcProvider();
const offsetConsumptionContract = new ethers.Contract(
  addresses["mainnet"].offsetConsumption,
  OffsetConsumption.abi,
  provider
);

export const getOffsetConsumptionCost = async (params: {
  inputTokenAddress: string;
  poolTokenAddress: string;
  curInputTokenAmount: string;
  currentCoin: string;
  amountInCarbon: boolean;
}): Promise<[string, string]> => {
  const sourceAmount = await offsetConsumptionContract.getSourceAmount(
    params.inputTokenAddress,
    params.poolTokenAddress,
    ethers.utils.parseUnits(params.curInputTokenAmount),
    params.amountInCarbon // amountInCarbon: bool
  );
  const decimals =
    params.currentCoin === "USDC"
      ? 6
      : params.currentCoin === "KLIMA" ||
        params.currentCoin === "sKLIMA" ||
        params.currentCoin === "wsKLIMA"
      ? 9
      : 18;

  return [
    formatUnits(sourceAmount[0], decimals),
    formatUnits(sourceAmount[1], decimals),
  ];
};

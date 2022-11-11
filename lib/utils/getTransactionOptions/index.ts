import { utils } from "ethers";
import { urls } from "../../constants";

const convertGasInfoFromPolyscan = (value: string) =>
  utils.parseUnits((parseFloat(value) * 1.1).toFixed(2).toString(), 9);

/** Returns gas info from polygonscan plus 10 percent*/
const getGasInfo = async () => {
  try {
    const response = await fetch(urls.polyscanGasStation);
    const data = await response.json();
    const gasInfo = data.fast;
    const maxFeePerGas = convertGasInfoFromPolyscan(gasInfo.maxFee);
    const maxPriorityFeePerGas = convertGasInfoFromPolyscan(
      gasInfo.maxPriorityFee
    );
    return { maxFeePerGas, maxPriorityFeePerGas };
  } catch (error) {
    console.error(error);
  }
  console.error("Error contacting Polyscan API for Gas estimation");
  const fallbackFee = utils.parseUnits("60", 9); // 60 gwei
  return { maxFeePerGas: fallbackFee, maxPriorityFeePerGas: fallbackFee };
};

/** Returns the transaction options */
export const getTransactionOptions = async () => {
  return await getGasInfo();
};

import { ethers } from "ethers";

/** Returns the fast gas price from polygonscan plus 10 percent*/
export const getGasPrice = async () => {
  try {
    const response = await fetch(
      "https://api.polygonscan.com/api?module=gastracker&action=gasoracle"
    );
    const data = await response.json();
    if (data.message == "OK") {
      const targetGasPrice = data.result.FastGasPrice * 1.1;
      return ethers.utils.parseUnits(targetGasPrice.toString(), "gwei");
    }
  } catch (error) {
    console.error(error);
  }
  console.error("Error contacting Polyscan API for Gas estimation");
  return undefined;
};

/** Returns the transaction options */
export const getTransactionOptions = async () => {
  const gasPrice = await getGasPrice();
  return gasPrice ? { gasPrice } : {};
};

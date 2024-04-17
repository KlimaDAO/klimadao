import ERC20 from "@/abis/ERC20.json";
import { Contract, HDNodeWallet, MaxUint256 } from "ethers";
import { fetchGasPrices } from "./fetchGasPrices";
import { getContractInfo } from "./getContractInfo";
import { getTokenInfo } from "./getTokenInfo";

/** This only needs to be invoked one time, for new wallets */
export const approveMaxUsdc = async (wallet: HDNodeWallet) => {
  const UsdcContract = new Contract(
    getTokenInfo("usdc").address, // USDC.e
    ERC20.abi,
    wallet
  );
  const gas = await fetchGasPrices();
  const txn = await UsdcContract.approve(
    getContractInfo("klimaRetirementAggregatorV2").address, // spender
    MaxUint256,
    gas
  );
  await txn.wait(1);
  console.log("Successfully incremented allowance");
};

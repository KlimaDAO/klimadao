import { ethers } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { addresses, ESTIMATED_DAILY_REBASES } from "../../constants";
import DistributorContractv4 from "../../abi/DistributorContractv4.json";
import SKlima from "../../abi/sKlima.json";

export const getStakingRewards = async (days: number): Promise<number> => {
  const provider = getJsonRpcProvider();
  const distributorContract = new ethers.Contract(
    addresses.mainnet.distributor,
    DistributorContractv4.abi,
    provider
  );
  const sklimaContract = new ethers.Contract(
    addresses.mainnet.sklima,
    SKlima.abi,
    provider
  );
  const circSupply = await sklimaContract.circulatingSupply();
  const info = await distributorContract.info(0);
  const stakingReward = await distributorContract.nextRewardAt(info.rate);

  const stakingRebase = stakingReward / circSupply;
  const stakingRewards = Math.pow(
    1 + stakingRebase,
    days * ESTIMATED_DAILY_REBASES
  );
  return Math.floor((stakingRewards - 1) * 100);
};

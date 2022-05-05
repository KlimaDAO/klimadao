import { ethers } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { addresses, urls } from "../../constants";
import { getEstimatedDailyRebases } from "..";
import DistributorContractv4 from "../../abi/DistributorContractv4.json";
import SKlima from "../../abi/sKlima.json";

export const getStakingRewards = async (
  days: number,
  blockRate: number
): Promise<number> => {
  const provider = getJsonRpcProvider(urls.infuraRpc);
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

  const estimatedDailyRebases = getEstimatedDailyRebases(blockRate);

  const stakingRebase = stakingReward / circSupply;
  const stakingRewards = Math.pow(
    1 + stakingRebase,
    days * estimatedDailyRebases
  );
  return Math.floor((stakingRewards - 1) * 100);
};

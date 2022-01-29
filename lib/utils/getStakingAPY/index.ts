import { ethers } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { addresses } from "../../constants";
import { getBlockRate, getEstimatedDailyRebases } from "..";
import DistributorContractv4 from "../../abi/DistributorContractv4.json";
import SKlima from "../../abi/sKlima.json";

export const getStakingAPY = async (): Promise<number> => {
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

  // Parse it from redux(?) to avoid double api call
  const blockRate = await getBlockRate();
  const estimatedDailyRebases = getEstimatedDailyRebases(blockRate);

  const stakingRebase = stakingReward / circSupply;
  const stakingAPY = Math.pow(1 + stakingRebase, 365 * estimatedDailyRebases);
  return Math.floor(stakingAPY * 100);
};

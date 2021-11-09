import { ethers } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { addresses } from "../../constants";
import DistributorContractv4 from "../../abi/DistributorContractv4.json";
import SKlima from "../../abi/sKlima.json";

export const getStakingAPY = async (): Promise<number> => {
  const provider = getJsonRpcProvider();
  const distributorContract = new ethers.Contract(
    addresses.mainnet.distributor,
    DistributorContractv4.abi,
    provider
  );
  const sohmMainContract = new ethers.Contract(
    addresses.mainnet.sklima,
    SKlima.abi,
    provider
  );
  const circSupply = await sohmMainContract.circulatingSupply();
  const stakingReward = await distributorContract.nextRewardAt(5000);

  const stakingRebase = stakingReward / circSupply;
  const stakingAPY = Math.pow(1 + stakingRebase, 365 * 3);
  return Math.floor(stakingAPY * 100);
};

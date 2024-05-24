import { providers } from "ethers";
import { getContract } from "../../utils";

export const createRetirementStorageContract = (
  provider: providers.BaseProvider
) => getContract({ contractName: "retirementStorage", provider });

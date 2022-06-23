import { BigNumber, ethers } from "ethers";
import { addresses, allowancesContracts } from "../../constants";
import {
  AllowancesToken,
  AllowancesSpender,
  Allowances,
} from "../../types/allowances";

export const isSpenderInAddresses = (spender: string): boolean => {
  const keys = Object.keys(
    addresses.mainnet
  ) as (keyof typeof addresses["mainnet"])[];
  return keys.includes(spender as keyof typeof addresses["mainnet"]);
};

export const getAllowance = async (params: {
  contract: ethers.Contract;
  address: string;
  spender: AllowancesSpender;
  token: AllowancesToken;
}): Promise<Allowances> => {
  try {
    if (!isSpenderInAddresses(params.spender)) {
      throw new Error(`Unknown spender name in mainnet: ${params.spender}`);
    }
    const value: BigNumber = await params.contract.allowance(
      params.address, // owner
      addresses["mainnet"][params.spender] // spender
    );
    return {
      [params.token]: {
        [params.spender]: value,
      },
    } as Allowances;
  } catch (e) {
    console.error(e);
    return Promise.reject(`Error in getAllowance: ${e}`);
  }
};

export const getSpendersAndTokens = (spenders: AllowancesSpender[]) =>
  spenders.map((spender) => ({
    [spender as keyof typeof allowancesContracts]: allowancesContracts[spender],
  }));

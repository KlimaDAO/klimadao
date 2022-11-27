import {
  formatUnits,
  getContract,
  getJsonRpcProvider,
} from "@klimadao/lib/utils";

type Params = {
  address: string;
};

const BALANCE_TOKENS = [
  "klima",
  "sklima",
  "ubo",
  "nbo",
  "bct",
  "nct",
  "mco2",
] as const;
export type BalanceToken = typeof BALANCE_TOKENS[number];

export type Balances = {
  [key in BalanceToken]: string;
};

export const getBalances = async (params: Params): Promise<Balances> => {
  const provider = getJsonRpcProvider();

  const klimaContract = getContract({ contractName: "klima", provider });
  const sklimaContract = getContract({ contractName: "sklima", provider });
  const bctContract = getContract({ contractName: "bct", provider });
  const nctContract = getContract({ contractName: "nct", provider });
  const mco2Contract = getContract({ contractName: "mco2", provider });
  const nboContract = getContract({ contractName: "nbo", provider });
  const uboContract = getContract({ contractName: "ubo", provider });

  const klimaBalance = await klimaContract.balanceOf(params.address);
  const sklimaBalance = await sklimaContract.balanceOf(params.address);
  const bctBalance = await bctContract.balanceOf(params.address);
  const nctBalance = await nctContract.balanceOf(params.address);
  const mco2Balance = await mco2Contract.balanceOf(params.address);
  const nboBalance = await nboContract.balanceOf(params.address);
  const uboBalance = await uboContract.balanceOf(params.address);

  return {
    klima: formatUnits(klimaBalance, 9),
    sklima: formatUnits(sklimaBalance, 9),
    bct: formatUnits(bctBalance),
    nct: formatUnits(nctBalance),
    mco2: formatUnits(mco2Balance),
    nbo: formatUnits(nboBalance),
    ubo: formatUnits(uboBalance),
  };
};

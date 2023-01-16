import {
  formatUnits,
  getContract,
  getStaticProvider,
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
export type BalanceToken = (typeof BALANCE_TOKENS)[number];

export type Balances = {
  [key in BalanceToken]: string;
};

export const getBalances = async (params: Params): Promise<Balances> => {
  const provider = getStaticProvider();

  const klimaContract = getContract({ contractName: "klima", provider });
  const sklimaContract = getContract({ contractName: "sklima", provider });
  const bctContract = getContract({ contractName: "bct", provider });
  const nctContract = getContract({ contractName: "nct", provider });
  const mco2Contract = getContract({ contractName: "mco2", provider });
  const nboContract = getContract({ contractName: "nbo", provider });
  const uboContract = getContract({ contractName: "ubo", provider });

  const [klima, sklima, bct, nct, mco2, nbo, ubo] = await Promise.all([
    klimaContract.balanceOf(params.address),
    sklimaContract.balanceOf(params.address),
    bctContract.balanceOf(params.address),
    nctContract.balanceOf(params.address),
    mco2Contract.balanceOf(params.address),
    nboContract.balanceOf(params.address),
    uboContract.balanceOf(params.address),
  ]);

  return {
    klima: formatUnits(klima, 9),
    sklima: formatUnits(sklima, 9),
    bct: formatUnits(bct),
    nct: formatUnits(nct),
    mco2: formatUnits(mco2),
    nbo: formatUnits(nbo),
    ubo: formatUnits(ubo),
  };
};

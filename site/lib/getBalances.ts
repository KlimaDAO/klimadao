import { getJsonRpcProvider, getContractByToken } from "@klimadao/lib/utils";
import { formatUnits } from "@klimadao/lib/utils";

type Params = {
  address: string;
};

export type Balances = {
  klima: string;
  sklima: string;
  bct: string;
  mco2: string;
  nct: string;
};

export const getBalances = async (params: Params): Promise<Balances> => {
  const provider = getJsonRpcProvider();

  const bctContract = getContractByToken({ token: "bct", provider });
  const nctContract = getContractByToken({ token: "nct", provider });
  const mco2Contract = getContractByToken({ token: "mco2", provider });
  const klimaContract = getContractByToken({ token: "klima", provider });
  const sklimaContract = getContractByToken({ token: "sklima", provider });

  const klimaBalance = await klimaContract.balanceOf(params.address);
  const sklimaBalance = await sklimaContract.balanceOf(params.address);
  const bctBalance = await bctContract.balanceOf(params.address);
  const mco2Balance = await mco2Contract.balanceOf(params.address);
  const nctBalance = await nctContract.balanceOf(params.address);

  return {
    klima: formatUnits(klimaBalance, 9),
    sklima: formatUnits(sklimaBalance, 9),
    bct: formatUnits(bctBalance),
    mco2: formatUnits(nctBalance),
    nct: formatUnits(mco2Balance),
  };
};

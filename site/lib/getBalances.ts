import { ethers } from "ethers";
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import { addresses } from "@klimadao/lib/constants";
import { getJsonRpcProvider } from "@klimadao/lib/utils";
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

  const bctContract = new ethers.Contract(
    addresses["mainnet"].bct,
    IERC20.abi,
    provider
  );
  const nctContract = new ethers.Contract(
    addresses["mainnet"].nct,
    IERC20.abi,
    provider
  );
  const mco2Contract = new ethers.Contract(
    addresses["mainnet"].mco2,
    IERC20.abi,
    provider
  );
  const klimaContract = new ethers.Contract(
    addresses["mainnet"].klima,
    IERC20.abi,
    provider
  );
  const sklimaContract = new ethers.Contract(
    addresses["mainnet"].sklima,
    IERC20.abi,
    provider
  );

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

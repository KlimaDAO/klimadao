import { Contract, ethers, providers } from "ethers";
import { Thunk } from "state";

import IERC20 from "@klimadao/lib/abi/IERC20.json";
import wsKlima from "@klimadao/lib/abi/wsKlima.json";
import PunkTLD from "@klimadao/lib/abi/PunkTLD.json";

import { addresses } from "@klimadao/lib/constants";
import { formatUnits, trimStringDecimals } from "@klimadao/lib/utils";
import {
  setBalance,
  setExerciseAllowance,
  setMigrateAllowance,
  setStakeAllowance,
  setWrapAllowance,
  setDomains,
  Domain,
} from "state/user";

const getEns = async (params: { address: string }) => {
  const ethProvider = ethers.getDefaultProvider(1);
  const ens: any = {};
  const ensDomain: string | null = await ethProvider.lookupAddress(
    params.address
  );
  if (ensDomain) {
    const avatar = ethProvider.getAvatar(ensDomain);
    ens.avatar = avatar;
  }
  if (ensDomain) {
    ens.name = `${ensDomain}.eth`;
  }
  return ens;
};
const parseURL = (url: string): any => {
  const regex =
    /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i;
  if (!regex.test((url || "").trim())) {
    return;
  }
  const parts = url.trim().match(regex);
  const parsed: any = {};
  if (!parts) {
    return "";
  }
  if (parts[1]) {
    parsed.mediaType = parts[1].toLowerCase();

    const mediaTypeParts = parts[1]
      .split(";")
      .map((x: string) => x.toLowerCase());

    parsed.contentType = mediaTypeParts[0];

    mediaTypeParts.slice(1).forEach((attribute) => {
      const p = attribute.split("=");
      parsed[p[0]] = p[1];
    });
  }

  parsed.base64 = !!parts[parts.length - 2];
  parsed.data = parts[parts.length - 1] || "";

  parsed.toBuffer = () => {
    const encoding = parsed.base64 ? "base64" : "utf8";

    return Buffer.from(parsed.data, encoding);
  };

  return parsed;
};
const getKns = async (params: {
  address: string;
  contract: Contract;
}): Promise<Domain> => {
  const domain: any = {};

  try {
    const domainName = await params.contract.defaultNames(params.address);
    // what do we do if this is false?
    const isNameVerified =
      (await params.contract.getDomainHolder(domainName)) === params.address;
    if (!isNameVerified) null;
    domain.name = `${domainName}.klima`;
    const customImage = await params.contract.getDomainData(domainName);
    if (customImage && JSON.parse(customImage).imgAddress) {
      domain.image = JSON.parse(customImage).imgAddress;
    } else {
      const domains = await params.contract.domains(domainName);
      const tokenId = domains.tokenId;
      // if no image is in getDomainData get metadata from tokenURI and parse+decode it
      const domainData = await params.contract.tokenURI(tokenId);
      const domainDataDecoded = parseURL(domainData);
      const domainMetadata = atob(domainDataDecoded.data);
      // base64 decode metadata and get default image
      const decodedDefaultImage = atob(
        parseURL(JSON.parse(domainMetadata).image).data
      );
      domain.defaultImage = decodedDefaultImage;
    }
  } catch (error: any) {
    console.log(error);
  }
  return domain;
};

export const loadAccountDetails = (params: {
  provider: providers.JsonRpcProvider;
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const bctContract = new ethers.Contract(
        addresses["mainnet"].bct,
        IERC20.abi,
        params.provider
      );
      const nctContract = new ethers.Contract(
        addresses["mainnet"].nct,
        IERC20.abi,
        params.provider
      );
      const mco2Contract = new ethers.Contract(
        addresses["mainnet"].mco2,
        IERC20.abi,
        params.provider
      );
      const uboContract = new ethers.Contract(
        addresses["mainnet"].ubo,
        IERC20.abi,
        params.provider
      );
      const nboContract = new ethers.Contract(
        addresses["mainnet"].nbo,
        IERC20.abi,
        params.provider
      );
      const usdcContract = new ethers.Contract(
        addresses["mainnet"].usdc,
        IERC20.abi,
        params.provider
      );
      const klimaContract = new ethers.Contract(
        addresses["mainnet"].klima,
        IERC20.abi,
        params.provider
      );
      const sklimaContract = new ethers.Contract(
        addresses["mainnet"].sklima,
        IERC20.abi,
        params.provider
      );
      const wsklimaContract = new ethers.Contract(
        addresses["mainnet"].wsklima,
        wsKlima.abi,
        params.provider
      );
      const aklimaContract = new ethers.Contract(
        addresses["mainnet"].aklima,
        IERC20.abi,
        params.provider
      );
      const alklimaContract = new ethers.Contract(
        addresses["mainnet"].alklima,
        IERC20.abi,
        params.provider
      );
      const pKlimaContract = new ethers.Contract(
        addresses["mainnet"].pklima,
        IERC20.abi,
        params.provider
      );
      // remember to add this to addresses object
      const klimaDomainContract = new ethers.Contract(
        "0xe8b97542A433e7eCc7bB791872af04DF02A1a6E4",
        PunkTLD.abi,
        params.provider
      );

      //domains
      const knsDomain = await getKns({
        address: params.address,
        contract: klimaDomainContract,
      });
      const ensDomain = await getEns({ address: params.address });

      // balances
      // CARBON
      const bctBalance = await bctContract.balanceOf(params.address);
      const mco2Balance = await mco2Contract.balanceOf(params.address);
      const nctBalance = await nctContract.balanceOf(params.address);
      const uboBalance = await uboContract.balanceOf(params.address);
      const nboBalance = await nboContract.balanceOf(params.address);

      // KLIMA
      const klimaBalance = await klimaContract.balanceOf(params.address);
      const sklimaBalance = await sklimaContract.balanceOf(params.address);
      const wsklimaBalance = await wsklimaContract.balanceOf(params.address);
      const aklimaBalance = await aklimaContract.balanceOf(params.address);
      const alklimaBalance = await alklimaContract.balanceOf(params.address);
      const pklimaBalance = await pKlimaContract.balanceOf(params.address);
      // USDC
      const usdcBalance = await usdcContract.balanceOf(params.address);

      // allowances token.allowance(owner, spender)
      const stakeAllowance = await klimaContract.allowance(
        params.address,
        addresses["mainnet"].staking_helper
      );
      const unstakeAllowance = await sklimaContract.allowance(
        params.address,
        addresses["mainnet"].staking
      );
      const wrapAllowance = await sklimaContract.allowance(
        params.address,
        addresses["mainnet"].wsklima
      );
      const aKlimaAllowance = await aklimaContract.allowance(
        params.address,
        addresses["mainnet"].aklima_migrate
      );
      const alKlimaAllowance = await alklimaContract.allowance(
        params.address,
        addresses["mainnet"].alklima_migrate
      );
      const pKlimaAllowance = await pKlimaContract.allowance(
        params.address,
        addresses["mainnet"].pklima_exercise
      );
      const bctAllowance = await bctContract.allowance(
        params.address,
        addresses["mainnet"].pklima_exercise
      );
      dispatch(
        setDomains({
          knsDomain: knsDomain ?? undefined,
          ensDomain: ensDomain ?? undefined,
        })
      );
      dispatch(
        setBalance({
          klima: formatUnits(klimaBalance, 9),
          sklima: formatUnits(sklimaBalance, 9),
          wsklima: trimStringDecimals(formatUnits(wsklimaBalance), 9), // trim to 9 for compat with sKLIMA contract
          aklima: formatUnits(aklimaBalance),
          pklima: formatUnits(pklimaBalance),
          alklima: formatUnits(alklimaBalance),
          bct: formatUnits(bctBalance),
          nct: formatUnits(nctBalance),
          mco2: formatUnits(mco2Balance),
          ubo: formatUnits(uboBalance),
          nbo: formatUnits(nboBalance),
          usdc: formatUnits(usdcBalance, 6),
        })
      );
      dispatch(
        setMigrateAllowance({
          aklima: formatUnits(aKlimaAllowance),
          alklima: formatUnits(alKlimaAllowance),
        })
      );
      dispatch(
        setStakeAllowance({
          klima: formatUnits(stakeAllowance, 9),
          sklima: formatUnits(unstakeAllowance, 9),
        })
      );
      dispatch(
        setExerciseAllowance({
          bct: formatUnits(bctAllowance),
          pklima: formatUnits(pKlimaAllowance),
        })
      );
      dispatch(
        setWrapAllowance({
          sklima: formatUnits(wrapAllowance),
          // wsklima: formatUnits(wsklimaWrapAllowance),
        })
      );
    } catch (error: any) {
      console.log(error);
      if (error.message && error.message.includes("Non-200 status code")) {
        params.onRPCError();
      }
    }
  };
};

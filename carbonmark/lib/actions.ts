import IERC20 from "@klimadao/lib/abi/IERC20.json";
import { addresses } from "@klimadao/lib/constants";
import { AllowancesToken } from "@klimadao/lib/types/allowances";
import { formatUnits, isTestnetChainId } from "@klimadao/lib/utils";
import { Contract, Transaction, providers } from "ethers";
import { formatUnits as ethersFormatUnits, parseUnits } from "ethers-v6";
import { getAddress } from "lib/networkAware/getAddress";
import { getContract } from "lib/networkAware/getContract";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";
import { OnStatusHandler } from "lib/statusMessage";
import {
  Asset,
  AssetForRetirement,
  DetailedProject,
  PcbProject,
} from "lib/types/carbonmark.types";
import { getCarbonmarkProject } from "./carbonmark";
import { DEFAULT_EXPIRATION_DAYS, DEFAULT_MIN_FILL_AMOUNT } from "./constants";

const getSignerNetwork = (
  signer: providers.JsonRpcSigner
): "polygon" | "mumbai" => {
  return isTestnetChainId(signer.provider.network.chainId)
    ? "mumbai"
    : "polygon";
};

/** Get allowance for carbonmark contract, spending an 18 decimal token. Don't use this for USDC */
export const getCarbonmarkAllowance = async (params: {
  userAddress: string;
  tokenAddress: string;
  network?: "mumbai" | "polygon";
}): Promise<string> => {
  const tokenContract = new Contract(
    params.tokenAddress,
    IERC20.abi,
    getStaticProvider({
      chain: params.network,
    })
  );

  const allowance = await tokenContract.allowance(
    params.userAddress,
    getAddress("carbonmark", params.network)
  );

  return formatUnits(allowance);
};

export const getAggregatorV2Allowance = async (params: {
  userAddress: string;
  tokenAddress: string;
}): Promise<string> => {
  const tokenContract = new Contract(
    params.tokenAddress,
    IERC20.abi,
    getStaticProvider()
  );

  const allowance = await tokenContract.allowance(
    params.userAddress,
    getAddress("retirementAggregatorV2")
  );

  return ethersFormatUnits(allowance, 18);
};

/** Approve a known `tokenName`, or `tokenAddress` to be spent by the `spender` contract */
export const approveTokenSpend = async (params: {
  /** Name of a known token like "usdc" */
  tokenName?: AllowancesToken;
  /** Alternative to tokenName: address for an 18-decimal ERC20 token */
  tokenAddress?: string;
  spender: keyof typeof addresses.mainnet;
  value: string;
  signer: providers.JsonRpcSigner;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const network = getSignerNetwork(params.signer);
    let tokenContract: Contract;
    if (params.tokenName) {
      tokenContract = getContract({
        contractName: params.tokenName,
        provider: params.signer,
        network: network === "mumbai" ? "testnet" : "mainnet",
      });
    } else if (params.tokenAddress) {
      tokenContract = new Contract(
        params.tokenAddress,
        IERC20.abi,
        params.signer
      );
    } else {
      throw new Error("Must provide either tokenName or tokenAddress");
    }
    const decimals = params.tokenName ? getTokenDecimals(params.tokenName) : 18; // assume 18 if no tokenName is provided
    const parsedValue = parseUnits(params.value, decimals);

    params.onStatus("userConfirmation");
    const txn = await tokenContract.approve(
      getAddress(params.spender, network),
      parsedValue.toString()
    );

    params.onStatus("networkConfirmation", "");
    await txn.wait(1);

    params.onStatus("done", "Approval was successful");
    return formatUnits(parsedValue);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    console.error(error);
    throw error;
  }
};

/** Takes a `days` argument, converts it to seconds and adds it to the current date timestamp
 * @returns {string} timestamp in Unix seconds
 */
const getExpirationTimestamp = (days: number): string => {
  // 1000ms/s * 60s/m * 60m/hr * 24hr/d * days
  const milliseconds = 1000 * 60 * 60 * 24 * days;
  const expireTimestamp = Date.now() + milliseconds;
  return Math.floor(expireTimestamp / 1000).toString(); // ms to seconds
};

export const createListingTransaction = async (params: {
  /** 0x address of asset to sell */
  tokenAddress: string;
  /** Amount to list (tonnes) @example "123.456" */
  amount: string;
  /** Price per tonne (usdc) @example "12.45" */
  unitPrice: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const signer = params.provider.getSigner();
    const carbonmarkContract = getContract({
      contractName: "carbonmark",
      provider: signer,
      network: getSignerNetwork(signer) === "mumbai" ? "testnet" : "mainnet",
    });

    params.onStatus("userConfirmation", "");

    const listingTxn = await carbonmarkContract.createListing(
      params.tokenAddress,
      parseUnits(params.amount, 18),
      parseUnits(params.unitPrice, getTokenDecimals("usdc")),
      parseUnits(DEFAULT_MIN_FILL_AMOUNT.toString(), 18), // minFillAmount
      getExpirationTimestamp(DEFAULT_EXPIRATION_DAYS) // deadline (aka expiration)
    );

    params.onStatus("networkConfirmation", "");
    await listingTxn.wait(1);
    params.onStatus("done", "Transaction confirmed");
    return;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};

export const updateListingTransaction = async (params: {
  listingId: string;
  newAmount: string;
  singleUnitPrice: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const signer = params.provider.getSigner();
    const carbonmarkContract = getContract({
      contractName: "carbonmark",
      provider: params.provider.getSigner(),
      network: getSignerNetwork(signer) === "mumbai" ? "testnet" : "mainnet",
    });

    params.onStatus("userConfirmation", "");

    const listingTxn = await carbonmarkContract.updateListing(
      params.listingId,
      parseUnits(params.newAmount, 18),
      parseUnits(params.singleUnitPrice, getTokenDecimals("usdc")),
      parseUnits(DEFAULT_MIN_FILL_AMOUNT.toString(), 18), // minFillAmount
      getExpirationTimestamp(DEFAULT_EXPIRATION_DAYS) // deadline (aka expiration)
    );

    params.onStatus("networkConfirmation", "");
    await listingTxn.wait(1);
    params.onStatus("done", "Transaction confirmed");
    return;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};

export const makePurchase = async (params: {
  listingId: string;
  sellerAddress: string;
  creditTokenAddress: string;
  singleUnitPrice: string;
  quantity: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}): Promise<Transaction> => {
  try {
    const signer = params.provider.getSigner();
    const network = getSignerNetwork(signer);
    const carbonmarkContract = getContract({
      contractName: "carbonmark",
      provider: signer,
      network: network === "mumbai" ? "testnet" : "mainnet",
    });

    params.onStatus("userConfirmation", "");

    const maxCost = String(
      Number(params.quantity) * Number(params.singleUnitPrice)
    );

    const purchaseTxn = await carbonmarkContract.fillListing(
      params.listingId,
      params.sellerAddress,
      params.creditTokenAddress,
      parseUnits(params.singleUnitPrice, getTokenDecimals("usdc")),
      parseUnits(params.quantity, 18), // C3 token
      parseUnits(maxCost, 6)
    );

    params.onStatus("networkConfirmation", "");
    await purchaseTxn.wait(1);
    params.onStatus("done", "Transaction confirmed");
    return purchaseTxn;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};

export const deleteListingTransaction = async (params: {
  listingId: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const signer = params.provider.getSigner();
    const carbonmarkContract = getContract({
      contractName: "carbonmark",
      provider: params.provider.getSigner(),
      network: getSignerNetwork(signer) === "mumbai" ? "testnet" : "mainnet",
    });

    params.onStatus("userConfirmation", "");

    const listingTxn = await carbonmarkContract.cancelListing(params.listingId);

    params.onStatus("networkConfirmation", "");
    await listingTxn.wait(1);
    params.onStatus("done", "Transaction confirmed");
    return;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};

export type AssetWithProject = Asset & {
  project: DetailedProject | null;
};

const idFromSymbol = (symbol: string) => {
  const [_bridge, registry, registryProjectId, vintage] = symbol
    .toUpperCase()
    .split("-");
  return `${registry}-${registryProjectId}-${vintage}`;
};

export const addProjectsToAssets = async (params: {
  assets: Asset[];
}): Promise<AssetWithProject[]> => {
  try {
    const projectIdSet = new Set<string>();
    params.assets.forEach((asset) => {
      projectIdSet.add(idFromSymbol(asset.token.symbol));
    });
    const projectIds = Array.from(projectIdSet);
    const projects = await Promise.all(
      projectIds.map((id) => getCarbonmarkProject(id))
    );

    const ProjectMap = projects.reduce((PMap, p) => {
      if (p?.key) PMap.set(`${p.key}-${p.vintage}`, p);
      return PMap;
    }, new Map<string, DetailedProject>());

    return params.assets.map((a) => ({
      ...a,
      project: ProjectMap.get(idFromSymbol(a.token.symbol)) ?? null,
    }));
  } catch (e) {
    throw e;
  }
};

interface CompositeAssetParams {
  asset: Asset;
  project: PcbProject;
}

export const createCompositeAsset = (
  params: CompositeAssetParams
): AssetForRetirement => {
  const { asset, project } = params;
  if (!project) {
    throw new Error("Project field is not defined in the asset");
  }

  const compositeAsset: AssetForRetirement = {
    tokenName: asset.token.name,
    balance: asset.amount,
    tokenSymbol: asset.token.symbol,
    project,
  };

  return compositeAsset;
};

export const getUSDCBalance = async (params: {
  userAddress: string;
  network?: "polygon" | "mumbai";
}) => {
  const tokenContract = getContract({
    contractName: "usdc",
    provider: getStaticProvider({ chain: params.network }),
    network: params.network === "mumbai" ? "testnet" : "mainnet",
  });
  const balance = await tokenContract.balanceOf(params.userAddress);
  return formatUnits(balance, getTokenDecimals("usdc"));
};

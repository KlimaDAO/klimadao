import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { Asset, AssetExtended } from "@klimadao/lib/types/carbonmark";
import {
  formatUnits,
  getContract,
  getStaticProvider,
} from "@klimadao/lib/utils";
import { Contract, ethers, providers, Transaction, utils } from "ethers";
import { getCategoryFromMethodology } from "lib/getCategoryFromMethodology";
import { getCarbonmarkAddress } from "./getAddresses";
import { OnStatusHandler } from "./statusMessage";

// TODO: Before GO-LIVE replace with getContract("usdc")
// Currently, the USDC token is pointing to a fake one on Mumbai
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import { FAKE_USDC } from "./constants";

const staticProvider = getStaticProvider({ chain: "mumbai" }); // TODO: remove "mumbai" later

export const getC3tokenToCarbonmarkAllowance = async (params: {
  userAddress: string;
  tokenAddress: string;
}): Promise<string> => {
  const tokenContract = new Contract(
    params.tokenAddress,
    C3ProjectToken.abi,
    staticProvider
  );

  const allowance = await tokenContract.allowance(
    params.userAddress,
    getCarbonmarkAddress()
  );

  return ethers.utils.formatUnits(allowance);
};

export const getUSDCtokenToCarbonmarkAllowance = async (params: {
  userAddress: string;
  tokenAddress: string;
}): Promise<string> => {
  const tokenContract = new Contract(
    params.tokenAddress, // TODO: replace this contract getter with getContract("usdc") later
    IERC20.abi,
    staticProvider
  );

  const allowance = await tokenContract.allowance(
    params.userAddress,
    getCarbonmarkAddress()
  );

  return ethers.utils.formatUnits(allowance); // TODO: ensure to pass 6 later for USDC
};

export const onApproveCarbonmarkTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  tokenAddress: string;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const tokenContract = new Contract(
      params.tokenAddress,
      C3ProjectToken.abi,
      params.provider.getSigner()
    );

    const parsedValue = utils.parseUnits(params.value, 18); // always 18 for C3 tokens

    params.onStatus("userConfirmation");

    const txn = await tokenContract.approve(
      getCarbonmarkAddress(),
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

export const createListingTransaction = async (params: {
  tokenAddress: string;
  totalAmountToSell: string;
  singleUnitPrice: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const carbonmarkContract = getContract({
      contractName: "carbonmark",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation", "");

    const listingTxn = await carbonmarkContract.addListing(
      params.tokenAddress,
      utils.parseUnits(params.totalAmountToSell, 18), // C3 token
      utils.parseUnits(params.singleUnitPrice, 18), // Make sure to switch back to 6 when moving from Mumbai to Mainnet! https://github.com/Atmosfearful/bezos-frontend/issues/15
      [], // TODO batches
      [] // TODO batches price
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
  tokenAddress: string;
  totalAmountToSell: string;
  singleUnitPrice: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const carbonmarkContract = getContract({
      contractName: "carbonmark",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation", "");

    const listingTxn = await carbonmarkContract.updateListing(
      params.listingId,
      params.tokenAddress,
      utils.parseUnits(params.totalAmountToSell, 18), // C3 token
      utils.parseUnits(params.singleUnitPrice, 18), // Make sure to switch back to 6 when moving from Mumbai to Mainnet! https://github.com/Atmosfearful/bezos-frontend/issues/15
      [], // TODO batches
      [] // TODO batches price
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
  amount: string;
  price: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}): Promise<Transaction> => {
  try {
    const carbonmarkContract = getContract({
      contractName: "carbonmark",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation", "");

    const purchaseTxn = await carbonmarkContract.purchase(
      params.listingId,
      utils.parseUnits(params.amount, 18), // C3 token
      utils.parseUnits(params.price, 18) // TODO: Make sure to switch back to 6 when moving from Mumbai to Mainnet! https://github.com/Atmosfearful/bezos-frontend/issues/15
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
    const carbonmarkContract = getContract({
      contractName: "carbonmark",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation", "");

    const listingTxn = await carbonmarkContract.deleteListing(params.listingId);

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

export const getAssets = async (params: {
  assets: string[];
  userAddress: string;
}): Promise<Asset[]> => {
  try {
    const assetsData = await params.assets.reduce<Promise<Asset[]>>(
      async (resultPromise, asset) => {
        const resolvedAssets = await resultPromise;
        const contract = new ethers.Contract(
          asset,
          C3ProjectToken.abi,
          staticProvider
        );

        const promises = [
          contract.symbol(),
          contract.balanceOf(params.userAddress),
          contract.getProjectInfo(),
        ];
        const [tokenName, c3TokenBalance, projectInfo] = await Promise.all(
          promises
        );

        resolvedAssets.push({
          tokenAddress: asset,
          tokenName,
          balance: formatUnits(c3TokenBalance),
          projectName: projectInfo.name,
        });
        return resolvedAssets;
      },
      Promise.resolve([])
    );
    return assetsData;
  } catch (e) {
    throw e;
  }
};

export const getAssetsExtended = async (params: {
  assets: string[];
  userAddress: string;
}): Promise<AssetExtended[]> => {
  try {
    const assetsData = await params.assets.reduce<Promise<AssetExtended[]>>(
      async (resultPromise, asset) => {
        const resolvedAssets = await resultPromise;
        const contract = new ethers.Contract(
          asset,
          C3ProjectToken.abi,
          staticProvider
        );

        const promises = [
          contract.symbol(),
          contract.balanceOf(params.userAddress),
          contract.getProjectInfo(),
          contract.getProjectIdentifier(),
          contract.getVintage(),
        ];

        const [tokenName, c3TokenBalance, projectInfo, projectKey, vintage] =
          await Promise.all(promises);

        resolvedAssets.push({
          tokenAddress: asset,
          tokenName,
          balance: formatUnits(c3TokenBalance),
          projectId: projectInfo.project_id,
          key: projectKey,
          vintage: ethers.utils.formatUnits(vintage, 0),
          projectName: projectInfo.name,
          projectType: projectInfo.project_type,
          country: projectInfo.country,
          methodology: projectInfo.methodology,
          registry: projectInfo.registry,
          projectUrl: projectInfo.uri,
          active: projectInfo.active,
          category: getCategoryFromMethodology(projectInfo.methodology),
        });
        return resolvedAssets;
      },
      Promise.resolve([])
    );
    return assetsData;
  } catch (e) {
    throw e;
  }
};

export const getTokenBalance = async (params: {
  tokenAddress: string;
  userAddress: string;
}) => {
  const tokenContract = new Contract(
    params.tokenAddress, // TODO: replace this contract getter with getContract("<usdc>") later
    IERC20.abi,
    staticProvider
  );

  const balance = await tokenContract.balanceOf(params.userAddress);
  return formatUnits(balance); // TODO: ensure to pass 6 later for USDC
};

export const getUSDCBalance = async (params: { userAddress: string }) => {
  return getTokenBalance({
    userAddress: params.userAddress, // TODO: replace this contract getter with getContract("<usdc>") later
    tokenAddress: FAKE_USDC,
  });
};

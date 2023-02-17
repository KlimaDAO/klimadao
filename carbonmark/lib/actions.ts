import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import { addresses } from "@klimadao/lib/constants";
import { AllowancesToken } from "@klimadao/lib/types/allowances";
import { formatUnits } from "@klimadao/lib/utils";
import { Contract, ethers, providers, Transaction, utils } from "ethers";
import { getCategoryFromMethodology } from "lib/getCategoryFromMethodology";
import { getAddress } from "lib/networkAware/getAddress";
import { getContract } from "lib/networkAware/getContract";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";
import { OnStatusHandler } from "lib/statusMessage";
import { Asset, AssetExtended } from "lib/types/carbonmark";

/** Get allowance for carbonmark contract, spending an 18 decimal token. Don't use this for USDC */
export const getCarbonmarkAllowance = async (params: {
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
    getAddress("carbonmark")
  );

  return ethers.utils.formatUnits(allowance, 18);
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
    let tokenContract: Contract;
    if (params.tokenName) {
      tokenContract = getContract({
        contractName: params.tokenName,
        provider: params.signer,
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
    const parsedValue = utils.parseUnits(params.value, decimals);

    params.onStatus("userConfirmation");
    const txn = await tokenContract.approve(
      getAddress(params.spender),
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
      utils.parseUnits(params.singleUnitPrice, getTokenDecimals("usdc")),
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
      utils.parseUnits(params.singleUnitPrice, getTokenDecimals("usdc")),
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
      utils.parseUnits(params.price, getTokenDecimals("usdc"))
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
          getStaticProvider()
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
          getStaticProvider()
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

export const getUSDCBalance = async (params: { userAddress: string }) => {
  const tokenContract = getContract({
    contractName: "usdc",
    provider: getStaticProvider(),
  });
  const balance = await tokenContract.balanceOf(params.userAddress);
  return formatUnits(balance, getTokenDecimals("usdc"));
};

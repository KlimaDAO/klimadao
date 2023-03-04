import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import TCO2 from "@klimadao/lib/abi/TCO2.json";
import { addresses } from "@klimadao/lib/constants";
import { AllowancesToken } from "@klimadao/lib/types/allowances";
import { formatUnits } from "@klimadao/lib/utils";
import { Contract, ethers, providers, Transaction, utils } from "ethers";
import { getProject } from "lib/api";
import {
  createProjectIdFromAsset,
  getTokenType,
  isC3TToken,
  isTCO2Token,
} from "lib/getAssetsData";
import { getCategoryFromMethodology } from "lib/getCategoryFromMethodology";
import { getAddress } from "lib/networkAware/getAddress";
import { getContract } from "lib/networkAware/getContract";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";
import { OnStatusHandler } from "lib/statusMessage";
import { Asset, AssetForListing } from "lib/types/carbonmark";

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
  tokenType: "1" | "2";
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
      [], // TODO batches price
      params.tokenType
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

export const addProjectsToAssets = async (params: {
  assets: Asset[];
}): Promise<AssetForListing[]> => {
  try {
    const assetsData = await params.assets.reduce<Promise<AssetForListing[]>>(
      async (resultPromise, asset) => {
        const resolvedAssets = await resultPromise;

        let project: AssetForListing["project"];
        const projectId = createProjectIdFromAsset(asset);

        const projectFromApi =
          !!projectId && (await getProjectInfoFromApi(projectId));

        // project exists on API
        if (projectFromApi && projectFromApi.key) {
          project = projectFromApi;
        } else {
          // no project from API, let´s call the contract
          if (isC3TToken(asset.token.symbol)) {
            const projectFromContract = await getProjectInfoFromC3Contract(
              asset.token.id
            );
            project = projectFromContract;
          }

          if (isTCO2Token(asset.token.symbol)) {
            const projectFromContract = await getProjectInfoFromTCO2Contract(
              asset.token.id
            );
            project = projectFromContract;
          }
        }

        resolvedAssets.push({
          tokenAddress: asset.token.id,
          tokenName: asset.token.name,
          balance: ethers.utils.formatUnits(asset.amount, asset.token.decimals),
          tokenType: getTokenType(asset),
          project,
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

export const getProjectInfoFromApi = async (
  projectId: string
): Promise<AssetForListing["project"] | null> => {
  try {
    const project = await getProject({ projectId });

    return {
      key: project.key,
      projectID: project.projectID,
      name: project.name,
      methodology: project.methodology,
      vintage: project.vintage,
      category: project.category?.id || "Other",
    };
  } catch (e: any) {
    console.error("getProjectInfoFromApi Error for projectId", projectId, e);
    return null;
  }
};

export const getProjectInfoFromC3Contract = async (
  tokenAddress: string
): Promise<AssetForListing["project"] | undefined> => {
  const contract = new ethers.Contract(
    tokenAddress,
    C3ProjectToken.abi,
    getStaticProvider()
  );

  try {
    const promises = [
      contract.getProjectInfo(),
      contract.getProjectIdentifier(),
      contract.getVintage(),
    ];

    const [projectInfo, projectKey, vintage] = await Promise.all(promises);

    return {
      key: projectKey,
      projectID: projectInfo.project_id,
      name: projectInfo.name,
      methodology: projectInfo.methodology,
      vintage: ethers.utils.formatUnits(vintage, 0),
      category: getCategoryFromMethodology(projectInfo.methodology),
    };
  } catch (e: any) {
    console.error("getProjectInfoFromContract Error", e);
  }
};
/** Ethers uses the ABI to construct this response object for us */
interface ProjectAttributes {
  beneficiary: string;
  category: string;
  emissionType: string;
  method: string;
  methodology: string;
  projectId: string;
  region: string;
  standard: string;
  storageMethod: string;
  uri: string;
}
interface VintageAttributes {
  name: string; // yyyymmdd e.g. "20140701"
}

type Attributes = [ProjectAttributes, VintageAttributes];

export const getProjectInfoFromTCO2Contract = async (
  tokenAddress: string
): Promise<AssetForListing["project"] | undefined> => {
  const contract = new ethers.Contract(
    tokenAddress,
    TCO2.abi,
    getStaticProvider({ chain: "polygon" })
  );

  try {
    // https://docs.toucan.earth/toucan/dev-resources/smart-contracts/tco2#getattributes
    const [projectAttributes, vintageAttributes]: Attributes =
      await contract.getAttributes();
    return {
      key: projectAttributes.projectId,
      projectID: projectAttributes.projectId // "VCS-191" or sometimes just "191"
        .replace("VCS-", "")
        .replace("GS-", ""),
      methodology: projectAttributes.methodology,
      vintage: vintageAttributes.name.slice(0, 4), // "2023"
      category: getCategoryFromMethodology(projectAttributes.methodology),
    };
  } catch (e: any) {
    console.error("getProjectInfoFromTCO2Contract Error", e);
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

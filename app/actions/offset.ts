import { BigNumber, Contract, providers } from "ethers";
import { formatUnits as eFormatUnits, parseUnits } from "ethers-v6";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { Thunk } from "state";
import {
  setCarbonRetiredBalances,
  setProjectToken,
  updateAllowances,
} from "state/user";

import {
  addresses,
  OffsetInputToken,
  offsetInputTokens,
  RetirementToken,
  subgraphs,
} from "@klimadao/lib/constants";
import {
  createRetirementStorageContract,
  formatUnits,
  getAllowance,
  getContract,
  getRetirementTotalsAndBalances,
  getTokenDecimals,
} from "@klimadao/lib/utils";
import { OnStatusHandler } from "./utils";

import {
  ProjectTokenBalance,
  RetirementReceipt,
  RetirementTotals,
} from "@klimadao/lib/types/offset";

import { AllowancesFormatted } from "@klimadao/lib/types/allowances";

import IERC20 from "@klimadao/lib/abi/IERC20.json";

export const getRetiredOffsetBalances = (params: {
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const retired = await getRetirementTotalsAndBalances({
        address: params.address,
      });

      dispatch(setCarbonRetiredBalances(retired));
    } catch (error: any) {
      console.error(error);
    }
  };
};

export const getRetirementAllowances = (params: {
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      // create arr of promises, one for each of the above erc20s
      const promises = offsetInputTokens.reduce((arr, val) => {
        const contract = getContract({
          contractName: val,
          provider: getStaticProvider(),
        });
        arr.push(
          getAllowance({
            contract,
            address: params.address,
            spender: "retirementAggregatorV2",
            token: val,
          })
        );
        return arr;
      }, [] as Promise<AllowancesFormatted>[]);

      // await to get arr of Allowances
      const allAllowances = await Promise.all(promises);
      // reduce to match the state shape
      const allowances = allAllowances.reduce<AllowancesFormatted>(
        (obj, allowance) => {
          const [token, spender] = Object.entries(allowance)[0];
          obj[token as keyof typeof allowance] = {
            ...obj[token as keyof typeof allowance],
            ...spender,
          };
          return obj;
        },
        {} as AllowancesFormatted
      );

      dispatch(updateAllowances(allowances));
    } catch (error: any) {
      console.error("Error in getRetirementAllowances: ", error);
      throw error;
    }
  };
};

export const getOffsetConsumptionCost = async (params: {
  inputToken: OffsetInputToken;
  retirementToken: RetirementToken;
  quantity: string;
  getSpecific: boolean;
}): Promise<[string]> => {
  const retirementAggregatorContract = getContract({
    contractName: "retirementAggregatorV2",
    provider: getStaticProvider(),
  });
  const parsed = parseUnits(
    params.quantity,
    getTokenDecimals(params.retirementToken)
  );

  let sourceAmount: any;
  if (params.getSpecific) {
    sourceAmount =
      await retirementAggregatorContract.getSourceAmountSpecificRetirement(
        addresses["mainnet"][params.inputToken],
        addresses["mainnet"][params.retirementToken],
        parsed
      );
  } else {
    sourceAmount =
      await retirementAggregatorContract.getSourceAmountDefaultRetirement(
        addresses["mainnet"][params.inputToken],
        addresses["mainnet"][params.retirementToken],
        parsed
      );
  }

  return [formatUnits(sourceAmount, getTokenDecimals(params.inputToken))];
};

export type RetireCarbonTransactionResult = {
  receipt: RetirementReceipt;
  retirementTotals: ReturnType<RetirementTotals[1]["toNumber"]>;
};

export const retireCarbonTransaction = async (params: {
  address: string;
  provider: providers.JsonRpcProvider;
  inputToken: OffsetInputToken;
  maxAmountIn: string;
  retirementToken: RetirementToken;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  onStatus: OnStatusHandler;
  projectAddress: string;
}): Promise<RetireCarbonTransactionResult> => {
  enum TransferMode {
    EXTERNAL = 0,
    INTERNAL = 1,
    EXTERNAL_INTERNAL = 2,
    INTERNAL_TOLERANT = 3,
  }

  try {
    // get all current retirement totals

    const storageContract = createRetirementStorageContract(params.provider);
    const [totals]: RetirementTotals =
      await storageContract.getRetirementTotals(
        params.beneficiaryAddress || params.address
      );
    // add + 1 now as this number is only passed on if transaction succeeded
    const formattedTotals = totals.toNumber();
    const retirementTotals = formattedTotals + 1;

    // retire transaction
    const retireContract = getContract({
      contractName: "retirementAggregatorV2",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation");

    const parsedMaxAmountIn = parseUnits(
      params.maxAmountIn,
      getTokenDecimals(params.inputToken)
    );

    let txn;
    if (!!params.projectAddress) {
      txn = await retireContract.retireExactCarbonSpecific(
        addresses["mainnet"][params.inputToken],
        addresses["mainnet"][params.retirementToken],
        params.projectAddress,
        parsedMaxAmountIn,
        parseUnits(params.quantity, getTokenDecimals(params.retirementToken)),
        "",
        params.beneficiaryAddress || params.address,
        params.beneficiaryName,
        params.retirementMessage,
        TransferMode.EXTERNAL
      );
    } else {
      txn = await retireContract.retireExactCarbonDefault(
        addresses["mainnet"][params.inputToken],
        addresses["mainnet"][params.retirementToken],
        parsedMaxAmountIn,
        parseUnits(params.quantity, getTokenDecimals(params.retirementToken)),
        "",
        params.beneficiaryAddress || params.address,
        params.beneficiaryName,
        params.retirementMessage,
        TransferMode.EXTERNAL
      );
    }
    params.onStatus("networkConfirmation");
    const receipt: RetirementReceipt = await txn.wait(1);
    return { receipt, retirementTotals };
  } catch (e: any) {
    if (e.code === 4001) {
      params.onStatus("error", "userRejected");
      throw e;
    }
    params.onStatus("error");
    console.error(e);
    throw e;
  }
};
interface ProjectTokenHolding {
  token: {
    symbol: string;
    id: string; // address
  };
  amount: string; // bignumber string
}

export const approveProjectToken = async (params: {
  value: string;
  signer: providers.JsonRpcSigner;
  projectTokenAddress: string;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const contract = new Contract(
      params.projectTokenAddress,
      IERC20.abi,
      params.signer
    );
    const parsedValue = parseUnits(params.value, 18);
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(
      addresses["mainnet"].retirementAggregatorV2,
      parsedValue.toString()
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Approval was successful");
    return formatUnits(parsedValue, 18);
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

/** Use the subgraph to get balances for TCO2 and C3T, then query the allowance for each */
export const getProjectTokenBalances = (params: {
  /** User address to query */
  address: string;
}): Thunk => {
  return async (dispatch) => {
    try {
      const result = await fetch(subgraphs.polygonDigitalCarbon, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variables: {
            address: params.address.toLowerCase(),
          },
          query: `
              query Holdings($address: String) {
                account(id: $address) {
                  id
                  holdings(where: {token_: {symbol_not_in: ["BCT", "NCT", "NBO", "UBO", "MCO2"]}}) {
                    token {
                      symbol
                      id
                    }
                    amount
                  }
                }
              }
            `,
        }),
      });
      if (!result.ok) {
        const { message, name } = await result.json();
        const e = new Error(message);
        e.name = name;
      }
      const json = await result.json();
      const holdings: ProjectTokenHolding[] = json.data.account.holdings;
      // map and fetch allowance for each asset
      const allowancePromises: Promise<BigNumber>[] = holdings.map(
        async (asset) => {
          const contract = new Contract(
            asset.token.id,
            IERC20.abi,
            getStaticProvider()
          );
          return contract.allowance(
            params.address,
            addresses["mainnet"].retirementAggregatorV2
          );
        }
      );

      const rawAllowances = await Promise.all(allowancePromises);
      const allowances = rawAllowances.map((value) => formatUnits(value, 18));

      // combine with balances and set each object to redux state
      const projectTokenBalances = holdings
        .reduce<ProjectTokenBalance[]>(
          (arr, { token, amount }, i) => [
            ...arr,
            {
              address: token.id,
              quantity: eFormatUnits(amount, 18),
              symbol: token.symbol,
              allowance: allowances[i], // for performance, fetch the allowance on-the-fly when they select it in the dropdown
            },
          ],
          []
        )
        .sort((a, b) => (a.symbol > b.symbol ? 1 : -1));
      projectTokenBalances.forEach((b) => dispatch(setProjectToken(b)));
    } catch (error: any) {
      console.error(error);
    }
  };
};

export const retireProjectTokenTransaction = async (params: {
  address: string;
  symbol: string;
  projectTokenAddress: string;
  signer: providers.JsonRpcSigner;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  onStatus: OnStatusHandler;
}): Promise<RetireCarbonTransactionResult> => {
  try {
    const args = [
      params.projectTokenAddress,
      parseUnits(params.quantity, 18),
      params.beneficiaryAddress || (await params.signer.getAddress()),
      params.beneficiaryName,
      params.retirementMessage,
      0,
    ];
    // retire transaction
    const aggregator = getContract({
      contractName: "retirementAggregatorV2",
      provider: params.signer,
    });
    const method = params.symbol.startsWith("TCO2")
      ? "toucanRetireExactTCO2"
      : "c3RetireExactC3T";
    params.onStatus("userConfirmation");
    const newRetirementIndex: BigNumber = await aggregator.callStatic[method](
      ...args
    );
    const txn = await aggregator[method](...args);
    params.onStatus("networkConfirmation");
    const receipt: RetirementReceipt = await txn.wait(1);

    return {
      receipt,
      retirementTotals: newRetirementIndex.toNumber(),
    };
  } catch (e: any) {
    if (e.code === 4001) {
      params.onStatus("error", "userRejected");
      throw e;
    }
    params.onStatus("error");
    console.error(e);
    throw e;
  }
};

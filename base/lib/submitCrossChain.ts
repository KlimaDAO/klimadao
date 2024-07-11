import {
  AxelarQueryAPI,
  CHAINS,
  Environment,
} from "@axelar-network/axelarjs-sdk";
import interchainTokenService from "@klimadao/lib/abi/InterchainTokenService.json";
import retireCarbonAbi from "@klimadao/lib/abi/KlimaRetirementAggregatorV2.json";
import { OffsetInputToken, RetirementToken } from "@klimadao/lib/constants";
import { getTokenDecimals } from "@klimadao/lib/utils";
import { TxnStatus } from "components/pages/Home";
import {
  AbiCoder,
  Contract,
  Interface,
  JsonRpcProvider,
  Signer,
  formatEther,
  formatUnits,
  getDefaultProvider,
  parseEther,
  parseUnits,
} from "ethers";
import { addresses } from "./constants";

export type OnStatusHandler = (status: TxnStatus, message?: string) => void;

/* Calculate the cost to retire BCT with klima as the payment token */
export const getOffsetConsumptionCost = async (params: {
  inputToken: OffsetInputToken;
  retirementToken: RetirementToken;
  quantity: string;
}) => {
  const provider = getDefaultProvider("matic", {
    exclusive: "publicPolygon",
  }) as JsonRpcProvider;

  const contract = new Contract(
    addresses.polygon.retirementAggregatorV2,
    retireCarbonAbi.abi,
    provider
  );

  const parsed = parseUnits(
    params.quantity,
    getTokenDecimals(params.retirementToken)
  );

  const sourceAmount = await contract.getSourceAmountDefaultRetirement(
    addresses.polygon.klima,
    addresses.polygon.bct,
    parsed
  );
  return [formatUnits(sourceAmount, getTokenDecimals(params.inputToken))];
};

export function createDefaultExactRetirePayload(
  poolToken: string,
  maxAmountIn: string,
  retireAmount: string,
  retiringEntityString: string,
  beneficiaryAddress: string,
  beneficiaryString: string,
  retirementMessage: string
) {
  const iface = new Interface(retireCarbonAbi.abi);
  return iface.encodeFunctionData("retireExactCarbonDefault", [
    addresses.polygon.klima,
    poolToken,
    maxAmountIn,
    retireAmount,
    retiringEntityString,
    beneficiaryAddress,
    beneficiaryString,
    retirementMessage,
    0,
  ]);
}

export const submitCrossChain = async (props: {
  signer: Signer | undefined;
  quantity: string | undefined;
  beneficiaryAddress: string | undefined;
  maxAmountIn: string;
  retirementMessage: string;
  beneficiaryString: string;
  onStatus: OnStatusHandler;
}) => {
  if (!props.signer || !props.beneficiaryAddress || !props.quantity) {
    props.onStatus("error");
    return;
  }

  const chainName = "base";
  const destinationChainId = CHAINS.MAINNET.POLYGON; // polygon
  const api = new AxelarQueryAPI({ environment: Environment.MAINNET });

  const gasFee = await api.estimateGasFee(
    chainName,
    destinationChainId,
    1500000
  );

  const subunitAmount = parseEther("0");
  const maxAmountIn = parseUnits(props.maxAmountIn.toString(), 9);
  const retireAmount = parseEther(props.quantity);
  const formattedGasFee = formatEther(gasFee.toString());
  const totalFees = parseUnits(subunitAmount + formattedGasFee).toString();

  // Step 1: Create the retirementData for the retirement
  const retirementData = createDefaultExactRetirePayload(
    addresses.polygon.bct,
    maxAmountIn.toString(),
    retireAmount.toString(),
    "Rawr",
    props.beneficiaryAddress,
    props.beneficiaryString,
    props.retirementMessage
  );

  // Step 2: Back the rest of the data needed to process on Polygon
  const data = AbiCoder.defaultAbiCoder().encode(
    ["bytes", "uint256", "address"],
    [
      retirementData,
      maxAmountIn.toString(),
      props.beneficiaryAddress, // Refund address
    ]
  );

  // Step 3: Send the retirement to CircleSwapExecutable
  const contract = new Contract(
    addresses.base.interchainTokenService,
    interchainTokenService.abi,
    props.signer
  );

  try {
    // Step 4: Call the Axelar contract
    props.onStatus("networkConfirmation");
    const tx = await contract.callContractWithInterchainToken(
      "0xdc30a9bd9048b5a833e3f90ea281f70ae77e82018fa5b96831d3a1f563e38aaf",
      "Polygon",
      addresses.polygon.destinationHelperContract,
      maxAmountIn.toString(),
      data,
      totalFees,
      { value: totalFees }
    );
    await tx.wait(1);
    props.onStatus("done", `https://axelarscan.io/gmp/${tx.hash}`);
  } catch (error: any) {
    if (error.code === "ACTION_REJECTED") {
      props.onStatus("error", "userRejected");
      throw error;
    }
    props.onStatus("error");
    throw error;
  }
};

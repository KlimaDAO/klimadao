import {
  AxelarQueryAPI,
  CHAINS,
  Environment,
} from "@axelar-network/axelarjs-sdk";
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import interchainTokenService from "@klimadao/lib/abi/InterchainTokenService.json";
import retireCarbonAbi from "@klimadao/lib/abi/KlimaRetirementAggregatorV2.json";
import { OffsetInputToken, RetirementToken } from "@klimadao/lib/constants";
import { getTokenDecimals } from "@klimadao/lib/utils";
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

// move this to utils or constants...
const addresses = {
  polygon: {
    bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    klima: "0x4e78011ce80ee02d2c3e649fb657e45898257815",
    retirementAggregatorV2: "0x8cE54d9625371fb2a068986d32C85De8E6e995f8",
    destinationHelperContract: "0x3d5f8d9218D2943498d400439271eb87c20833Af",
  },
  base: {
    klima: "0xDCEFd8C8fCc492630B943ABcaB3429F12Ea9Fea2",
    interchainTokenService: "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C",
  },
};

// don't need this for the klima token?
export const approveToken = async (value: string, signer: Signer) => {
  try {
    const contract = new Contract(addresses.base.klima, IERC20.abi, signer);
    const parsedValue = parseUnits(value, 18);
    const txn = await contract.approve(
      addresses.polygon.retirementAggregatorV2,
      parsedValue.toString()
    );
    await txn.wait(1);
    // show confirmation message here...
    console.log("done", "Approval was successful");
    return formatUnits(parsedValue, 18);
  } catch (error: any) {
    if (error.code === 4001) {
      console.log("error", "userRejected");
      throw error;
    }
    console.error(error);
    throw error;
  }
};

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
    addresses.base.klima,
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
}) => {
  if (!props.signer || !props.beneficiaryAddress || !props.quantity) {
    // handle message properly here if params are undefined...
    return;
  }

  const chainName = "base";
  const destinationChainId = CHAINS.MAINNET.POLYGON; // polygon
  const api = new AxelarQueryAPI({ environment: Environment.MAINNET });

  const gasFee = await api.estimateGasFee(
    chainName,
    destinationChainId,
    1, // TODO Ask cujo what to do about gaslimit
    1500000
  );

  // const klimaAmount = "1000000000"; // TODO
  const subunitAmount = parseEther("0");
  const maxAmountIn = parseEther(props.maxAmountIn);
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

  // Step 4: Call the Axelar contract
  const tx = await contract
    .callContractWithInterchainToken(
      "0xdc30a9bd9048b5a833e3f90ea281f70ae77e82018fa5b96831d3a1f563e38aaf",
      "Polygon",
      addresses.polygon.destinationHelperContract, // destination helper contract
      maxAmountIn.toString(),
      data,
      totalFees,
      { value: totalFees }
    )
    .then((tx: any) => tx.wait())
    .catch((err) => console.error(err));

  console.log("Tx:", tx);
  console.log("Tx Hash:", tx.transactionHash);

  console.log(
    "Continue tracking at",
    `https://axelarscan.io/gmp/${tx.transactionHash}`
  );
};

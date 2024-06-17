import {
  AxelarQueryAPI,
  CHAINS,
  Environment,
} from "@axelar-network/axelarjs-sdk";
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import interchainTokenService from "@klimadao/lib/abi/InterchainTokenService.json";
import retireCarbonAbi from "@klimadao/lib/abi/KlimaRetirementAggregatorV2.json";
import {
  AbiCoder,
  Contract,
  Interface,
  Signer,
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
} from "ethers";

// move this to utils or constants...
const addresses = {
  polygon: {
    bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    retirementAggregatorV2: "0x8cE54d9625371fb2a068986d32C85De8E6e995f8",
    destinationHelperContract: "0x3d5f8d9218D2943498d400439271eb87c20833Af",
  },
  base: {
    klimaToken: "0xDCEFd8C8fCc492630B943ABcaB3429F12Ea9Fea2",
    interchainTokenService: "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C",
  },
};

export const approveToken = async (value: string, signer: Signer) => {
  try {
    const contract = new Contract(addresses.polygon.bct, IERC20.abi, signer);
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
    addresses.base.klimaToken,
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
  quantity: number | undefined;
  beneficiaryAddress: string | undefined;
  retirementMessage: string;
  beneficiaryString: string;
}) => {
  if (!props.signer || !props.beneficiaryAddress || !props.quantity) {
    // handle message properly here if params are undefined...
    return;
  }

  const chainName = "base";
  const destinationChain = "polygon";
  const destinationChainId = CHAINS.MAINNET.POLYGON; // polygon
  const api = new AxelarQueryAPI({ environment: Environment.MAINNET });

  const gasFee = await api.estimateGasFee(
    chainName,
    destinationChainId,
    1, // TODO Ask cujo what to do about gaslimit
    1500000
  );

  const klimaAmount = "1000000000"; // TODO
  const subunitAmount = parseEther("0");
  const formattedGasFee = formatEther(gasFee.toString());
  const totalFees = parseUnits(subunitAmount + formattedGasFee).toString();

  console.log(
    `Total fee for ${chainName} to ${destinationChain}:`,
    formattedGasFee
  );

  // Step 1: Create the retirementData for the retirement
  const retirementData = createDefaultExactRetirePayload(
    addresses.polygon.bct,
    klimaAmount,
    "2000000000000000000", // TODO
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
      klimaAmount,
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
      klimaAmount,
      data,
      totalFees,
      { value: totalFees }
    )
    .then((tx: any) => tx.wait())
    .catch((err) => console.error(err));

  console.log("Tx Hash:", tx.transactionHash);

  console.log(
    "Continue tracking at",
    `https://axelarscan.io/gmp/${tx.transactionHash}`
  );
};

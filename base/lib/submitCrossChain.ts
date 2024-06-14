import {
    AxelarQueryAPI,
    CHAINS,
    Environment,
    EvmChain,
} from "@axelar-network/axelarjs-sdk";
import { AbiCoder, Contract, Signer, formatEther, parseEther } from "ethers";

const addresses = {
  base: {
    interchainTokenService: "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C",
  },
};

export const submitCrossChain = async (props: {
  userAddress: string;
  signer: Signer;
  quantity: number;
}) => {
  const chainName = "base";
  const destinationChain = "polygon";
  const destinationChainId = CHAINS.MAINNET.POLYGON; // polygon
  const api = new AxelarQueryAPI({ environment: Environment.MAINNET });
  const fallbackRecipient = props.userAddress;

  const gasFee = await api.estimateGasFee(
    chainName,
    EvmChain.POLYGON,
    1, // TODO Ask cujo what to do about gaslimit
    2500000
  );

  console.log(
    `Total fee for ${chainName} to ${destinationChain}:`,j
    formatEther(gasFee.toString())
    // NativeToken[chainName] ??
  );
  //   const [deployer] = await getSigners();

  const subunitAmount = parseEther("0");

  // Step 1: Create the retirementData for the retirement

  const retireData = createDefaultExactRetirePayload(
    "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    "1000000000",
    "4000000000000000000",
    "Rawr",
    "0x375C1DC69F05Ff526498C8aCa48805EeC52861d5",
    "Gandalf",
    "All we have to decide is what to do with the time that is given us."
  );

  // Step 2: Back the rest of the data needed to process on Polygon

  //   const fallbackRecipient = deployer.address;

  const data = AbiCoder.defaultAbiCoder().encode(
    ["bytes", "uint256", "address"],
    [
      retireData,
      "1000000000", // Klima amount
      fallbackRecipient, // Refund address
    ]
  );

  // Step 3: Send the retirement to CircleSwapExecutable
  const contract = new Contract(
    addresses.base.interchainTokenService,
    interchainTokenService.abi,
    props.signer
  );

  const tx = await contract
    .callContractWithInterchainToken(
      "0xdc30a9bd9048b5a833e3f90ea281f70ae77e82018fa5b96831d3a1f563e38aaf",
      "Polygon",
      "0x3d5f8d9218D2943498d400439271eb87c20833Af", // destination helper contract
      BigInt(props.quantity), // TODO 18 decimal
      data,
      subunitAmount.add(gasFee),
      {
        value: subunitAmount.add(gasFee),
      }
    )
    .then((tx: any) => tx.wait());
};

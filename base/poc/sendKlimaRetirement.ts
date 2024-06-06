import {
    AxelarQueryAPI,
    Environment,
    EvmChain,
    GasToken,
} from "@axelar-network/axelarjs-sdk";
import interchainTokenService from '@klimadao/lib/abi/InterchainTokenService.json';
import retireCarbonAbi from '@klimadao/lib/abi/KlimaRetirementAggregatorV2.json';

export enum Chain {
  POLYGON = "polygon",
  BASE = "base",
}

export const GMPChainId = {
  [Chain.POLYGON]: "Polygon",
  [Chain.BASE]: "base",
};

export const NativeToken = {
  [Chain.POLYGON]: GasToken.MATIC,
  [Chain.BASE]: GasToken.ETH,
};

const klimaTokenId ='0xdc30a9bd9048b5a833e3f90ea281f70ae77e82018fa5b96831d3a1f563e38aaf'
const interchainTokenServiceAddress = '0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C' 
const interchainRetirementReceiverAddress = '0x3d5f8d9218D2943498d400439271eb87c20833Af'


export function createDefaultExactRetirePayload(
    poolToken: string,
    maxAmountIn: string,
    retireAmount: string,
    retiringEntityString: string,
    beneficiaryAddress: string,
    beneficiaryString: string,
    retirementMessage: string
){
    const iface = new ethers.utils.Interface(retireCarbonAbi.abi)

    const retirePayload = iface.encodeFunctionData('retireExactCarbonDefault', [
       ,
        poolToken,
        maxAmountIn,
        retireAmount,
        retiringEntityString,
        beneficiaryAddress,
        beneficiaryString,
        retirementMessage,
        0
    ])

    return retirePayload

}

async function crossChainRetire() {

    const chainName = 'base' as Chain;
    const destinationChain = 'polygon';

    const destinationChainId = GMPChainId[destinationChain as Chain];
    const api = new AxelarQueryAPI({ environment: Environment.MAINNET });
    const gasFee = await api.estimateGasFee(
      chainName as unknown as EvmChain,
      destinationChainId as unknown as EvmChain,
      NativeToken[chainName],
      1500000
    );

    const subunitAmount = ethers.utils.parseEther('0');
    const klimaAmount = '1000000000'

    // Step 1: Create the retirementData for the retirement

    const retireData = createDefaultExactRetirePayload(
      '0x2f800db0fdb5223b3c3f354886d907a671414a7f',
      klimaAmount,
      '3000000000000000000',
      'Rawr',
      '0x375C1DC69F05Ff526498C8aCa48805EeC52861d5',
      'Gandalf',
      "All we have to decide is what to do with the time that is given us."
    )
    
    const fallbackRecipient = deployer.address;

    const data = ethers.utils.defaultAbiCoder.encode(
        ["bytes", "uint256","address"],
        [
            retireData,
            klimaAmount,
            fallbackRecipient
        ]
    )


    const contract = new ethers.Contract(
      interchainTokenServiceAddress,
      interchainTokenService.abi,
      deployer
    );

    console.log(destinationChainId)
    console.log(retireData)
    // console.log(traceId)
    console.log(fallbackRecipient)
    console.log(subunitAmount.add(gasFee))
    console.log(data)
    const tx = await contract.callContractWithInterchainToken(
        klimaTokenId,
        GMPChainId['polygon'],
        interchainRetirementReceiverAddress, // destination
       klimaAmount,
       data,
       subunitAmount.add(gasFee),
           {
               value: subunitAmount.add(gasFee)
           }
    )
    .then((tx: any) => tx.wait());

    console.log("Tx Hash:", tx.transactionHash);

    console.log(
      "Continue tracking at",
      `https://axelarscan.io/gmp/${tx.transactionHash}`
    );
}

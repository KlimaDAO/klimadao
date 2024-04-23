import { Address, BigInt } from '@graphprotocol/graph-ts'
import { Token } from '../../generated/schema'
import { ERC20 } from '../../generated/ToucanFactory/ERC20'
import { ICRProjectToken } from '../../generated/ICRCarbonContractRegistry/ICRProjectToken'
export function createTokenWithCall(tokenAddress: Address): void {
  let token = Token.load(tokenAddress)
  if (token) return

  token = new Token(tokenAddress)

  let tokenContract = ERC20.bind(tokenAddress)

  token.name = tokenContract.name()
  token.symbol = tokenContract.symbol()
  token.decimals = tokenContract.decimals()
  token.save()
}

// this doesn't really matter at this stage as holdings are being fetched from the ICR subgraph
export function createICRTokenWithCall(tokenAddress: Address, tokenId: BigInt): void {
  let token = Token.load(tokenAddress)
  if (token) return

  token = new Token(tokenAddress)

  let tokenContract = ICRProjectToken.bind(tokenAddress)
  const serialization = tokenContract.exPostVintageMapping(tokenId)
  const symbol = serialization.value0 + "-" + serialization.value3 + "-" + serialization.value4;

  token.name = tokenContract.projectName()
  token.symbol = symbol
  token.decimals = 18;


  token.save()
}

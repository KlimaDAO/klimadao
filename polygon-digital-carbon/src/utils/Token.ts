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

export function createICRTokenWithCall(tokenAddress: Address): void {
  let token = Token.load(tokenAddress)
  if (token) return

  token = new Token(tokenAddress)

  let tokenContract = ICRProjectToken.bind(tokenAddress)
  const topTokenId = tokenContract.topTokenId()

  for (let i = 1; i < topTokenId.toI32(); i++) {
    let tokenId: BigInt

    const isExPost = tokenContract.isExPostToken(BigInt.fromI32(i))

    // if it's not exPost it's an exAnte. Get the equivalent exPost for the corresponding exAnte info
    if (!isExPost) {
      const exPostTokenId = tokenContract.exAnteToExPostTokenId(BigInt.fromI32(i))
      tokenId = exPostTokenId
    } else {
      tokenId = BigInt.fromI32(i)
    }

    const serialization = tokenContract.exPostVintageMapping(tokenId)
    const symbol = serialization.value0 + '-' + serialization.value3.toString() + '-' + serialization.value4.toString()

    token.name = tokenContract.projectName()
    token.symbol = symbol
    token.decimals = 18
    token.tokenId = BigInt.fromI32(i)

    token.save()
  }
}

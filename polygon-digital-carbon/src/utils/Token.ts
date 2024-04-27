import { Address, BigInt, Bytes, log, ByteArray } from '@graphprotocol/graph-ts'
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

export function createICRTokenID(tokenAddress: Address, tokenId: BigInt): Bytes {
  return tokenAddress.concatI32(tokenId.toI32())
}

export function createICRTokenWithCall(tokenAddress: Address, tokenId: BigInt): void {
  log.info('Creating ICR Tokens for token address {}', [tokenAddress.toHexString()])

  let tokenContract = ICRProjectToken.bind(tokenAddress)

  const isExPost = tokenContract.isExPostToken(tokenId)

  let exPostTokenId: BigInt

  // if it's not exPost it's an exAnte. Get the equivalent exPost for the corresponding exAnte info
  if (!isExPost) {
    const exPostId = tokenContract.exAnteToExPostTokenId(tokenId)
    exPostTokenId = exPostId
  } else {
    exPostTokenId = tokenId
  }

  const id = createICRTokenID(tokenAddress, tokenId)

  let token = Token.load(id)

  if (token == null) {
    log.info('New ICR Token created with id {}', [id.toHexString()])
    token = new Token(id)

    const mappingValues = tokenContract.exPostVintageMapping(exPostTokenId)

    const serializationParts = mappingValues.value0.split('-')

    const symbol =
      'ICR' +
      '-' +
      serializationParts[3].toString() +
      '-' +
      serializationParts[serializationParts.length - 1].toString()

    token.name = tokenContract.projectName()

    token.symbol = symbol
    token.decimals = 18
    token.tokenId = tokenId

    token.save()
  }
}

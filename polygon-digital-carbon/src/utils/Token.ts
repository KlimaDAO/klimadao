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
  const tokenIdBytes = ByteArray.fromBigInt(tokenId)

  const addressBytes = ByteArray.fromHexString(tokenAddress.toHexString())

  const combinedByteArray = addressBytes.concat(tokenIdBytes)

  const combinedBytes = Bytes.fromUint8Array(combinedByteArray)
  return combinedBytes
}

export function createICRTokenWithCall(tokenAddress: Address): void {
  log.info('Creating ICR Tokens for token address {}', [tokenAddress.toHexString()])

  let tokenContract = ICRProjectToken.bind(tokenAddress)
  const topTokenId = tokenContract.topTokenId()

  for (let i = 1; i < topTokenId.toI32(); i++) {
    log.info('Looping through tokenIds. Index: {}', [i.toString()])

    let tokenId: BigInt

    const isExPost = tokenContract.isExPostToken(BigInt.fromI32(i))

    // if it's not exPost it's an exAnte. Get the equivalent exPost for the corresponding exAnte info
    if (!isExPost) {
      const exPostTokenId = tokenContract.exAnteToExPostTokenId(BigInt.fromI32(i))
      tokenId = exPostTokenId
    } else {
      tokenId = BigInt.fromI32(i)
    }

    const id = createICRTokenID(tokenAddress, tokenId)

    let token = Token.load(id)

    if (token != null) {
      log.info('found ICR Token entity {}', [id.toHexString()])
    }

    if (token == null) {
      log.info('New ICR Token created with id {}', [id.toHexString()])
      token = new Token(id)

      const mappingValues = tokenContract.exPostVintageMapping(tokenId)
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
      token.tokenId = BigInt.fromI32(i)

      token.save()
    }
  }
}

import { Address, BigInt, Bytes, log, BigDecimal } from '@graphprotocol/graph-ts'
import { Token } from '../../generated/schema'
import { ERC20 } from '../../generated/ToucanFactory/ERC20'
import { ICRProjectToken } from '../../generated/ICRCarbonContractRegistry/ICRProjectToken'
import { USDC_ERC20_CONTRACT } from '../../../lib/utils/Constants'
import { ZERO_BD, ZERO_BI } from '../../../lib/utils/Decimals'

export function createTokenWithCall(tokenAddress: Address): void {
  let token = Token.load(tokenAddress)
  if (token) return

  token = new Token(tokenAddress)

  let tokenContract = ERC20.bind(tokenAddress)
  
  token.tokenAddress = tokenAddress
  token.name = tokenContract.name()
  token.symbol = tokenContract.symbol()
  token.decimals = tokenContract.decimals()
  token.isExAnte = false
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

    token.name = `ICR: ${symbol}`
    token.tokenAddress = tokenAddress
    token.symbol = symbol
    token.decimals = 18
    token.tokenId = tokenId
    token.isExAnte = !isExPost

    token.save()
  }
}

export function loadOrCreateToken(tokenAddress: Address): Token {
  let token = Token.load(tokenAddress)
  log.debug('Loading token {}', [tokenAddress.toHexString()])
  if (token == null) {
    let tokenContract = ERC20.bind(tokenAddress)
    token = new Token(tokenAddress)

    let nameCall = tokenContract.try_name()
    if (nameCall.reverted) token.name = ''
    else token.name = nameCall.value

    let symbolCall = tokenContract.try_symbol()
    if (symbolCall.reverted) token.symbol = ''
    else token.symbol = symbolCall.value

    let decimalCall = tokenContract.try_decimals()
    if (decimalCall.reverted) token.decimals = 18 // Default to 18 decimals
    else token.decimals = decimalCall.value

    token.tokenAddress = tokenAddress
    token.latestPriceUSD = tokenAddress == USDC_ERC20_CONTRACT ? BigDecimal.fromString('1') : ZERO_BD
    token.latestPriceUSDUpdated = ZERO_BI
    token.latestPricePerKLIMA = ZERO_BD
    token.latestPricePerKLIMAUpdated = ZERO_BI
    token.isExAnte = false

    token.save()
  }
  return token as Token
}

import { Address, BigDecimal, log } from '@graphprotocol/graph-ts'
import { ERC20 } from '../generated/ERC20'
import { Token } from '../generated/schema'
import { USDC_ERC20_CONTRACT } from './Constants'
import { ZERO_BD, ZERO_BI } from './Decimals'

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

    token.latestPriceUSD = tokenAddress == USDC_ERC20_CONTRACT ? BigDecimal.fromString('1') : ZERO_BD
    token.latestPriceUSDUpdated = ZERO_BI
    token.latestPricePerKLIMA = ZERO_BD
    token.latestPricePerKLIMAUpdated = ZERO_BI

    token.save()
  }
  return token as Token
}

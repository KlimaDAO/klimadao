import { Address } from '@graphprotocol/graph-ts'
import { Token } from '../../generated/schema'
import { ERC20 } from '../../generated/ToucanFactory/ERC20'

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

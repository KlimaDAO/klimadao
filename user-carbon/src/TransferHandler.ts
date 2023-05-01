import { ZERO_ADDRESS } from '../../lib/utils/Constants'
import { Transfer } from '../generated/BCT/ERC20'
import { HoldingsUtils } from './utils/Holdings'
import { TokenFactory } from '../../lib/tokens/TokenFactory'

export function handleTransfer(event: Transfer): void {
  const token = new TokenFactory().getTokenForAddress(event.address)
  if (event.params.from != ZERO_ADDRESS) {
    HoldingsUtils.updateHolding(token, event.block.timestamp, event.params.from)
  }
  if (event.params.to != ZERO_ADDRESS) {
    HoldingsUtils.updateHolding(token, event.block.timestamp, event.params.to)
  }
}

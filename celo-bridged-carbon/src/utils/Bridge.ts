import { BigDecimal } from '@graphprotocol/graph-ts'
import { Bridge, CarbonOffset, Transaction } from '../../generated/schema'

export function loadOrCreateBridge(offset: CarbonOffset, transaction: Transaction): Bridge {
  let id = transaction.timestamp.toString() + offset.tokenAddress

  let bridge = Bridge.load(id)
  if (bridge == null) {
    bridge = new Bridge(id)
    bridge.timestamp = transaction.timestamp
    bridge.transaction = transaction.id
    bridge.offset = offset.id
    bridge.value = BigDecimal.fromString('0')
    bridge.bridger = ''
  }

  return bridge as Bridge
}

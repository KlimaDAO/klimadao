import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { CrosschainBridge, Transaction } from '../../generated/schema'

export function loadOrCreateCrosschainBridge(poolId: string, transaction: Transaction): CrosschainBridge {
  let id = transaction.timestamp.toString() + poolId

  let crosschainBridge = CrosschainBridge.load(id)
  if (crosschainBridge == null) {
    crosschainBridge = new CrosschainBridge(id)
    crosschainBridge.timestamp = transaction.timestamp
    crosschainBridge.transaction = transaction.id
    crosschainBridge.pool = poolId
    crosschainBridge.value = BigDecimal.zero()
    crosschainBridge.bridger = ''
  }

  return crosschainBridge as CrosschainBridge
}

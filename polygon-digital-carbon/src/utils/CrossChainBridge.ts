import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { CrossChainBridge } from '../../generated/schema'

export function saveCrossChainPoolBridge(
  id: Bytes,
  hash: Bytes,
  pool: Address,
  amount: BigInt,
  bridger: Address,
  direction: string,
  timestamp: BigInt
): void {
  let bridge = new CrossChainBridge(id)
  bridge.hash = hash
  bridge.pool = pool
  bridge.amount = amount
  bridge.bridger = bridger
  bridge.direction = direction
  bridge.timestamp = timestamp
  bridge.save()
}

export function saveCrossChainCreditBridge(
  id: Bytes,
  hash: Bytes,
  credit: Address,
  amount: BigInt,
  bridger: Address,
  direction: string,
  timestamp: BigInt
): void {
  let bridge = new CrossChainBridge(id)
  bridge.hash = hash
  bridge.credit = credit
  bridge.amount = amount
  bridge.bridger = bridger
  bridge.direction = direction
  bridge.timestamp = timestamp
  bridge.save()
}

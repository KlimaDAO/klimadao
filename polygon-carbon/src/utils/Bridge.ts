import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { Bridge } from '../../generated/schema'

export function saveBridge(
  hash: Bytes,
  logIndex: i32,
  offset: Address,
  account: Address,
  amount: BigInt,
  timestamp: BigInt
): void {
  let bridge = new Bridge(hash.concatI32(logIndex))
  bridge.hash = hash
  bridge.offset = offset
  bridge.account = account
  bridge.amount = amount
  bridge.timestamp = timestamp
  bridge.save()
}

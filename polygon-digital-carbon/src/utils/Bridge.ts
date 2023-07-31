import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { Bridge } from '../../generated/schema'

export function saveBridge(
  hash: Bytes,
  logIndex: i32,
  credit: Address,
  account: Address,
  amount: BigInt,
  timestamp: BigInt
): void {
  let bridge = new Bridge(hash.concatI32(logIndex))
  bridge.credit = credit
  bridge.account = account
  bridge.amount = amount
  bridge.timestamp = timestamp
  bridge.save()
}

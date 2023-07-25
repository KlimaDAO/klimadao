import { Address, BigInt } from '@graphprotocol/graph-ts'
import { loadCarbonOffset } from './CarbonOffset'
import { CarbonOffsetSnapshot } from '../../generated/schema'

export function recordCarbonOffsetSnapshot(token: Address, epoch: BigInt, timestamp: BigInt): void {
  let offset = loadCarbonOffset(token)

  let snapshot = new CarbonOffsetSnapshot(token.concatI32(epoch.toI32()))
  snapshot.offset = token
  snapshot.epoch = epoch
  snapshot.totalSupply = offset.currentSupply.plus(offset.crossChainSupply)
  snapshot.createdAt = timestamp
  snapshot.save()
}

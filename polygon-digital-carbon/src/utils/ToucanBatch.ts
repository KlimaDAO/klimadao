import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ToucanBatch } from '../../generated/schema'

export function loadOrCreateToucanBatch(id: BigInt): ToucanBatch {
  let batch = ToucanBatch.load(id.toString())
  if (batch == null) {
    batch = new ToucanBatch(id.toString())
    batch.registrySerialNumbers = []
    batch.creationTransactionHash = Bytes.fromI32(0)
    batch.save()
  }
  return batch
}

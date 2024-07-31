import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ToucanBatch } from '../../generated/schema'

export function loadOrCreateToucanBatch(batchId: BigInt): ToucanBatch {
  let batch = ToucanBatch.load(batchId.toString())
  if (batch == null) {
    batch = new ToucanBatch(batchId.toString())
    batch.registrySerialNumbers = []
    batch.creationTransactionHash = Bytes.fromI32(0)
    batch.save()
  }
  return batch as ToucanBatch
}


import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ToucanBatch, ToucanBridgeRequest } from '../../generated/schema'

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

export function loadOrCreateToucanBridgeRequest(requestId: BigInt): ToucanBridgeRequest {
  let request = ToucanBridgeRequest.load(requestId.toString())
  if (request == null) {
    request = new ToucanBridgeRequest(requestId.toString())
    request.status = 'REQUESTED'
    request.save()
  }
  return request as ToucanBridgeRequest
}

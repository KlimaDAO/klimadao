import { BatchMinted, BatchUpdated, Transfer } from '../generated/ToucanOffsetBatch/CarbonOffsetBatches'
import { CarbonOffset } from '../generated/schema'
import { loadOrCreateToucanBatch } from './utils/ToucanBatch'

export function handleBatchMinted(event: BatchMinted): void {
  let batch = loadOrCreateToucanBatch(event.params.tokenId)
  batch.creationTransactionHash = event.transaction.hash
  batch.save()
}

export function handleBatchUpdated(event: BatchUpdated): void {
  let batch = loadOrCreateToucanBatch(event.params.tokenId)
  // Toucan emits a comma delimited list of serials for batches with more than one included
  let serials = event.params.serialNumber.split(',')
  batch.registrySerialNumbers = serials
  batch.save()
}

export function handleTransfer(event: Transfer): void {
  let offset = CarbonOffset.load(event.params.to)

  // Update the offset for the latest fractionalization.
  // The order is the following:
  // Token created
  // Batch sent to token
  // ERC20s transfered to caller
  if (offset != null) {
    offset.lastBatchId = event.params.tokenId
    offset.save()
  }
}

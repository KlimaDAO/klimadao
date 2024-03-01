import { BatchMinted, BatchUpdated, Transfer } from '../generated/ToucanCarbonOffsetBatch/ToucanCarbonOffsetBatches'
import { CarbonCredit } from '../generated/schema'
import { loadOrCreateToucanBatch } from './utils/Toucan'

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

export function handleBatchTransfer(event: Transfer): void {
  let offset = CarbonCredit.load(event.params.to)

  // Don't update transfer to non-credit addresses
  if (offset == null) return

  /** Update the credit for the latest fractionalization.
   * The order is the following:
   * Token created
   * Batch sent to token
   * ERC20s transfered to caller
   */

  offset.lastBatchId = event.params.tokenId
  offset.save()
}

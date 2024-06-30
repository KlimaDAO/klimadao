import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ProvenanceRecord } from '../../generated/schema'
import { loadCarbonCredit } from './CarbonCredit'
import { loadOrCreateHolding } from './Holding'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { loadOrCreateToucanBatch } from './ToucanBatch'
import { ZERO_ADDRESS } from '../../../lib/utils/Constants'
import { CarbonProject } from '../../generated/schema'

function processBatchOfRecords(batch: Bytes[]): Bytes[] {
  let processedRecords: Bytes[] = []

  for (let i = 0; i < batch.length; i++) {
    let priorRecordId = batch[i]
    let priorRecord = ProvenanceRecord.load(priorRecordId)
    if (priorRecord) {
      processedRecords.push(priorRecordId)
    }
  }

  return processedRecords
}

export function recordProvenance(
  hash: Bytes,
  tokenAddress: Address,
  tokenId: BigInt | null,
  sender: Address,
  receiver: Address,
  recordType: string,
  amount: BigInt,
  timestamp: BigInt
): void {
  let creditId =
    tokenId !== null
      ? Bytes.fromHexString(tokenAddress.toHexString()).concatI32(tokenId.toI32())
      : Bytes.fromHexString(tokenAddress.toHexString())

  let credit = loadCarbonCredit(creditId)
  let id = creditId.concat(receiver).concatI32(credit.provenanceCount)
  let record = new ProvenanceRecord(id)
  record.token = tokenAddress
  record.tokenId = tokenId
  record.transactionHash = hash
  record.transactionType = recordType
  record.registrySerialNumbers = []
  record.priorRecords = []
  record.sender = sender
  record.receiver = receiver
  record.originalAmount = amount
  record.remainingAmount = amount
  record.createdAt = timestamp
  record.updatedAt = timestamp
  record.save()

  let senderHolding = loadOrCreateHolding(sender, tokenAddress, tokenId)
  let receiverHolding = loadOrCreateHolding(receiver, tokenAddress, tokenId)

  let senderActiveRecords = senderHolding.activeProvenanceRecords

  let receiverActiveRecords = receiverHolding.activeProvenanceRecords
  let receiverHistoryRecords = receiverHolding.historicalProvenanceRecords

  let recordPriorRecords = record.priorRecords

  receiverActiveRecords.push(record.id)
  receiverHistoryRecords.push(record.id)

  receiverHolding.activeProvenanceRecords = receiverActiveRecords
  receiverHolding.historicalProvenanceRecords = receiverHistoryRecords
  receiverHolding.save()

  if (recordType == 'ORIGINATION') {
    if (credit.bridgeProtocol == 'TOUCAN') {
      let batch = loadOrCreateToucanBatch(credit.lastBatchId)
      record.registrySerialNumbers = batch.registrySerialNumbers
      record.save()
    }
  } else {
    let remainingAmount = amount

    while (remainingAmount > ZERO_BI && senderActiveRecords.length > 0) {
      let priorRecord = ProvenanceRecord.load(senderActiveRecords[0])

      if (priorRecord == null) break

      if (priorRecord.remainingAmount > remainingAmount) {
        // Transfered fewer than the available credits

        recordPriorRecords.push(priorRecord.id)
        priorRecord.remainingAmount = priorRecord.remainingAmount.minus(remainingAmount)
        remainingAmount = ZERO_BI
      } else if (priorRecord.remainingAmount == remainingAmount) {
        // Transferred the exact number of credits from prior record

        recordPriorRecords.push(priorRecord.id)
        priorRecord.remainingAmount = ZERO_BI
        remainingAmount = ZERO_BI

        // Remove the record from the active list
        senderActiveRecords.shift()
      } else {
        // Transferred more than the number of credits from prior record

        recordPriorRecords.push(priorRecord.id)
        remainingAmount = remainingAmount.minus(priorRecord.remainingAmount)
        priorRecord.remainingAmount = ZERO_BI

        // Remove the record from the active list
        senderActiveRecords.shift()
      }

      // Pull in the previous prior records. This allows the final provenance record to have the full
      // custody chain rather than having to traverse until origination
      let priorRecordIds = priorRecord.priorRecords
      let batchSize = 20

      for (let i = 0; i < priorRecordIds.length; i += batchSize) {
        let batch = priorRecordIds.slice(i, i + batchSize)
        let processedBatch = processBatchOfRecords(batch)

        for (let j = 0; j < processedBatch.length; j++) {
          recordPriorRecords.push(processedBatch[j])
        }
      }

      record.priorRecords = recordPriorRecords
      record.save()
      priorRecord.save()
    }
  }

  senderHolding.activeProvenanceRecords = senderActiveRecords
  senderHolding.save()
}

export function updateProvenanceForRetirement(creditId: Bytes): Bytes | null {
  let credit = loadCarbonCredit(creditId)
  let project = CarbonProject.load(credit.project)

  if (project == null) return null

  /** C3 ECO_REGISTRY and J_CREDIT credits are two-step async retirements.
   * The tokens are transferred back to the contract and then retired from there by an admin */
  let id =
    project.registry == 'J_CREDIT' || project.registry == 'ECO_REGISTRY'
      ? creditId.concat(Address.fromHexString(credit.tokenAddress.toHexString())).concatI32(credit.provenanceCount - 1)
      : creditId.concat(ZERO_ADDRESS).concatI32(credit.provenanceCount - 1)
  let record = ProvenanceRecord.load(id)
  if (record == null) {
    return null
  }

  record.transactionType = 'RETIREMENT'
  record.save()
  return record.id
}

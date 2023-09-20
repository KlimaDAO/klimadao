import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ProvenanceRecord } from '../../generated/schema'
import { loadCarbonCredit } from './CarbonCredit'
import { loadOrCreateHolding } from './Holding'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { loadOrCreateToucanBatch } from './ToucanBatch'

export function recordProvenance(
  hash: Bytes,
  token: Address,
  sender: Address,
  receiver: Address,
  recordType: string,
  amount: BigInt,
  timestamp: BigInt
): void {
  let credit = loadCarbonCredit(token)
  let id = token.concat(receiver).concatI32(credit.provenanceCount)
  let record = new ProvenanceRecord(id)
  record.token = token
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

  let senderHolding = loadOrCreateHolding(sender, token)
  let receiverHolding = loadOrCreateHolding(receiver, token)

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
      for (let i = 0; i < priorRecord.priorRecords.length; i++) {
        recordPriorRecords.push(priorRecord.priorRecords[i])
      }

      record.priorRecords = recordPriorRecords
      record.save()
      priorRecord.save()
    }
  }

  senderHolding.activeProvenanceRecords = senderActiveRecords
  senderHolding.save()
}

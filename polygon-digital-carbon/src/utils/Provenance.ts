import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ProvenanceRecord } from '../../generated/schema'
import { loadCarbonOffset } from './CarbonCredit'
import { loadOrCreateHolding } from './Holding'
import { ZERO_BI } from '../../../lib/utils/Decimals'

export function recordProvenance(
  hash: Bytes,
  token: Address,
  sender: Address,
  receiver: Address,
  recordType: string,
  amount: BigInt,
  timestamp: BigInt
): void {
  let offset = loadCarbonOffset(token)
  let id = token.concat(receiver).concatI32(offset.provenanceCount)
  let record = ProvenanceRecord.load(id)
  if (record == null) {
    record = new ProvenanceRecord(id)
    record.token = token
    record.transactionHash = hash
    record.transactionType = recordType
    record.priorRecords = []
    record.sender = sender
    record.receiver = receiver
    record.originalAmount = amount
    record.remainingAmount = amount
    record.createdAt = timestamp
    record.updatedAt = timestamp
    record.save()

    offset.provenanceCount += 1
    offset.save()
  }

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

  // Update records and lists if not an origination
  if (recordType != 'ORIGINATION') {
    let remainingAmount = amount

    while (remainingAmount > ZERO_BI && senderActiveRecords.length > 0) {
      let priorRecord = ProvenanceRecord.load(senderActiveRecords[0])

      if (priorRecord == null) return

      if (priorRecord.remainingAmount >= remainingAmount) {
        recordPriorRecords.push(priorRecord.id)
        priorRecord.remainingAmount = priorRecord.remainingAmount.minus(remainingAmount)
        remainingAmount = ZERO_BI
      } else {
        recordPriorRecords.push(priorRecord.id)
        remainingAmount = remainingAmount.minus(priorRecord.remainingAmount)
        priorRecord.remainingAmount = ZERO_BI

        // Remove the record from the active list
        senderActiveRecords.shift()
      }
      record.priorRecords = recordPriorRecords
      record.save()
      priorRecord.save()
    }
  }

  senderHolding.activeProvenanceRecords = senderActiveRecords
  senderHolding.save()
}

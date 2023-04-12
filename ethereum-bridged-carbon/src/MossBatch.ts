import { CreateBatchCall } from '../generated/MossBatch/MossBatch'
import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateTransaction } from './utils/Transactions'
import { Batch } from '../generated/schema'

export function handleBatchCall(call: CreateBatchCall): void {
  let transaction = loadOrCreateTransaction(call.transaction, call.block)

  let id = transaction.timestamp.toString() + call.inputs._serialNumber

  let batch = Batch.load(id)
  if (batch == null) {
    batch = new Batch(id)
    batch.serialNumber = call.inputs._serialNumber
    batch.projectID = call.inputs._projectId
    batch.vintage = call.inputs._vintage
    batch.creditType = call.inputs._creditType
    batch.value = toDecimal(call.inputs._units, 18)
    batch.tokenAddress = call.inputs._token.toHex()
    batch.broker = call.inputs._broker.toHex()
    batch.originaltx = call.inputs._originalTx.toHex()
    batch.timestamp = transaction.timestamp
    batch.transaction = transaction.id
  }

  batch.save()
}

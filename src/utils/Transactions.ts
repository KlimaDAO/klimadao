import { ethereum } from '@graphprotocol/graph-ts'
// schema imports
import { Transaction } from "../../generated/schema"

export function loadOrCreateTransaction(eth_transaction: ethereum.Transaction, eth_block: ethereum.Block): Transaction {
  let transaction = Transaction.load(eth_transaction.hash.toHex())
  if (transaction == null) {
    transaction = new Transaction(eth_transaction.hash.toHex())
    transaction.timestamp = eth_block.timestamp
    transaction.blockNumber = eth_block.number
    transaction.blockHash = eth_block.hash
    transaction.from = eth_transaction.from
    transaction.to = eth_transaction.to
    transaction.value = eth_transaction.value
    //transaction.gasUsed = eth_transaction.gasUsed
    transaction.gasPrice = eth_transaction.gasPrice
    transaction.save()
  }
  return transaction as Transaction
}

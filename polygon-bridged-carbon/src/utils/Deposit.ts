import { BigDecimal, Bytes } from '@graphprotocol/graph-ts'
import { Deposit, CarbonOffset, Transaction } from '../../generated/schema'

export function loadOrCreateDeposit(offset: CarbonOffset, transaction: Transaction): Deposit {
  let id = transaction.timestamp.toString() + offset.tokenAddress

  let deposit = Deposit.load(id)
  if (deposit == null) {
    deposit = new Deposit(id)
    deposit.timestamp = transaction.timestamp
    deposit.transaction = transaction.id
    deposit.offset = offset.id
    deposit.value = BigDecimal.fromString('0')
    deposit.depositor = ''
    deposit.pool = ''
  }

  return deposit as Deposit
}

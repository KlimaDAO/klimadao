import { BigDecimal } from '@graphprotocol/graph-ts'
import { Retire, CarbonOffset, Transaction } from '../../generated/schema'

export function loadOrCreateRetire(offset: CarbonOffset, transaction: Transaction): Retire {
  let id = transaction.timestamp.toString() + offset.tokenAddress

  let retire = Retire.load(id)
  if (retire == null) {
    retire = new Retire(id)
    retire.timestamp = transaction.timestamp
    retire.transaction = transaction.id
    retire.offset = offset.id
    retire.value = BigDecimal.fromString('0')
    retire.beneficiary = ''
    retire.retiree = ''
  }

  return retire as Retire
}

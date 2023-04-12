import { BigDecimal } from '@graphprotocol/graph-ts'
import { KlimaRetire, CarbonOffset, Transaction } from '../../generated/schema'

export function loadOrCreateKlimaRetire(offset: CarbonOffset, transaction: Transaction): KlimaRetire {
  let id = transaction.timestamp.toString() + offset.tokenAddress

  let retire = KlimaRetire.load(id)
  if (retire == null) {
    retire = new KlimaRetire(id)
    retire.timestamp = transaction.timestamp
    retire.transaction = transaction.id
    retire.offset = offset.id
    retire.amount = BigDecimal.fromString('0')
    retire.retiringAddress = ''
    retire.beneficiary = ''
    retire.beneficiaryAddress = ''
    retire.retirementMessage = ''
    retire.specific = false
  }

  return retire as KlimaRetire
}

export function loadKlimaRetire(transaction: Transaction): KlimaRetire | null {
  return KlimaRetire.load(transaction.id)
}

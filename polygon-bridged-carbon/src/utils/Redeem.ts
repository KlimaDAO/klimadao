import { BigDecimal, Bytes } from '@graphprotocol/graph-ts'
import { Redeem, CarbonOffset, Transaction } from '../../generated/schema'

export function loadOrCreateRedeem(offset: CarbonOffset, transaction: Transaction): Redeem {
  let id = transaction.timestamp.toString() + offset.tokenAddress

  let redeem = Redeem.load(id)
  if (redeem == null) {
    redeem = new Redeem(id)
    redeem.timestamp = transaction.timestamp
    redeem.transaction = transaction.id
    redeem.offset = offset.id
    redeem.value = BigDecimal.fromString('0')
    redeem.redeemer = ''
    redeem.pool = ''
  }

  return redeem as Redeem
}

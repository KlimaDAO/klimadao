import { BigInt } from '@graphprotocol/graph-ts'
import { ToucanCertificate, Transaction } from '../../generated/schema'

export function loadOrCreateToucanCertificate(transaction: Transaction): ToucanCertificate {
  let id = transaction.id

  let toucanCertificate = ToucanCertificate.load(id)
  if (toucanCertificate == null) {
    toucanCertificate = new ToucanCertificate(id)
    toucanCertificate.timestamp = transaction.timestamp
    toucanCertificate.transaction = id
    toucanCertificate.tokenID = BigInt.zero()
  }

  return toucanCertificate as ToucanCertificate
}

export function loadToucanCertificate(transaction: Transaction): ToucanCertificate | null {
  return ToucanCertificate.load(transaction.id)
}

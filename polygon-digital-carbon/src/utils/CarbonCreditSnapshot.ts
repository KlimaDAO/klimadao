import { Address, BigInt } from '@graphprotocol/graph-ts'
import { loadCarbonCredit } from './CarbonCredit'
import { CarbonCreditSnapshot } from '../../generated/schema'

export function recordCarbonCreditSnapshot(token: Address, epoch: BigInt, timestamp: BigInt): void {
  let credit = loadCarbonCredit(token)

  let snapshot = new CarbonCreditSnapshot(token.concatI32(epoch.toI32()))
  snapshot.credit = token
  snapshot.epoch = epoch
  snapshot.totalSupply = credit.currentSupply.plus(credit.crossChainSupply)
  snapshot.createdAt = timestamp
  snapshot.save()
}

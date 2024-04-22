import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { loadCarbonCredit } from './CarbonCredit'
import { CarbonCreditSnapshot, Epoch } from '../../generated/schema'
import { MCO2_ERC20_CONTRACT } from '../../../lib/utils/Constants'

export function recordCarbonCreditSnapshot(
  creditId: Bytes,
  epochNumber: BigInt,
  timestamp: BigInt,
  epoch: Epoch
): Epoch {
  let credit = loadCarbonCredit(creditId)

  let snapshot = new CarbonCreditSnapshot(creditId.concatI32(epochNumber.toI32()))
  snapshot.credit = creditId
  snapshot.epoch = epochNumber
  snapshot.currentSupply = credit.currentSupply
  snapshot.bridged = credit.bridged
  snapshot.retired = credit.retired
  snapshot.crossChainSupply = credit.crossChainSupply
  snapshot.createdAt = timestamp
  snapshot.save()

  if (credit.tokenAddress != MCO2_ERC20_CONTRACT) {
    epoch.creditSupply = epoch.creditSupply.plus(credit.currentSupply).plus(credit.crossChainSupply)
    epoch.save()
  }
  return epoch
}

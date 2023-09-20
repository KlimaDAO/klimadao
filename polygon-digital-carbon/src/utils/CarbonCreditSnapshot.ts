import { Address, BigInt } from '@graphprotocol/graph-ts'
import { loadCarbonCredit } from './CarbonCredit'
import { CarbonCreditSnapshot, Epoch } from '../../generated/schema'
import { MCO2_ERC20_CONTRACT } from '../../../lib/utils/Constants'

export function recordCarbonCreditSnapshot(
  token: Address,
  epochNumber: BigInt,
  timestamp: BigInt,
  epoch: Epoch
): Epoch {
  let credit = loadCarbonCredit(token)

  let snapshot = new CarbonCreditSnapshot(token.concatI32(epochNumber.toI32()))
  snapshot.credit = token
  snapshot.epoch = epochNumber
  snapshot.currentSupply = credit.currentSupply
  snapshot.bridged = credit.bridged
  snapshot.retired = credit.retired
  snapshot.crossChainSupply = credit.crossChainSupply
  snapshot.createdAt = timestamp
  snapshot.save()

  if (token != MCO2_ERC20_CONTRACT) {
    epoch.creditSupply = epoch.creditSupply.plus(credit.currentSupply).plus(credit.crossChainSupply)
    epoch.save()
  }
  return epoch
}

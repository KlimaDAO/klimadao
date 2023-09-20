import { Address, BigInt } from '@graphprotocol/graph-ts'
import { Holding } from '../../generated/schema'
import { ZERO_BI } from '../../../lib/utils/Decimals'

export function loadOrCreateHolding(account: Address, token: Address): Holding {
  let holding = Holding.load(account.concat(token))
  if (holding) return holding as Holding

  holding = new Holding(account.concat(token))
  holding.account = account
  holding.token = token
  holding.amount = ZERO_BI
  holding.activeProvenanceRecords = []
  holding.historicalProvenanceRecords = []
  holding.lastUpdated = ZERO_BI
  holding.save()
  return holding as Holding
}

import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts'
import { Holding, Token } from '../../generated/schema'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { createICRTokenID } from './Token'
import { loadOrCreateAccount } from './Account'

export function loadOrCreateHolding(account: Address, token: Address, tokenId: BigInt | null): Holding {
  loadOrCreateAccount(account)
  let id = tokenId !== null ? account.concat(token).concatI32(tokenId.toI32()) : account.concat(token)

  let tokenEntityId: Bytes

  if (tokenId !== null) {
    tokenEntityId = createICRTokenID(token, tokenId)
  } else {
    tokenEntityId = token
  }

  let holding = Holding.load(id)
  if (holding) return holding as Holding

  holding = new Holding(id)
  holding.account = account
  holding.token = tokenEntityId
  holding.tokenId = tokenId
  holding.amount = ZERO_BI
  holding.activeProvenanceRecords = []
  holding.historicalProvenanceRecords = []
  holding.lastUpdated = ZERO_BI
  holding.save()
  return holding as Holding
}

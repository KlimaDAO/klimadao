import { Address, BigInt } from '@graphprotocol/graph-ts'
import { Term } from '../../generated/schema'
import * as constants from '../../../lib/utils/Constants'
import { KlimaProV2 } from '../../generated/BondV2/KlimaProV2'
import { BigIntZero } from '../../../pairs/src/utils/utils'

export function createTerm(marketId: BigInt): Term {
  const term = new Term(marketId.toString())

  let bondV2Contract = KlimaProV2.bind(constants.PRO_KLIMA_V2)
  let terms_call = bondV2Contract.try_terms(marketId)
  if (terms_call.reverted) {
    throw new Error('Term not found - Market ID: ' + marketId.toString())
  }
  term.isFixedTerm = terms_call.value.value2
  term.market = marketId.toString()
  term.conclusion = terms_call.value.value4
  term.termExpiration = BigIntZero
  term.controlVariable = BigIntZero

  return term as Term
}

export function loadTerm(marketId: BigInt): Term {
  const term = Term.load(marketId.toString())
  if (term == null) {
    throw new Error('Term not found - Market ID: ' + marketId.toString())
  }

  return term as Term
}

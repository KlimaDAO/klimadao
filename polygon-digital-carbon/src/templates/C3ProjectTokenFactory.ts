import { C3ProjectToken } from '../../generated/templates'
import {
  NewTokenProject,
  StartAsyncToken,
  EndAsyncToken,
} from '../../generated/C3ProjectTokenFactory/C3ProjectTokenFactory'
import { loadOrCreateCarbonCredit, updateCarbonCreditWithCall } from '../utils/CarbonCredit'
import { createTokenWithCall } from '../utils/Token'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { saveStartAsyncToken, completeC3RetireRequest } from '../RetirementHandler'
import { log } from '@graphprotocol/graph-ts'

export function handleNewC3T(event: NewTokenProject): void {
  // Start indexing the C3T tokens; `event.params.tokenAddress` is the
  // address of the new token contract
  C3ProjectToken.create(event.params.tokenAddress)
  loadOrCreateCarbonCredit(event.params.tokenAddress, 'C3', null)
  createTokenWithCall(event.params.tokenAddress, event.block)
  updateCarbonCreditWithCall(event.params.tokenAddress, '')
}

// asyncToken handling

export function handleStartAsyncToken(event: StartAsyncToken): void {
  // Ignore retirements of zero value
  if (event.params.amount == ZERO_BI) return

  log.info('handleStartAsyncToken event fired {}', [event.transaction.hash.toHexString()])
  saveStartAsyncToken(event)
}

export function handleEndAsyncToken(event: EndAsyncToken): void {
  // load request and set status to completed
  completeC3RetireRequest(event)
}


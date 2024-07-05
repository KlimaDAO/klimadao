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
import { C3_VERIFIED_CARBON_UNITS_OFFSET } from '../../../lib/utils/Constants'
import { BigInt, Bytes, ethereum, log } from '@graphprotocol/graph-ts'
import { TokenURISafeguard } from '../../generated/schema'
import { C3OffsetNFT } from '../../generated/C3-Offset/C3OffsetNFT'
import { loadC3RetireRequest } from '../utils/C3'

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

export function handleTokenURISafeguard(block: ethereum.Block): void {
  log.info('handleTokenURISafeguard block number {}', [block.number.toString()])
  let safeguard = TokenURISafeguard.load('safeguard')
  if (safeguard == null) {
    safeguard = new TokenURISafeguard('safeguard')
    safeguard.requestsWithoutURI = []
    safeguard.save()
  }
  let requestsArray = safeguard.requestsWithoutURI
  if (requestsArray.length == 0) return

  let c3OffsetNftContract = C3OffsetNFT.bind(C3_VERIFIED_CARBON_UNITS_OFFSET)

  let updatedRequestArray: Bytes[] = []

  for (let i = 0; i < requestsArray.length; i++) {
    let requestId = requestsArray[i]
    let request = loadC3RetireRequest(requestId)
    if (request == null) {
      log.error('handleURIBlockSafeguard request is null {}', [requestId.toHexString()])
      continue
    }
    let c3OffsetNftIndex = request.c3OffsetNftIndex

    if (c3OffsetNftIndex === null) {
      log.info('handleURIBlockSafeguard c3OffsetNftIndex is null {}', [request.id.toString()])
      continue
    }
    let tokenURICall = c3OffsetNftContract.try_tokenURI(c3OffsetNftIndex as BigInt)

    if (tokenURICall.reverted) {
      log.error('handleURIBlockSafeguard reverted for request id {}', [request.id.toString()])
      continue
    } else {
      let tokenURI = tokenURICall.value
      log.info('handleURIBlockSafeguard tokenURI {}', [tokenURI])
      if (tokenURI == null || tokenURI == '') {
        log.error('handleURIBlockSafeguard tokenURI still null or undefined {}', [request.id.toString()])
        continue
      } else {
        request.tokenURI = tokenURI
        request.save()
      }
    }
    // remove request from safeguard if tokenURI is found
    if (request.tokenURI == null || request.tokenURI == '') {
      updatedRequestArray.push(requestId)
    }
  }

  safeguard.requestsWithoutURI = updatedRequestArray
  safeguard.save()
}

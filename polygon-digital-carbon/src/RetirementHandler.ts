import {
  C3_VERIFIED_CARBON_UNITS_OFFSET,
  CCO2_ERC20_CONTRACT,
  ICR_MIGRATION_BLOCK,
  MCO2_ERC20_CONTRACT,
  ZERO_ADDRESS,
} from '../../lib/utils/Constants'
import { BIG_INT_1E18, ZERO_BI } from '../../lib/utils/Decimals'
import { C3OffsetNFT, VCUOMinted, VCUOMetaDataUpdated } from '../generated/C3-Offset/C3OffsetNFT'
import { CarbonOffset } from '../generated/MossCarbonOffset/CarbonChain'
import { StartAsyncToken, EndAsyncToken } from '../generated/C3ProjectTokenFactory/C3ProjectTokenFactory'
import { RetiredVintage } from '../generated/templates/ICRProjectToken/ICRProjectToken'
import { Retired, Retired1 as Retired_1_4_0 } from '../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { RetirementRequested } from '../generated/templates/ToucanPuroCarbonOffsets/ToucanPuroCarbonOffsets'
import { burnedCO2Token } from '../generated/CCO2CarbonOffset/CCO2Token'
import { incrementAccountRetirements, loadOrCreateAccount } from './utils/Account'
import { loadCarbonCredit, loadOrCreateCarbonCredit } from './utils/CarbonCredit'
import { loadOrCreateCarbonProject } from './utils/CarbonProject'
import { loadRetire, saveRetire } from './utils/Retire'
import { Bytes, log } from '@graphprotocol/graph-ts'
import { loadOrCreateC3RetireRequestDetails, loadC3RetireRequestDetails } from './utils/C3'
import { Token, TokenURISafeguard } from '../generated/schema'
import { createAsyncRetireRequestId } from '../utils/getRetirementsContractAddress'
import { AsyncRetireRequestStatus } from '../utils/enums'
import { loadAsyncRetireRequest, loadOrCreateAsyncRetireRequest } from './utils/AsyncRetireRequest'
import { C3RetirementMetadata as C3RetirementMetadataTemplate } from '../generated/templates'
import { extractIpfsHash } from '../utils/ipfs'

export function saveToucanRetirement(event: Retired): void {
  // Disregard events with zero amount
  if (event.params.tokenId == ZERO_BI) {
    return
  }

  let credit = loadCarbonCredit(event.address)

  credit.retired = credit.retired.plus(event.params.tokenId)
  credit.save()

  // Ensure account entities are created for all addresses
  let sender = loadOrCreateAccount(event.transaction.from)
  let senderAddress = event.transaction.from
  loadOrCreateAccount(event.params.sender) // Beneficiary address

  saveRetire(
    sender.id.concatI32(sender.totalRetirements),
    credit.id,
    ZERO_ADDRESS,
    'OTHER',
    event.params.tokenId,
    event.params.sender,
    '',
    senderAddress,
    '',
    event.block.timestamp,
    event.transaction.hash
  )

  incrementAccountRetirements(senderAddress)
}

export function saveToucanRetirement_1_4_0(event: Retired_1_4_0): void {
  // Disregard events with zero amount
  if (event.params.amount == ZERO_BI) {
    return
  }

  let credit = loadCarbonCredit(event.address)

  credit.retired = credit.retired.plus(event.params.amount)
  credit.save()

  // Ensure account entities are created for all addresses
  let sender = loadOrCreateAccount(event.transaction.from)
  let senderAddress = event.transaction.from
  loadOrCreateAccount(event.params.sender) // Beneficiary address

  saveRetire(
    sender.id.concatI32(sender.totalRetirements),
    credit.id,
    ZERO_ADDRESS,
    'OTHER',
    event.params.amount,
    event.params.sender,
    '',
    senderAddress,
    '',
    event.block.timestamp,
    event.transaction.hash,
    event.params.eventId.toString()
  )

  incrementAccountRetirements(senderAddress)
}

export function saveToucanPuroRetirementRequest(event: RetirementRequested): void {
  // Disregard events with zero amount
  if (event.params.params.amount == ZERO_BI) {
    return
  }

  let credit = loadCarbonCredit(event.address)

  credit.retired = credit.retired.plus(event.params.params.amount)
  credit.save()

  // Ensure account entities are created for all addresses
  let sender = loadOrCreateAccount(event.transaction.from)
  let senderAddress = event.transaction.from
  loadOrCreateAccount(event.params.params.beneficiary) // Beneficiary address
  let retireId = sender.id.concatI32(sender.totalRetirements)

  saveRetire(
    retireId,
    credit.id,
    ZERO_ADDRESS,
    'OTHER',
    event.params.params.amount,
    event.params.params.beneficiary,
    event.params.params.beneficiaryString,
    senderAddress,
    event.params.params.retiringEntityString,
    event.block.timestamp,
    event.transaction.hash,
    event.params.requestId.toString()
  )

  let requestId = createAsyncRetireRequestId(event.address, event.params.requestId)

  let request = loadOrCreateAsyncRetireRequest(requestId)

  let retire = loadRetire(retireId)
  retire.beneficiaryLocation = event.params.params.beneficiaryLocation
  retire.consumptionCountryCode = event.params.params.consumptionCountryCode
  retire.consumptionPeriodStart = event.params.params.consumptionPeriodStart
  retire.consumptionPeriodEnd = event.params.params.consumptionPeriodEnd
  retire.asyncRetireStatus = AsyncRetireRequestStatus.REQUESTED
  retire.asyncRetireRequest = requestId
  retire.save()

  request.retire = retireId
  request.provenance = retire.provenance
  request.save()

  incrementAccountRetirements(senderAddress)
}

export function handleVCUOMinted(event: VCUOMinted): void {
  // Currently the NFT minting is required and happens within every offset or offsetFor transaction made against a C3T
  // This event only emits who receives the NFT and the token ID, although the data is stored.
  // Update associated entities using a call to retrieve the retirement details.
  let c3OffsetNftContract = C3OffsetNFT.bind(event.address)
  let projectAddress = c3OffsetNftContract.list(event.params.tokenId).getProjectAddress()
  let retireAmount = c3OffsetNftContract.list(event.params.tokenId).getAmount()

  let credit = loadOrCreateCarbonCredit(projectAddress, 'C3', null)

  credit.retired = credit.retired.plus(retireAmount)
  credit.save()

  // Ensure account entities are created for all addresses
  loadOrCreateAccount(event.params.sender)
  let sender = loadOrCreateAccount(event.transaction.from)
  let senderAddress = event.transaction.from

  // Do not increment retirements for JCS or ECO tokens as the retirement has already been counted in StartAsyncToken
  let token = Token.load(projectAddress)
  if (token !== null && !token.symbol.startsWith('C3T-JCS') && !token.symbol.startsWith('C3T-ECO')) {
    saveRetire(
      sender.id.concatI32(sender.totalRetirements),
      projectAddress,
      ZERO_ADDRESS,
      'OTHER',
      retireAmount,
      event.params.sender,
      '',
      senderAddress,
      '',
      event.block.timestamp,
      event.transaction.hash
    )

    incrementAccountRetirements(senderAddress)
  }
}

export function handleMossRetirement(event: CarbonOffset): void {
  // Don't process zero amount events
  if (event.params.carbonTon == ZERO_BI) return

  let credit = loadOrCreateCarbonCredit(MCO2_ERC20_CONTRACT, 'MOSS', null)

  // Set up project/default info for Moss "project"

  if (credit.vintage == 1970) {
    credit.vintage = 2021
    credit.project = 'Moss'
    credit.save()

    loadOrCreateCarbonProject('VERRA', 'Moss')
  }

  credit.retired = credit.retired.plus(event.params.carbonTon)
  credit.save()

  // Ensure account entities are created for all addresses
  loadOrCreateAccount(event.params.sender)
  let sender = loadOrCreateAccount(event.transaction.from)
  let senderAddress = event.transaction.from

  saveRetire(
    sender.id.concatI32(sender.totalRetirements),
    MCO2_ERC20_CONTRACT,
    MCO2_ERC20_CONTRACT,
    'OTHER',
    event.params.carbonTon,
    event.params.sender,
    event.params.onBehalfOf,
    senderAddress,
    '',
    event.block.timestamp,
    event.transaction.hash
  )

  incrementAccountRetirements(senderAddress)
}

export function handleCCO2Retirement(event: burnedCO2Token): void {
  // Don't process zero amount events
  if (event.params.amount == ZERO_BI) return

  let credit = loadOrCreateCarbonCredit(CCO2_ERC20_CONTRACT, 'CCO2', null)

  // Set up project/default info for Moss "project"

  if (credit.vintage == 1970) {
    credit.vintage = 2021
    credit.project = 'CCO2'
    credit.save()

    loadOrCreateCarbonProject('COOREST', 'CCO2')
  }

  credit.retired = credit.retired.plus(event.params.amount)
  credit.save()

  // Ensure account entities are created for all addresses
  let sender = loadOrCreateAccount(event.transaction.from)
  let senderAddress = event.transaction.from

  saveRetire(
    sender.id.concatI32(sender.totalRetirements),
    CCO2_ERC20_CONTRACT,
    CCO2_ERC20_CONTRACT,
    'OTHER',
    event.params.amount,
    event.transaction.from,
    '',
    senderAddress,
    '',
    event.block.timestamp,
    event.transaction.hash
  )

  incrementAccountRetirements(senderAddress)
}

export function saveICRRetirement(event: RetiredVintage): void {
  let credit = loadOrCreateCarbonCredit(event.address, 'ICR', event.params.tokenId)

  let amount = event.params.amount
  if (event.block.number < ICR_MIGRATION_BLOCK) {
    amount = event.params.amount.times(BIG_INT_1E18)
  }

  credit.retired = credit.retired.plus(amount)
  credit.save()

  // Ensure account entities are created for all addresses
  loadOrCreateAccount(event.params.account)
  let sender = loadOrCreateAccount(event.transaction.from)
  let senderAddress = event.transaction.from

  saveRetire(
    sender.id.concatI32(sender.totalRetirements),
    credit.id,
    ZERO_ADDRESS,
    'OTHER',
    amount,
    event.params.account,
    '',
    senderAddress,
    '',
    event.block.timestamp,
    event.transaction.hash,
    event.params.nftTokenId.toString(),
    event.params.data.toString()
  )

  incrementAccountRetirements(senderAddress)
}

export function saveStartAsyncToken(event: StartAsyncToken): void {
  // Ignore retirements of zero value
  if (event.params.amount == ZERO_BI) return

  let credit = loadOrCreateCarbonCredit(event.params.fromToken, 'C3', null)
  credit.save()

  // ensure accounts are created for all addresses
  loadOrCreateAccount(event.params.beneficiary)
  let sender = loadOrCreateAccount(event.transaction.from)
  let senderAddress = event.transaction.from

  let retireId = senderAddress.concatI32(sender.totalRetirements)

  saveRetire(
    retireId,
    credit.id,
    ZERO_ADDRESS,
    'OTHER',
    event.params.amount,
    event.params.beneficiary,
    '',
    senderAddress,
    '',
    event.block.timestamp,
    event.transaction.hash,
    event.params.index.toString()
  )

  let retire = loadRetire(retireId)

  let requestId = createAsyncRetireRequestId(event.params.fromToken, event.params.index)

  let c3RetireRequestDetails = loadOrCreateC3RetireRequestDetails(requestId)
  c3RetireRequestDetails.index = event.params.index
  c3RetireRequestDetails.save()

  let asyncRetireRequest = loadOrCreateAsyncRetireRequest(requestId)
  asyncRetireRequest.retire = retireId
  asyncRetireRequest.provenance = retire.provenance
  asyncRetireRequest.status = AsyncRetireRequestStatus.REQUESTED
  asyncRetireRequest.c3RetireRequestDetails = c3RetireRequestDetails.id
  asyncRetireRequest.save()

  retire.asyncRetireRequest = requestId
  retire.asyncRetireStatus = AsyncRetireRequestStatus.REQUESTED
  retire.save()

  incrementAccountRetirements(senderAddress)
}

export function completeC3RetireRequest(event: EndAsyncToken): void {
  log.info('completeC3RetireRequest event fired {}', [event.transaction.hash.toHexString()])

  loadOrCreateAccount(event.transaction.from)

  let requestId = createAsyncRetireRequestId(event.params.fromToken, event.params.index)

  let c3RetireRequestDetails = loadC3RetireRequestDetails(requestId)
  let asyncRetireRequest = loadAsyncRetireRequest(requestId)

  let retireId: Bytes = asyncRetireRequest.retire
  let retire = loadRetire(retireId)

  if (c3RetireRequestDetails == null) {
    log.error('No C3RetireRequest found for retireId: {} hash: {}', [event.transaction.hash.toHexString()])
    return
  } else {
    if (asyncRetireRequest.status == AsyncRetireRequestStatus.REQUESTED && event.params.success == true) {
      let c3OffsetNftContract = C3OffsetNFT.bind(C3_VERIFIED_CARBON_UNITS_OFFSET)

      c3RetireRequestDetails.c3OffsetNftIndex = event.params.nftIndex
      let tokenURICall = c3OffsetNftContract.try_tokenURI(event.params.nftIndex)

      if (tokenURICall.reverted) {
        log.error('tokenURI call reverted for NFT index {}', [event.params.nftIndex.toString()])
      } else {
        let tokenURI = tokenURICall.value
        if (tokenURI == null || tokenURI == '') {
          let safeguard = TokenURISafeguard.load('safeguard')
          if (safeguard == null) {
            safeguard = new TokenURISafeguard('safeguard')
            safeguard.requestsWithoutURI = []
            safeguard.save()
          }
          let requestsArray = safeguard.requestsWithoutURI
          requestsArray.push(requestId)
          safeguard.requestsWithoutURI = requestsArray
          safeguard.save()
          log.error('Initial attempt to retrieve tokenURI is null or empty for nft index {}', [
            event.params.nftIndex.toString(),
          ])
        } else {
          c3RetireRequestDetails.tokenURI = tokenURI
          const hash = extractIpfsHash(tokenURI)

          c3RetireRequestDetails.retirementMetadata = hash
          C3RetirementMetadataTemplate.create(hash)
        }
      }

      asyncRetireRequest.status = AsyncRetireRequestStatus.FINALIZED
      retire.asyncRetireStatus = AsyncRetireRequestStatus.FINALIZED
    } else if (asyncRetireRequest.status == AsyncRetireRequestStatus.REQUESTED && event.params.success == false) {
      asyncRetireRequest.status = AsyncRetireRequestStatus.REVERTED
      retire.asyncRetireStatus = AsyncRetireRequestStatus.REVERTED
    }
  }

  c3RetireRequestDetails.save()
  asyncRetireRequest.save()
  retire.save()
}

export function handleVCUOMetaDataUpdated(event: VCUOMetaDataUpdated): void {
  let safeguard = TokenURISafeguard.load('safeguard')
  if (safeguard == null) {
    safeguard = new TokenURISafeguard('safeguard')
    safeguard.requestsWithoutURI = []
    safeguard.save()
  }
  let requestsArray = safeguard.requestsWithoutURI
  if (requestsArray.length == 0) return

  /** Target the request with the index that matches the event.params.tokenId
   * With event.params.tokenId, it's theoretically possible to call .list() on the C3OffsetNFT contract to get the project address
   * However the issue is the request cannot be loaded as the request id is project address.concat(with retirement index)
   * The retirement index is not available in this event. There is currently no way to call the C3OffsetNFT or
   * credit contract with any of the event params to retrieve the retirement index  */

  for (let i = 0; i < requestsArray.length; i++) {
    let requestId = requestsArray[i]
    let request = loadC3RetireRequestDetails(requestId)
    if (request == null) {
      log.error('handleURIBlockSafeguard request is null {}', [requestId.toHexString()])
      continue
    }

    if (request.c3OffsetNftIndex == event.params.tokenId) {
      const tokenURI = event.params.url

      request.tokenURI = tokenURI
      const hash = extractIpfsHash(tokenURI)

      request.retirementMetadata = hash
      C3RetirementMetadataTemplate.create(hash)

      request.save()
    }
  }
}

import {
  C3_VERIFIED_CARBON_UNITS_OFFSET,
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
import { incrementAccountRetirements, loadOrCreateAccount } from './utils/Account'
import { loadCarbonCredit, loadOrCreateCarbonCredit } from './utils/CarbonCredit'
import { loadOrCreateCarbonProject } from './utils/CarbonProject'
import { loadRetire, saveRetire } from './utils/Retire'
import { log, Bytes, json, dataSource } from '@graphprotocol/graph-ts'
import { loadOrCreateC3RetireRequest, loadC3RetireRequest } from './utils/C3'
import { C3RetirementMetadata, C3MetadataProject, Token, TokenURISafeguard } from '../generated/schema'
import { getC3RetireRequestId } from '../utils/getRetirementsContractAddress'
import { BridgeStatus } from '../utils/enums'
import { loadOrCreateToucanBridgeRequest } from './utils/Toucan'
import { C3RetirementMetadata as C3RetirementMetadataTemplate } from '../generated/templates'

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
    event.transaction.hash
  )

  let retire = loadRetire(retireId)
  retire.beneficiaryLocation = event.params.params.beneficiaryLocation
  retire.consumptionCountryCode = event.params.params.consumptionCountryCode
  retire.consumptionPeriodStart = event.params.params.consumptionPeriodStart
  retire.consumptionPeriodEnd = event.params.params.consumptionPeriodEnd
  retire.bridgeStatus = 'REQUESTED'
  retire.save()

  let request = loadOrCreateToucanBridgeRequest(event.params.requestId)
  request.retire = retireId
  if (retire != null) {
    request.provenance = retire.provenance
  }

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
    'C3'
  )

  let retire = loadRetire(retireId)

  let requestId = getC3RetireRequestId(event.params.fromToken, event.params.index)
  let request = loadOrCreateC3RetireRequest(requestId)

  request.status = BridgeStatus.REQUESTED
  request.index = event.params.index
  request.retire = retireId
  request.provenance = retire.provenance
  request.save()

  retire.c3RetireRequest = requestId
  retire.save()

  incrementAccountRetirements(senderAddress)
}

export function completeC3RetireRequest(event: EndAsyncToken): void {
  log.info('completeC3RetireRequest event fired {}', [event.transaction.hash.toHexString()])

  loadOrCreateAccount(event.transaction.from)

  let requestId = getC3RetireRequestId(event.params.fromToken, event.params.index)
  let request = loadC3RetireRequest(requestId)

  if (request == null) {
    log.error('No C3RetireRequest found for retireId: {} hash: {}', [
      // retireId.toHexString(),
      event.transaction.hash.toHexString(),
    ])
    return
  } else {
    if (request.status == BridgeStatus.REQUESTED && event.params.success == true) {
      let c3OffsetNftContract = C3OffsetNFT.bind(C3_VERIFIED_CARBON_UNITS_OFFSET)

      request.c3OffsetNftIndex = event.params.nftIndex

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
          log.error('Retrieved tokenURI is null or empty for nft index {}', [event.params.nftIndex.toString()])
        } else {
          request.tokenURI = tokenURI

          C3RetirementMetadataTemplate.create(tokenURI)
        }
      }

      request.status = BridgeStatus.FINALIZED
    } else if (request.status == BridgeStatus.REQUESTED && event.params.success == false) {
      request.status = BridgeStatus.REVERTED
    }
  }
  request.save()
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

  // target the request with the index that matches the event.params.tokenId
  for (let i = 0; i < requestsArray.length; i++) {
    let requestId = requestsArray[i]
    let request = loadC3RetireRequest(requestId)
    if (request == null) {
      log.error('handleURIBlockSafeguard request is null {}', [requestId.toHexString()])
      continue
    }

    if (request.c3OffsetNftIndex == event.params.tokenId) {
      const tokenURI = event.params.url

      request.tokenURI = tokenURI
      request.save()

      C3RetirementMetadataTemplate.create(tokenURI)
    }
  }
}

export function handleC3RetirementMetadata(content: Bytes): void {
  let c3RetirementMetadata = new C3RetirementMetadata(dataSource.stringParam())
  const value = json.fromBytes(content).toObject()
  if (value) {
    const transferee = value.get('transferee')
    const reason = value.get('reason')
    const projectId = value.get('projectId')
    const projectAddress = value.get('projectAddress')
    const amount = value.get('amount')
    const vintage = value.get('vintage')
    const owner = value.get('owner')
    const uncheckedProject = value.get('project')
    const image = value.get('image')
    const pdf = value.get('pdf')
    const nftRegistry = value.get('nftRegistry')

    if (transferee) c3RetirementMetadata.transferee = transferee.toString()
    if (reason) c3RetirementMetadata.reason = reason.toString()
    if (projectId) c3RetirementMetadata.projectId = projectId.toString()
    if (projectAddress) c3RetirementMetadata.projectAddress = Bytes.fromHexString(projectAddress.toString())
    if (amount) c3RetirementMetadata.amount = amount.toBigInt().toI32()
    if (vintage) c3RetirementMetadata.vintage = vintage.toString()
    if (owner) c3RetirementMetadata.owner = Bytes.fromHexString(owner.toString())
    if (image) c3RetirementMetadata.image = image.toString()
    if (pdf) c3RetirementMetadata.pdf = pdf.toString()
    if (nftRegistry) c3RetirementMetadata.nftRegistry = nftRegistry.toString()

    if (uncheckedProject) {
      const project = uncheckedProject.toObject()
      let projectEntity = new C3MetadataProject(c3RetirementMetadata.id)
      const projectName = project.get('name')
      const project_id = project.get('project_id')
      const project_type = project.get('project_type')
      const registry = project.get('registry')
      const region = project.get('region')
      const country = project.get('country')
      const methodology = project.get('methodology')
      const period_start = project.get('period_start')
      const period_end = project.get('period_end')
      const ac = project.get('ac')
      const uri = project.get('uri')

      if (projectName) projectEntity.name = projectName.toString()
      if (project_id) projectEntity.project_id = project_id.toString()
      if (project_type) projectEntity.project_type = project_type.toString()
      if (registry) projectEntity.registry = registry.toString()
      if (region) projectEntity.region = region.toString()
      if (country) projectEntity.country = country.toString()
      if (methodology) projectEntity.methodology = methodology.toString()
      if (period_start) projectEntity.period_start = period_start.toString()
      if (period_end) projectEntity.period_end = period_end.toString()
      if (ac) projectEntity.ac = ac.toBool()
      if (uri) projectEntity.uri = uri.toString()

      projectEntity.save()
      c3RetirementMetadata.project = projectEntity.id
    }

    c3RetirementMetadata.save()
  }
}

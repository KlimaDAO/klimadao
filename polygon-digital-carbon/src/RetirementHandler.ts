import { Address } from '@graphprotocol/graph-ts'
import {
  ICR_MIGRATION_BLOCK,
  KLIMA_INFINITY_DIAMOND,
  MCO2_ERC20_CONTRACT,
  ZERO_ADDRESS,
} from '../../lib/utils/Constants'
import { BIG_INT_1E18, ZERO_BI } from '../../lib/utils/Decimals'
import { C3OffsetNFT, VCUOMinted } from '../generated/C3-Offset/C3OffsetNFT'
import { CarbonOffset } from '../generated/MossCarbonOffset/CarbonChain'
import { RetiredVintage } from '../generated/templates/ICRProjectToken/ICRProjectToken'
import { Retired, Retired1 as Retired_1_4_0 } from '../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { RetirementRequested } from '../generated/templates/ToucanPuroCarbonOffsets/ToucanPuroCarbonOffsets'
import { incrementAccountRetirements, loadOrCreateAccount } from './utils/Account'
import { loadCarbonCredit, loadOrCreateCarbonCredit } from './utils/CarbonCredit'
import { loadOrCreateCarbonProject } from './utils/CarbonProject'
import { loadRetire, saveRetire } from './utils/Retire'
import { loadOrCreateToucanBridgeRequest } from './utils/Toucan'

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

  let retireContract = C3OffsetNFT.bind(event.address)

  let projectAddress = retireContract.list(event.params.tokenId).getProjectAddress()
  let retireAmount = retireContract.list(event.params.tokenId).getAmount()

  let credit = loadCarbonCredit(projectAddress)

  credit.retired = credit.retired.plus(retireAmount)
  credit.save()

  // Ensure account entities are created for all addresses
  loadOrCreateAccount(event.params.sender)
  let sender = loadOrCreateAccount(event.transaction.from)
  let senderAddress = event.transaction.from

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

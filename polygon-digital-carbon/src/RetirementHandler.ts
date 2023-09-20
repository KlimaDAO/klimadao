import { MCO2_ERC20_CONTRACT, ZERO_ADDRESS } from '../../lib/utils/Constants'
import { ZERO_BI } from '../../lib/utils/Decimals'
import { C3OffsetNFT, VCUOMinted } from '../generated/C3-Offset/C3OffsetNFT'
import { CarbonOffset } from '../generated/MossCarbonOffset/CarbonChain'
import { Retired, Retired1 as Retired_1_4_0 } from '../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { incrementAccountRetirements, loadOrCreateAccount } from './utils/Account'
import { loadCarbonCredit, loadOrCreateCarbonCredit } from './utils/CarbonCredit'
import { loadOrCreateCarbonProject } from './utils/CarbonProject'
import { recordProvenance } from './utils/Provenance'
import { saveRetire } from './utils/Retire'

export function saveToucanRetirement(event: Retired): void {
  // Disregard events with zero amount
  if (event.params.tokenId == ZERO_BI) {
    return
  }

  let credit = loadCarbonCredit(event.address)

  credit.retired = credit.retired.plus(event.params.tokenId)
  credit.save()

  // Ensure account entities are created for all addresses
  loadOrCreateAccount(event.params.sender)
  let sender = loadOrCreateAccount(event.transaction.from)

  saveRetire(
    event.transaction.from.concatI32(sender.totalRetirements),
    event.address,
    ZERO_ADDRESS,
    'OTHER',
    event.params.tokenId,
    event.params.sender,
    '',
    event.transaction.from,
    '',
    event.block.timestamp,
    null
  )

  incrementAccountRetirements(event.transaction.from)

  recordProvenance(
    event.transaction.hash,
    event.address,
    event.params.sender,
    ZERO_ADDRESS,
    'RETIREMENT',
    event.params.tokenId,
    event.block.timestamp
  )
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
  loadOrCreateAccount(event.params.sender)
  let sender = loadOrCreateAccount(event.transaction.from)

  saveRetire(
    event.transaction.from.concatI32(sender.totalRetirements),
    event.address,
    ZERO_ADDRESS,
    'OTHER',
    event.params.amount,
    event.params.sender,
    '',
    event.transaction.from,
    '',
    event.block.timestamp,
    event.params.eventId.toString()
  )

  incrementAccountRetirements(event.transaction.from)

  recordProvenance(
    event.transaction.hash,
    event.address,
    event.params.sender,
    ZERO_ADDRESS,
    'RETIREMENT',
    event.params.amount,
    event.block.timestamp
  )
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

  saveRetire(
    event.transaction.from.concatI32(sender.totalRetirements),
    projectAddress,
    ZERO_ADDRESS,
    'OTHER',
    retireAmount,
    event.params.sender,
    '',
    event.transaction.from,
    '',
    event.block.timestamp,
    null
  )

  recordProvenance(
    event.transaction.hash,
    projectAddress,
    event.params.sender,
    ZERO_ADDRESS,
    'RETIREMENT',
    retireAmount,
    event.block.timestamp
  )

  incrementAccountRetirements(event.transaction.from)
}

export function handleMossRetirement(event: CarbonOffset): void {
  // Don't process zero amount events
  if (event.params.carbonTon == ZERO_BI) return

  let credit = loadOrCreateCarbonCredit(MCO2_ERC20_CONTRACT, 'MOSS')

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

  saveRetire(
    event.transaction.from.concatI32(sender.totalRetirements),
    MCO2_ERC20_CONTRACT,
    MCO2_ERC20_CONTRACT,
    'OTHER',
    event.params.carbonTon,
    event.params.sender,
    event.params.onBehalfOf,
    event.transaction.from,
    '',
    event.block.timestamp,
    null
  )

  incrementAccountRetirements(event.transaction.from)
}

// export function handleMossRetirementToMainnet(): void {}

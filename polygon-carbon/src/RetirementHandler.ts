import { ZERO_ADDRESS } from '../../lib/utils/Constants'
import { C3OffsetNFT, VCUOMinted } from '../generated/C3-Offset/C3OffsetNFT'
import { Retired, Retired1 as Retired_1_4_0 } from '../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { loadCarbonOffset } from './utils/CarbonOffset'
import { saveRetire } from './utils/Retire'

export function saveToucanRetirement(event: Retired): void {
  let offset = loadCarbonOffset(event.address)

  offset.retired = offset.retired.plus(event.params.tokenId)
  offset.save()

  saveRetire(
    event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
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
}

export function saveToucanRetirement_1_4_0(event: Retired_1_4_0): void {
  let offset = loadCarbonOffset(event.address)

  offset.retired = offset.retired.plus(event.params.amount)
  offset.save()

  saveRetire(
    event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
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
}

export function handleVCUOMinted(event: VCUOMinted): void {
  // Currently the NFT minting is required and happens within every offset or offsetFor transaction made against a C3T
  // This event only emits who receives the NFT and the token ID, although the data is stored.
  // Update associated entities using a call to retrieve the retirement details.

  let retireContract = C3OffsetNFT.bind(event.address)

  let projectAddress = retireContract.list(event.params.tokenId).getProjectAddress()
  let retireAmount = retireContract.list(event.params.tokenId).getAmount()

  let offset = loadCarbonOffset(projectAddress)

  offset.retired = offset.retired.plus(retireAmount)
  offset.save()

  saveRetire(
    event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
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
}

import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts'
import { ToucanCarbonOffsets, ToucanPuroCarbonOffsets } from '../../generated/templates'
import { TokenCreated } from '../../generated/ToucanFactory/ToucanCarbonOffsetsFactory'
import { loadOrCreateCarbonCredit, updateCarbonCreditWithCall } from '../utils/CarbonCredit'
import { createTokenWithCall } from '../utils/Token'
import { loadOrCreateCarbonProject } from '../utils/CarbonProject'

export function handleNewTCO2(event: TokenCreated): void {
  ToucanCarbonOffsets.create(event.params.tokenAddress)
  setupNewToucanCredit(event.params.tokenAddress, 'VERRA', event.block)
}

export function handleNewPuroTCO2(event: TokenCreated): void {
  ToucanPuroCarbonOffsets.create(event.params.tokenAddress)
  setupNewToucanCredit(event.params.tokenAddress, 'PURO_EARTH', event.block)
}

function setupNewToucanCredit(
  tokenAddress: Address,
  registry: string,
  block: ethereum.Block,
  tokenId: BigInt | null = null
): void {
  loadOrCreateCarbonCredit(tokenAddress, 'TOUCAN', null)
  createTokenWithCall(tokenAddress, block)
  updateCarbonCreditWithCall(tokenAddress, registry)
}

import { Address, BigInt } from '@graphprotocol/graph-ts'
import { ToucanCarbonOffsets, ToucanPuroCarbonOffsets } from '../../generated/templates'
import { TokenCreated } from '../../generated/ToucanFactory/ToucanCarbonOffsetsFactory'
import { loadOrCreateCarbonCredit, updateCarbonCreditWithCall } from '../utils/CarbonCredit'
import { createTokenWithCall } from '../utils/Token'

export function handleNewTCO2(event: TokenCreated): void {
  ToucanCarbonOffsets.create(event.params.tokenAddress)
  setupNewToucanCredit(event.params.tokenAddress, 'VERRA')
}

export function handleNewPuroTCO2(event: TokenCreated): void {
  ToucanPuroCarbonOffsets.create(event.params.tokenAddress)
  setupNewToucanCredit(event.params.tokenAddress, 'PURO_EARTH')
}

function setupNewToucanCredit(tokenAddress: Address, registry: string, tokenId: BigInt | null = null): void {
  loadOrCreateCarbonCredit(tokenAddress, 'TOUCAN', null)
  createTokenWithCall(tokenAddress)
  updateCarbonCreditWithCall(tokenAddress, registry)
}

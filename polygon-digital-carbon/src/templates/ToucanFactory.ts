import { Address, BigInt } from '@graphprotocol/graph-ts'
import { ToucanCarbonOffsets } from '../../generated/templates'
import { TokenCreated } from '../../generated/ToucanFactory/ToucanCarbonOffsetsFactory'
import { loadOrCreateCarbonCredit, updateCarbonCreditWithCall } from '../utils/CarbonCredit'
import { createTokenWithCall } from '../utils/Token'

export function handleNewTCO2(event: TokenCreated): void {
  setupNewToucanCredit(event.params.tokenAddress, 'VERRA')
}

export function handleNewPuroTCO2(event: TokenCreated): void {
  setupNewToucanCredit(event.params.tokenAddress, 'PURO_EARTH')
}

function setupNewToucanCredit(tokenAddress: Address, registry: string, tokenId: BigInt | null = null): void {
  ToucanCarbonOffsets.create(tokenAddress)
  loadOrCreateCarbonCredit(tokenAddress, 'TOUCAN', null)
  createTokenWithCall(tokenAddress)
  updateCarbonCreditWithCall(tokenAddress, registry)
}

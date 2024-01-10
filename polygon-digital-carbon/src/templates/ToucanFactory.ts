import { ToucanCarbonOffsets } from '../../generated/templates'
import { TokenCreated } from '../../generated/ToucanFactory/ToucanCarbonOffsetsFactory'
import { loadOrCreateCarbonCredit, updateCarbonCreditWithCall } from '../utils/CarbonCredit'
import { createTokenWithCall } from '../utils/Token'

export function handleNewTCO2(event: TokenCreated): void {
  // Start indexing the TCO2 tokens; `event.params.tokenAddress` is the
  // address of the new token contract

  ToucanCarbonOffsets.create(event.params.tokenAddress)
  loadOrCreateCarbonCredit(event.params.tokenAddress, 'TOUCAN', null)
  createTokenWithCall(event.params.tokenAddress)
  updateCarbonCreditWithCall(event.params.tokenAddress)
}

import { Address } from '@graphprotocol/graph-ts'
import { LogRebase } from '../generated/sKlimaERC20V1/sKlimaERC20V1'
import { recordCarbonCreditSnapshot } from './utils/CarbonCreditSnapshot'
import { loadOrCreateEcosystem } from './utils/Ecosystem'

export function handleRebase(event: LogRebase): void {
  let ecosystem = loadOrCreateEcosystem()

  for (let i = 0; i < ecosystem.activeCredits.length; i++) {
    recordCarbonCreditSnapshot(Address.fromBytes(ecosystem.activeCredits[i]), event.params.epoch, event.block.timestamp)
  }
}

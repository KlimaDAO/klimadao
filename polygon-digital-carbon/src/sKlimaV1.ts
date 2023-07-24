import { Address } from '@graphprotocol/graph-ts'
import { LogRebase } from '../generated/sKlimaERC20V1/sKlimaERC20V1'
import { recordCarbonOffsetSnapshot } from './utils/CarbonOffsetSnapshot'
import { loadOrCreateEcosystem } from './utils/Ecosystem'

export function handleRebase(event: LogRebase): void {
  let ecosystem = loadOrCreateEcosystem()

  for (let i = 0; i < ecosystem.activeOffsets.length; i++) {
    recordCarbonOffsetSnapshot(Address.fromBytes(ecosystem.activeOffsets[i]), event.params.epoch, event.block.timestamp)
  }
}

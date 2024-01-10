import { Address, BigInt } from '@graphprotocol/graph-ts'
import { LogRebase } from '../generated/sKlimaERC20V1/sKlimaERC20V1'
import { recordCarbonCreditSnapshot } from './utils/CarbonCreditSnapshot'
import { loadOrCreateEcosystem } from './utils/Ecosystem'
import { loadOrCreateEpoch } from './utils/Epoch'
import { ZERO_BI } from '../../lib/utils/Decimals'

export function handleRebase(event: LogRebase): void {
  let ecosystem = loadOrCreateEcosystem()
  let epoch = loadOrCreateEpoch(event.params.epoch)

  for (let i = 0; i < ecosystem.activeCredits.length; i++) {
    epoch = recordCarbonCreditSnapshot(ecosystem.activeCredits[i], event.params.epoch, event.block.timestamp, epoch)
  }

  // Update deltas
  if (event.params.epoch == ZERO_BI) {
    epoch.deltaCreditSupply = epoch.creditSupply
  } else {
    let priorEpoch = loadOrCreateEpoch(event.params.epoch.minus(BigInt.fromI32(1)))
    epoch.deltaCreditSupply = epoch.creditSupply.minus(priorEpoch.creditSupply)
  }
  epoch.save()

  // Update SMA for epochs 600 onward
  if (event.params.epoch >= BigInt.fromI32(600)) {
    let currentEpoch = event.params.epoch.toI32()
    let totalDelta = ZERO_BI

    for (let i = currentEpoch - 600; i < currentEpoch; i++) {
      let historicalEpoch = loadOrCreateEpoch(BigInt.fromI32(i))
      totalDelta = totalDelta.plus(historicalEpoch.deltaCreditSupply)
    }

    epoch.creditSMA = totalDelta.div(BigInt.fromI32(600))
  }
  epoch.save()
}

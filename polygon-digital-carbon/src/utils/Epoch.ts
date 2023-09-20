import { BigInt } from '@graphprotocol/graph-ts'
import { Epoch } from '../../generated/schema'
import { ZERO_BI } from '../../../lib/utils/Decimals'

export function loadOrCreateEpoch(epochNumber: BigInt): Epoch {
  let epoch = Epoch.load(epochNumber.toString())
  if (epoch == null) {
    epoch = new Epoch(epochNumber.toString())
    epoch.epoch = epochNumber
    epoch.creditSupply = ZERO_BI
    epoch.deltaCreditSupply = ZERO_BI
    epoch.creditSMA = ZERO_BI
    epoch.save()
  }
  return epoch
}

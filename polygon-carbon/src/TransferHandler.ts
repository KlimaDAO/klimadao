import { store } from '@graphprotocol/graph-ts'
import { ZERO_ADDRESS } from '../../lib/utils/Constants'
import { Transfer } from '../generated/BCT/ERC20'
import { loadCarbonOffset } from './utils/CarbonOffset'
import { Retired } from '../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { loadOrCreateHolding } from './utils/Holding'
import { ZERO_BI } from '../../lib/utils/Decimals'
import { loadOrCreateAccount } from './utils/Account'
import { saveToucanRetirement } from './RetirementHandler'
import { saveBridge } from './utils/Bridge'

export function handleOffsetTransfer(event: Transfer): void {
  let offset = loadCarbonOffset(event.address)

  if (event.params.from == ZERO_ADDRESS) {
    offset.bridged = offset.bridged.plus(event.params.value)
    offset.currentSupply = offset.currentSupply.plus(event.params.value)
    saveBridge(
      event.transaction.hash,
      event.transactionLogIndex,
      event.address,
      event.params.to,
      event.params.value,
      event.block.timestamp
    )
  } else {
    loadOrCreateAccount(event.params.from)
    let fromHolding = loadOrCreateHolding(event.params.from, event.address)
    fromHolding.amount = fromHolding.amount.minus(event.params.value)
    fromHolding.lastUpdated = event.block.timestamp
    fromHolding.save()

    // Delete holding entity if there are no tokens held
    if (fromHolding.amount == ZERO_BI) {
      store.remove('Holding', fromHolding.id.toHexString())
    }
  }

  if (event.params.to == ZERO_ADDRESS) {
    offset.currentSupply = offset.currentSupply.minus(event.params.value)
  } else {
    loadOrCreateAccount(event.params.to)
    let toHolding = loadOrCreateHolding(event.params.to, event.address)
    toHolding.amount = toHolding.amount.plus(event.params.value)
    toHolding.lastUpdated = event.block.timestamp
    toHolding.save()
  }

  offset.save()
}

export function handlePoolTransfer(event: Transfer): void {
  if (event.params.from != ZERO_ADDRESS) {
    loadOrCreateAccount(event.params.from)
    let fromHolding = loadOrCreateHolding(event.params.from, event.address)
    fromHolding.amount = fromHolding.amount.minus(event.params.value)
    fromHolding.lastUpdated = event.block.timestamp
    fromHolding.save()

    // Delete holding entity if there are no tokens held
    if (fromHolding.amount == ZERO_BI) {
      store.remove('Holding', fromHolding.id.toHexString())
    }
  }

  if (event.params.to != ZERO_ADDRESS) {
    loadOrCreateAccount(event.params.to)
    let toHolding = loadOrCreateHolding(event.params.to, event.address)
    toHolding.amount = toHolding.amount.plus(event.params.value)
    toHolding.lastUpdated = event.block.timestamp
    toHolding.save()
  }
}

export function handleToucanRetired(event: Retired): void {
  saveToucanRetirement(event)
}

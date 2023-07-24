import { store } from '@graphprotocol/graph-ts'
import { MCO2_ERC20_CONTRACT, TOUCAN_CROSS_CHAIN_MESSENGER, ZERO_ADDRESS } from '../../lib/utils/Constants'
import { Transfer } from '../generated/BCT/ERC20'
import { loadCarbonOffset, loadOrCreateCarbonOffset } from './utils/CarbonOffset'
import { Retired, Retired1 as Retired_1_4_0 } from '../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { loadOrCreateHolding } from './utils/Holding'
import { ZERO_BI } from '../../lib/utils/Decimals'
import { loadOrCreateAccount } from './utils/Account'
import { saveToucanRetirement, saveToucanRetirement_1_4_0 } from './RetirementHandler'
import { saveBridge } from './utils/Bridge'
import { CrossChainBridge } from '../generated/schema'
import { checkForCarbonPoolSnapshot, loadOrCreateCarbonPool } from './utils/CarbonPool'
import { checkForCarbonPoolOffsetSnapshot } from './utils/CarbonPoolOffsetBalance'
import { loadOrCreateEcosystem } from './utils/Ecosystem'

export function handleOffsetTransfer(event: Transfer): void {
  if (event.address == MCO2_ERC20_CONTRACT) loadOrCreateCarbonOffset(MCO2_ERC20_CONTRACT, 'MOSS')
  let offset = loadCarbonOffset(event.address)

  if (event.params.from == ZERO_ADDRESS) {
    offset.currentSupply = offset.currentSupply.plus(event.params.value)

    // Do not flag cross chain bridging as an actual bridge event
    let crossChain = CrossChainBridge.load(event.transaction.hash.concatI32(event.transactionLogIndex.toI32() - 1))
    if (crossChain == null) {
      offset.bridged = offset.bridged.plus(event.params.value)

      saveBridge(
        event.transaction.hash,
        event.transactionLogIndex.toI32(),
        event.address,
        event.params.to,
        event.params.value,
        event.block.timestamp
      )
    }
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

  // Update active offsets list
  let ecosystem = loadOrCreateEcosystem()
  let activeIndex = ecosystem.activeOffsets.indexOf(event.address)

  if (offset.currentSupply > ZERO_BI && activeIndex == -1) {
    // Add to the list of active offsets
    let activeOffsets = ecosystem.activeOffsets
    activeOffsets.push(event.address)
    ecosystem.activeOffsets = activeOffsets
    ecosystem.save()
  } else if (offset.currentSupply == ZERO_BI && activeIndex != -1) {
    // Remove from the list of active offsets
    let activeOffsets = ecosystem.activeOffsets
    activeOffsets.splice(activeIndex, 1)
    ecosystem.activeOffsets = activeOffsets
    ecosystem.save()
  }

  offset.save()

  // Also save supply changes for MCO2
  if (event.address == MCO2_ERC20_CONTRACT && (event.params.to == ZERO_ADDRESS || event.params.from == ZERO_ADDRESS)) {
    checkForCarbonPoolSnapshot(event.address, event.block.timestamp, event.block.number)
    checkForCarbonPoolOffsetSnapshot(event.address, event.address, event.block.timestamp, event.block.number)

    let pool = loadOrCreateCarbonPool(event.address)

    if (event.params.to == ZERO_ADDRESS) pool.supply = pool.supply.minus(event.params.value)
    else pool.supply = pool.supply.plus(event.params.value)

    pool.save()
  }
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

export function handleToucanRetired_1_4_0(event: Retired_1_4_0): void {
  saveToucanRetirement_1_4_0(event)
}

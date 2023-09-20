import { store } from '@graphprotocol/graph-ts'
import { MCO2_ERC20_CONTRACT, TOUCAN_CROSS_CHAIN_MESSENGER, ZERO_ADDRESS } from '../../lib/utils/Constants'
import { Transfer } from '../generated/BCT/ERC20'
import { loadCarbonCredit, loadOrCreateCarbonCredit } from './utils/CarbonCredit'
import { Retired, Retired1 as Retired_1_4_0 } from '../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { loadOrCreateHolding } from './utils/Holding'
import { ZERO_BI } from '../../lib/utils/Decimals'
import { loadOrCreateAccount } from './utils/Account'
import { saveToucanRetirement, saveToucanRetirement_1_4_0 } from './RetirementHandler'
import { saveBridge } from './utils/Bridge'
import { CrossChainBridge } from '../generated/schema'
import { checkForCarbonPoolSnapshot, loadOrCreateCarbonPool } from './utils/CarbonPool'
import { checkForCarbonPoolCreditSnapshot } from './utils/CarbonPoolCreditBalance'
import { loadOrCreateEcosystem } from './utils/Ecosystem'
import { recordProvenance } from './utils/Provenance'

export function handleCreditTransfer(event: Transfer): void {
  // Ignore transfers of zero value
  if (event.params.value == ZERO_BI) return

  if (event.address == MCO2_ERC20_CONTRACT) loadOrCreateCarbonCredit(MCO2_ERC20_CONTRACT, 'MOSS')
  let credit = loadCarbonCredit(event.address)

  if (event.params.from == ZERO_ADDRESS) {
    credit.currentSupply = credit.currentSupply.plus(event.params.value)

    // Do not flag cross chain bridging as an actual bridge event
    let crossChain = CrossChainBridge.load(event.transaction.hash.concatI32(event.transactionLogIndex.toI32() - 1))
    if (crossChain == null) {
      credit.bridged = credit.bridged.plus(event.params.value)

      saveBridge(
        event.transaction.hash,
        event.transactionLogIndex.toI32(),
        event.address,
        event.params.to,
        event.params.value,
        event.block.timestamp
      )

      if (event.address != MCO2_ERC20_CONTRACT) {
        recordProvenance(
          event.transaction.hash,
          event.address,
          event.params.from,
          event.params.to,
          'ORIGINATION',
          event.params.value,
          event.block.timestamp
        )

        credit.provenanceCount += 1
      }
    }
  } else {
    loadOrCreateAccount(event.params.from)
    let fromHolding = loadOrCreateHolding(event.params.from, event.address)
    fromHolding.amount = fromHolding.amount.minus(event.params.value)
    fromHolding.lastUpdated = event.block.timestamp
    fromHolding.save()

    // Delete holding entity if there are no tokens held and this isn't needed for provenance records.
    if (fromHolding.amount == ZERO_BI && fromHolding.historicalProvenanceRecords.length == 0) {
      store.remove('Holding', fromHolding.id.toHexString())
    }
  }

  if (event.params.to == ZERO_ADDRESS) {
    credit.currentSupply = credit.currentSupply.minus(event.params.value)
  } else {
    loadOrCreateAccount(event.params.to)
    let toHolding = loadOrCreateHolding(event.params.to, event.address)
    toHolding.amount = toHolding.amount.plus(event.params.value)
    toHolding.lastUpdated = event.block.timestamp
    toHolding.save()

    if (event.params.from != ZERO_ADDRESS && event.address != MCO2_ERC20_CONTRACT) {
      recordProvenance(
        event.transaction.hash,
        event.address,
        event.params.from,
        event.params.to,
        'TRANSFER',
        event.params.value,
        event.block.timestamp
      )

      credit.provenanceCount += 1
    }
  }

  // Update active credits list
  let ecosystem = loadOrCreateEcosystem()
  let activeIndex = ecosystem.activeCredits.indexOf(event.address)

  if (credit.currentSupply.plus(credit.crossChainSupply) > ZERO_BI && activeIndex == -1) {
    // Add to the list of active credits
    let activeCredits = ecosystem.activeCredits
    activeCredits.push(event.address)
    ecosystem.activeCredits = activeCredits
    ecosystem.save()
  } else if (credit.currentSupply.plus(credit.crossChainSupply) == ZERO_BI && activeIndex != -1) {
    // Remove from the list of active credits
    let activeCredits = ecosystem.activeCredits
    activeCredits.splice(activeIndex, 1)
    ecosystem.activeCredits = activeCredits
    ecosystem.save()
  }

  credit.save()

  // Also save supply changes for MCO2
  if (event.address == MCO2_ERC20_CONTRACT && (event.params.to == ZERO_ADDRESS || event.params.from == ZERO_ADDRESS)) {
    checkForCarbonPoolSnapshot(event.address, event.block.timestamp, event.block.number)
    checkForCarbonPoolCreditSnapshot(event.address, event.address, event.block.timestamp, event.block.number)

    let pool = loadOrCreateCarbonPool(event.address)

    if (event.params.to == ZERO_ADDRESS) pool.supply = pool.supply.minus(event.params.value)
    else pool.supply = pool.supply.plus(event.params.value)

    pool.save()
  }
}

export function handlePoolTransfer(event: Transfer): void {
  // Ignore transfers of zero value
  if (event.params.value == ZERO_BI) return

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
  // Ignore retirements of zero value
  if (event.params.tokenId == ZERO_BI) return

  saveToucanRetirement(event)
}

export function handleToucanRetired_1_4_0(event: Retired_1_4_0): void {
  // Ignore retirements of zero value
  if (event.params.amount == ZERO_BI) return

  saveToucanRetirement_1_4_0(event)
}

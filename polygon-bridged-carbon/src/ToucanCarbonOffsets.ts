import { Address } from '@graphprotocol/graph-ts'

import {
  Transfer,
  ToucanCarbonOffsets,
  Retired,
  Retired1 as Retired_1_4_0,
} from '../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'

import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateCarbonOffset } from './utils/CarbonOffsets'
import { loadOrCreateTransaction } from './utils/Transactions'
import { loadOrCreateBridge } from './utils/Bridge'
import { Bridge } from '../generated/schema'
import { loadOrCreateRetire } from './utils/Retire'
import { TCO2 } from './utils/carbon_token/impl/TCO2'
import { CarbonMetricUtils } from './utils/CarbonMetrics'

export function handleTransfer(event: Transfer): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offsetERC20 = ToucanCarbonOffsets.bind(event.address)

  let carbonOffset = loadOrCreateCarbonOffset(transaction, event.address, 'Toucan', 'Verra')

  // Handle Fractionalizing (Mints from briding)
  if (event.params.from == Address.fromString('0x0000000000000000000000000000000000000000')) {
    let bridge = loadOrCreateBridge(carbonOffset, transaction)
    bridge.value = toDecimal(event.params.value, 18)
    bridge.bridger = event.params.to.toHexString()

    bridge.save()

    carbonOffset.totalBridged = carbonOffset.totalBridged.plus(toDecimal(event.params.value, 18))

    //carbonOffset.bridges.push(bridge.id)
  }

  carbonOffset.currentSupply = toDecimal(offsetERC20.totalSupply(), 18)
  carbonOffset.lastUpdate = transaction.timestamp

  carbonOffset.save()
}

export function handleRetired(event: Retired): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offsetERC20 = ToucanCarbonOffsets.bind(event.address)

  let carbonOffset = loadOrCreateCarbonOffset(transaction, event.address, 'Toucan', 'Verra')

  if (carbonOffset.methodology != 'AM0001') {
    let retire = loadOrCreateRetire(carbonOffset, transaction)
    retire.value = toDecimal(event.params.tokenId, 18)
    retire.retiree = event.params.sender.toHexString()

    retire.save()

    carbonOffset.totalRetired = carbonOffset.totalRetired.plus(retire.value)
    CarbonMetricUtils.updateCarbonTokenRetirements(new TCO2(), event.block.timestamp, event.params.tokenId)
  }

  carbonOffset.save()
}

export function handleRetired_1_4_0(event: Retired_1_4_0): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offsetERC20 = ToucanCarbonOffsets.bind(event.address)

  let carbonOffset = loadOrCreateCarbonOffset(transaction, event.address, 'Toucan', 'Verra')

  if (carbonOffset.methodology != 'AM0001') {
    let retire = loadOrCreateRetire(carbonOffset, transaction)
    retire.value = toDecimal(event.params.amount, 18)
    retire.retiree = event.params.sender.toHexString()

    retire.save()

    carbonOffset.totalRetired = carbonOffset.totalRetired.plus(retire.value)
    CarbonMetricUtils.updateCarbonTokenRetirements(new TCO2(), event.block.timestamp, event.params.amount)
  }

  carbonOffset.save()
}

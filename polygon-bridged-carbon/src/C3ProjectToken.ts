import { Address } from '@graphprotocol/graph-ts'

import { Transfer, C3ProjectToken } from '../generated/templates/C3ProjectToken/C3ProjectToken'

import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateCarbonOffset } from './utils/CarbonOffsets'
import { loadOrCreateTransaction } from './utils/Transactions'
import { loadOrCreateBridge } from './utils/Bridge'
import { Bridge } from '../generated/schema'
import { loadOrCreateRetire } from './utils/Retire'
import { CarbonMetricUtils } from './utils/CarbonMetrics'
import { C3T } from './utils/carbon_token/impl/C3T'

export function handleTransfer(event: Transfer): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offsetERC20 = C3ProjectToken.bind(event.address)

  // TODO: read registry name from C3T contract
  let carbonOffset = loadOrCreateCarbonOffset(transaction, event.address, 'C3', '')

  // Handle Fractionalizing (Mints from briding)
  if (event.params.from == Address.fromString('0x0000000000000000000000000000000000000000')) {
    let bridge = loadOrCreateBridge(carbonOffset, transaction)
    bridge.value = toDecimal(event.params.value, 18)
    bridge.bridger = event.params.to.toHexString()

    bridge.save()

    carbonOffset.totalBridged = carbonOffset.totalBridged.plus(toDecimal(event.params.value, 18))

    //carbonOffset.bridges.push(bridge.id)
  }

  // Handle Retirements
  if (event.params.to == Address.fromString('0x0000000000000000000000000000000000000000')) {
    let retire = loadOrCreateRetire(carbonOffset, transaction)
    retire.value = toDecimal(event.params.value, 18)
    retire.retiree = event.params.from.toHexString()

    retire.save()

    carbonOffset.totalRetired = carbonOffset.totalRetired.plus(toDecimal(event.params.value, 18))
    //carbonOffset.retirements.push(retire.id)
    CarbonMetricUtils.updateCarbonTokenRetirements(new C3T(), event.block.timestamp, event.params.value)
  }

  carbonOffset.currentSupply = toDecimal(offsetERC20.totalSupply(), 18)
  carbonOffset.lastUpdate = transaction.timestamp

  carbonOffset.save()
}

import { Address, ethereum } from '@graphprotocol/graph-ts'

import { ERC20, Transfer } from '../generated/MossCarbon/ERC20'
import { Offset } from '../generated/MossInventory/MossCarbonInventoryControl'

import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateCarbonOffset } from './utils/CarbonOffsets'
import { loadOrCreateTransaction } from './utils/Transactions'
import { loadOrCreateBridge } from './utils/Bridge'
import { loadOrCreateRetire } from './utils/Retire'
import { MCO2 as pMCO2 } from './utils/pool_token/impl/MCO2'
import { MCO2 as cMCO2 } from './utils/carbon_token/impl/MCO2'
import { CarbonMetricUtils } from './utils/CarbonMetrics'
import { MCO2_ERC20_CONTRACT } from './utils/Constants'
import { PUBLISHED_VERSION, SCHEMA_VERSION } from './utils/version'
import { SubgraphVersion } from '../../celo-bridged-carbon/generated/schema'

export function handleTransfer(event: Transfer): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offsetERC20 = ERC20.bind(event.address)

  let carbonOffset = loadOrCreateCarbonOffset(transaction, event.address, 'Moss', 'Verra')

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

    CarbonMetricUtils.updateCarbonTokenRetirements(new cMCO2(), event.block.timestamp, event.params.value)
  }

  carbonOffset.currentSupply = toDecimal(offsetERC20.totalSupply(), 18)
  carbonOffset.lastUpdate = transaction.timestamp

  carbonOffset.save()

  CarbonMetricUtils.updatePoolTokenSupply(new pMCO2(event.address), event.block.timestamp)
}

// Add in details from the MossOffset event
export function handleRetire(event: Offset): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offsetERC20 = ERC20.bind(event.address)

  let carbonOffset = loadOrCreateCarbonOffset(transaction, Address.fromString(MCO2_ERC20_CONTRACT), 'Moss', 'Verra')

  let retire = loadOrCreateRetire(carbonOffset, transaction)
  retire.value = toDecimal(event.params.amount, 18)

  let receiptId = event.params.receiptId
  let onBehalfOf = event.params.onBehalfOf

  // Moss has changed how they record retirements details over time
  // In some cases, receiptId contains the name of a client/campaign,
  // and onBehalfOf is blank
  //
  // In other cases, onBehalfOf is blank, receiptID contains a non-transaction unique ID
  // 
  // Finally, sometimes onBehalfOf specifies a beneficiary and receiptID has
  // a full transaction hash in it
  //
  // To capture all these, we combine the two fields with some logic
  if (receiptId != '' && onBehalfOf != '') {
    retire.beneficiary = onBehalfOf + ' ' + receiptId
  }
  else {
    retire.beneficiary = receiptId
  }

  retire.save()
  carbonOffset.save()
}

export function handleSetSubgraphVersion(block: ethereum.Block): void {
  let version = new SubgraphVersion('ethereum-bridged-carbon')
  version.schemaVersion = SCHEMA_VERSION
  version.publishedVersion = PUBLISHED_VERSION
  version.save()
}

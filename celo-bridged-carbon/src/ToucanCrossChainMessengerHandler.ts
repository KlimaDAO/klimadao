import {
  BridgeRequestReceived,
  BridgeRequestSent,
} from '../generated/ToucanCrossChainMessenger/ToucanCrossChainMessenger'
import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateTransaction } from './utils/Transactions'
import { CarbonMetricUtils } from './utils/CarbonMetrics'
import { PoolTokenFactory } from './utils/pool_token/PoolTokenFactory'
import { loadOrCreateCrosschainBridge } from './utils/CrosschainBridge'
import { PUBLISHED_VERSION, SCHEMA_VERSION } from './utils/version'
import { ethereum } from '@graphprotocol/graph-ts'
import { SubgraphVersion } from '../generated/schema'

export function handleBridgeRequestReceived(event: BridgeRequestReceived): void {
  const poolToken = new PoolTokenFactory().getTokenForAddress(event.params.token)
  let transaction = loadOrCreateTransaction(event.transaction, event.block)

  let crosschainBridge = loadOrCreateCrosschainBridge(event.params.token.toHexString(), transaction)
  crosschainBridge.value = toDecimal(event.params.amount, 18)
  crosschainBridge.bridger = event.params.bridger.toHexString()
  crosschainBridge.direction = 'Received'
  crosschainBridge.save()

  CarbonMetricUtils.updatePoolTokenSupply(poolToken, event.block.timestamp)
}

export function handleBridgeRequestSent(event: BridgeRequestSent): void {
  const poolToken = new PoolTokenFactory().getTokenForAddress(event.params.token)
  let transaction = loadOrCreateTransaction(event.transaction, event.block)

  let crosschainBridge = loadOrCreateCrosschainBridge(event.params.token.toHexString(), transaction)
  crosschainBridge.value = toDecimal(event.params.amount, 18)
  crosschainBridge.bridger = event.params.bridger.toHexString()
  crosschainBridge.direction = 'Sent'
  crosschainBridge.save()

  CarbonMetricUtils.updatePoolTokenSupply(poolToken, event.block.timestamp)
}

export function handleSetSubgraphVersion(block: ethereum.Block): void {
  let version = new SubgraphVersion('celo-bridged-carbon')
  version.schemaVersion = SCHEMA_VERSION
  version.publishedVersion = PUBLISHED_VERSION
  version.save()
}

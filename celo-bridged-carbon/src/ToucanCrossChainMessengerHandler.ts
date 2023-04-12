import {
  BridgeRequestReceived,
  BridgeRequestSent,
} from '../generated/ToucanCrossChainMessenger/ToucanCrossChainMessenger'
import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateTransaction } from './utils/Transactions'
import { CarbonMetricUtils } from './utils/CarbonMetrics'
import { PoolTokenFactory } from './utils/pool_token/PoolTokenFactory'
import { loadOrCreateCrosschainBridge } from './utils/CrosschainBridge'

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

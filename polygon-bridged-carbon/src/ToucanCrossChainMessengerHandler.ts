import {
  BridgeRequestReceived,
  BridgeRequestSent,
} from '../generated/ToucanCrossChainMessenger/ToucanCrossChainMessenger'
import { ERC20, Transfer } from '../generated/BaseCarbonTonne/ERC20'
import { loadOrCreateCarbonOffset } from './utils/CarbonOffsets'
import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateTransaction } from './utils/Transactions'
import { CarbonMetricUtils } from './utils/CarbonMetrics'
import { Address, BigInt, log } from '@graphprotocol/graph-ts'
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
  CarbonMetricUtils.updateCrosschainTokenSupply(poolToken, event.block.timestamp, event.params.amount.neg())
}

export function handleBridgeRequestSent(event: BridgeRequestSent): void {
  const poolToken = new PoolTokenFactory().getTokenForAddress(event.params.token)
  let transaction = loadOrCreateTransaction(event.transaction, event.block)

  let crosschainBridge = loadOrCreateCrosschainBridge(event.params.token.toHexString(), transaction)
  crosschainBridge.value = toDecimal(event.params.amount, poolToken.getDecimals())
  crosschainBridge.bridger = event.params.bridger.toHexString()
  crosschainBridge.direction = 'Sent'
  crosschainBridge.save()

  CarbonMetricUtils.updatePoolTokenSupply(poolToken, event.block.timestamp)
  CarbonMetricUtils.updateCrosschainTokenSupply(poolToken, event.block.timestamp, event.params.amount)
}

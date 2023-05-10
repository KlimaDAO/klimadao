import {
  BridgeRequestReceived,
  BridgeRequestSent,
} from '../generated/ToucanCrossChainMessenger/ToucanCrossChainMessenger'
import { ZERO_BI } from '../../lib/utils/Decimals'
import { saveCrossChainOffsetBridge, saveCrossChainPoolBridge } from './utils/CrosschainBridge'
import { updateCarbonOffsetCrossChain } from './utils/CarbonOffset'
import { updateCarbonPoolCrossChain } from './utils/CarbonPool'
import { CarbonOffset } from '../generated/schema'

export function handleBridgeRequestReceived(event: BridgeRequestReceived): void {
  // We are receiving tokens from some other chain

  // Test to see if this is an offset or pool token address
  let offset = CarbonOffset.load(event.params.token)

  if (offset == null) {
    // We are briding a pool token

    updateCarbonPoolCrossChain(event.params.token, ZERO_BI.minus(event.params.amount))
    saveCrossChainPoolBridge(
      event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
      event.transaction.hash,
      event.params.token,
      ZERO_BI.minus(event.params.amount),
      event.params.bridger,
      'RECEIVED',
      event.block.timestamp
    )
  } else {
    // We are briding an offset token

    updateCarbonOffsetCrossChain(event.params.token, ZERO_BI.minus(event.params.amount))
    saveCrossChainOffsetBridge(
      event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
      event.transaction.hash,
      event.params.token,
      ZERO_BI.minus(event.params.amount),
      event.params.bridger,
      'RECEIVED',
      event.block.timestamp
    )
  }
}

export function handleBridgeRequestSent(event: BridgeRequestSent): void {
  // We are sending tokens to some other chain

  // Test to see if this is an offset or pool token address
  let offset = CarbonOffset.load(event.params.token)

  if (offset == null) {
    // We are briding a pool token

    updateCarbonPoolCrossChain(event.params.token, event.params.amount)
    saveCrossChainPoolBridge(
      event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
      event.transaction.hash,
      event.params.token,
      event.params.amount,
      event.params.bridger,
      'SENT',
      event.block.timestamp
    )
  } else {
    // We are briding an offset token

    updateCarbonOffsetCrossChain(event.params.token, event.params.amount)
    saveCrossChainOffsetBridge(
      event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
      event.transaction.hash,
      event.params.token,
      event.params.amount,
      event.params.bridger,
      'SENT',
      event.block.timestamp
    )
  }
}

import {
  BridgeRequestReceived,
  BridgeRequestReceived1 as BridgeRequestReceived_1_1_0,
  BridgeRequestSent,
  BridgeRequestSent1 as BridgeRequestSent_1_1_0,
} from '../generated/ToucanCrossChainMessenger/ToucanCrossChainMessenger'
import { Bridge, Issue } from '../generated/ToucanRegenBridge/ToucanRegenBridge'
import { ZERO_BI } from '../../lib/utils/Decimals'
import { saveCrossChainCreditBridge, saveCrossChainPoolBridge } from './utils/CrossChainBridge'
import { updateCarbonCreditCrossChain } from './utils/CarbonCredit'
import { updateCarbonPoolCrossChain } from './utils/CarbonPool'
import { CarbonCredit } from '../generated/schema'
import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'

export function handleBridgeRequestReceived_1_0_0(event: BridgeRequestReceived): void {
  // We are receiving tokens from some other chain

  processBridgeRequest(
    event.params.token,
    event.params.amount,
    event.transaction.hash,
    event.transactionLogIndex.toI32(),
    event.params.bridger,
    'RECEIVED',
    event.block.timestamp
  )
}

export function handleBridgeRequestSent_1_0_0(event: BridgeRequestSent): void {
  // We are receiving tokens from some other chain

  processBridgeRequest(
    event.params.token,
    event.params.amount,
    event.transaction.hash,
    event.transactionLogIndex.toI32(),
    event.params.bridger,
    'SENT',
    event.block.timestamp
  )
}

export function handleBridgeRequestReceived_1_1_0(event: BridgeRequestReceived_1_1_0): void {
  // We are receiving tokens from some other chain

  processBridgeRequest(
    event.params.token,
    event.params.amount,
    event.transaction.hash,
    event.transactionLogIndex.toI32(),
    event.params.bridger,
    'RECEIVED',
    event.block.timestamp
  )
}

export function handleBridgeRequestSent_1_1_0(event: BridgeRequestSent_1_1_0): void {
  // We are receiving tokens from some other chain

  processBridgeRequest(
    event.params.token,
    event.params.amount,
    event.transaction.hash,
    event.transactionLogIndex.toI32(),
    event.params.bridger,
    'SENT',
    event.block.timestamp
  )
}

export function handleToucanRegenBridge(event: Bridge): void {
  processBridgeRequest(
    event.params.tco2,
    event.params.amount,
    event.transaction.hash,
    event.transactionLogIndex.toI32(),
    event.params.sender,
    'SENT',
    event.block.timestamp
  )
}

export function handleToucanRegenIssue(event: Issue): void {
  processBridgeRequest(
    event.params.tco2,
    event.params.amount,
    event.transaction.hash,
    event.transactionLogIndex.toI32(),
    event.params.recipient,
    'RECEIVED',
    event.block.timestamp
  )
}

function processBridgeRequest(
  token: Address,
  amount: BigInt,
  hash: Bytes,
  logIndex: i32,
  bridger: Address,
  direction: string,
  timestamp: BigInt
): void {
  // We are sending tokens to some other chain

  // Test to see if this is an credit or pool token address
  let credit = CarbonCredit.load(token)

  if (credit == null) {
    // We are briding a pool token

    updateCarbonPoolCrossChain(token, direction == 'SENT' ? amount : ZERO_BI.minus(amount))
    saveCrossChainPoolBridge(hash.concatI32(logIndex), hash, token, amount, bridger, direction, timestamp)
  } else {
    // We are bridging an credit token

    updateCarbonCreditCrossChain(token, direction == 'SENT' ? amount : ZERO_BI.minus(amount))
    saveCrossChainCreditBridge(hash.concatI32(logIndex), hash, token, amount, bridger, direction, timestamp)
  }
}

import { Address } from '@graphprotocol/graph-ts'
import { Transfer } from '../generated/BCT/ERC20'
import { Deposited, Redeemed, TCO2Bridged } from '../generated/BCT/ToucanCarbonPool'
import { handlePoolTransfer } from './TransferHandler'
import { loadOrCreateAccount } from './utils/Account'
import { checkForCarbonPoolSnapshot, loadOrCreateCarbonPool, savePoolDeposit, savePoolRedeem } from './utils/CarbonPool'
import {
  checkForCarbonPoolCreditSnapshot,
  recordCreditBalanceDeposit,
  recordCreditBalanceRedeem,
  updateCreditBalanceCrossChainBridged,
} from './utils/CarbonPoolCreditBalance'
import { createTokenWithCall } from './utils/Token'
import { CarbonMetricUtils } from '../src/utils/CarbonMetrics'
import { BCT } from './utils/pool_token/impl/BCT'
import { NCT } from './utils/pool_token/impl/NCT'
import { BCT_ERC20_CONTRACT, NCT_ERC20_CONTRACT } from './utils/Constants'

export function handleDeposited(event: Deposited): void {
  checkForCarbonPoolSnapshot(event.address, event.block.timestamp, event.block.number)
  checkForCarbonPoolCreditSnapshot(event.address, event.params.erc20Addr, event.block.timestamp, event.block.number)

  // Ensure account entities are created for all addresses
  loadOrCreateAccount(event.transaction.from)

  let pool = loadOrCreateCarbonPool(event.address)

  savePoolDeposit(
    event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
    event.transaction.from,
    event.address,
    event.params.erc20Addr,
    event.params.amount,
    event.block.timestamp,
    event.block.number
  )

  pool.supply = pool.supply.plus(event.params.amount)
  pool.save()

  recordCreditBalanceDeposit(event.address, event.params.erc20Addr, event.params.amount)

  // TODO: make this dynamic so it selects BCT vs NCT based on address
  if (event.address == Address.fromString(BCT_ERC20_CONTRACT)) {
    CarbonMetricUtils.updatePoolTokenSupply(new BCT(event.address), event.block.timestamp)
  } else
  if (event.address == Address.fromString(NCT_ERC20_CONTRACT)) {
    CarbonMetricUtils.updatePoolTokenSupply(new NCT(event.address), event.block.timestamp)
  }
}

export function handleRedeemed(event: Redeemed): void {
  checkForCarbonPoolSnapshot(event.address, event.block.timestamp, event.block.number)
  checkForCarbonPoolCreditSnapshot(event.address, event.params.erc20, event.block.timestamp, event.block.number)

  // Ensure account entities are created for all addresses
  loadOrCreateAccount(event.transaction.from)

  let pool = loadOrCreateCarbonPool(event.address)

  savePoolRedeem(
    event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
    event.params.account,
    event.address,
    event.params.erc20,
    event.params.amount,
    event.block.timestamp,
    event.block.number
  )

  pool.supply = pool.supply.minus(event.params.amount)
  pool.save()

  recordCreditBalanceRedeem(event.address, event.params.erc20, event.params.amount)

  if (event.address == Address.fromString(BCT_ERC20_CONTRACT)) {
    CarbonMetricUtils.updatePoolTokenSupply(new BCT(event.address), event.block.timestamp)
    CarbonMetricUtils.updatePoolTokenRedemptions(new BCT(event.address), event.block.timestamp, event.params.amount)
  } else
  if (event.address == Address.fromString(NCT_ERC20_CONTRACT)) {
    CarbonMetricUtils.updatePoolTokenSupply(new NCT(event.address), event.block.timestamp)
    CarbonMetricUtils.updatePoolTokenRedemptions(new NCT(event.address), event.block.timestamp, event.params.amount)
  }
}

export function handleToucanTCO2Bridged(event: TCO2Bridged): void {
  updateCreditBalanceCrossChainBridged(event.address, event.params.tco2, event.params.amount)
}

export function handleTransfer(event: Transfer): void {
  createTokenWithCall(event.address, event.block)
  handlePoolTransfer(event)
}

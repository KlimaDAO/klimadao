import { Address } from '@graphprotocol/graph-ts'
import { Transfer } from '../generated/BCT/ERC20'
import { Deposited, Redeemed, RedeemedFee } from '../generated/UBO/C3CarbonPool'
import { handlePoolTransfer } from './TransferHandler'
import { loadOrCreateAccount } from './utils/Account'
import { checkForCarbonPoolSnapshot, loadOrCreateCarbonPool, savePoolDeposit, savePoolRedeem } from './utils/CarbonPool'
import {
  checkForCarbonPoolCreditSnapshot,
  recordCreditBalanceDeposit,
  recordCreditBalanceRedeem,
} from './utils/CarbonPoolCreditBalance'
import { createTokenWithCall } from './utils/Token'
import { CarbonMetricUtils } from '../src/utils/CarbonMetrics'
import { UBO } from './utils/pool_token/impl/UBO'
import { NBO } from './utils/pool_token/impl/NBO'
import { UBO_ERC20_CONTRACT, NBO_ERC20_CONTRACT } from './utils/Constants'

export function handleDeposited(event: Deposited): void {
  checkForCarbonPoolSnapshot(event.address, event.block.timestamp, event.block.number)
  checkForCarbonPoolCreditSnapshot(
    event.address,
    event.params.tokenERC2OAddress,
    event.block.timestamp,
    event.block.number
  )

  // Ensure account entities are created for all addresses
  loadOrCreateAccount(event.transaction.from)

  let pool = loadOrCreateCarbonPool(event.address)

  savePoolDeposit(
    event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
    event.transaction.from,
    event.address,
    event.params.tokenERC2OAddress,
    event.params.amount,
    event.block.timestamp,
    event.block.number
  )

  pool.supply = pool.supply.plus(event.params.amount)
  pool.save()

  recordCreditBalanceDeposit(event.address, event.params.tokenERC2OAddress, event.params.amount)

  if (event.address == Address.fromString(UBO_ERC20_CONTRACT)) {
    CarbonMetricUtils.updatePoolTokenSupply(new UBO(event.address), event.block.timestamp)
  } else
  if (event.address == Address.fromString(NBO_ERC20_CONTRACT)) {
    CarbonMetricUtils.updatePoolTokenSupply(new NBO(event.address), event.block.timestamp)
  }
}
export function handleRedeemed(event: Redeemed): void {
  checkForCarbonPoolSnapshot(event.address, event.block.timestamp, event.block.number)
  checkForCarbonPoolCreditSnapshot(
    event.address,
    event.params.tokenERC2OAddress,
    event.block.timestamp,
    event.block.number
  )

  // Ensure account entities are created for all addresses
  loadOrCreateAccount(event.params.walletAddress)

  let pool = loadOrCreateCarbonPool(event.address)

  savePoolRedeem(
    event.transaction.hash.concatI32(event.transactionLogIndex.toI32()),
    event.params.walletAddress,
    event.address,
    event.params.tokenERC2OAddress,
    event.params.amount,
    event.block.timestamp,
    event.block.number
  )

  pool.supply = pool.supply.minus(event.params.amount)
  pool.save()

  recordCreditBalanceRedeem(event.address, event.params.tokenERC2OAddress, event.params.amount)

  if (event.address == Address.fromString(UBO_ERC20_CONTRACT)) {
    CarbonMetricUtils.updatePoolTokenSupply(new UBO(event.address), event.block.timestamp)
    CarbonMetricUtils.updatePoolTokenRedemptions(new UBO(event.address), event.block.timestamp, event.params.amount)
  } else
  if (event.address == Address.fromString(NBO_ERC20_CONTRACT)) {
    CarbonMetricUtils.updatePoolTokenSupply(new NBO(event.address), event.block.timestamp)
    CarbonMetricUtils.updatePoolTokenRedemptions(new NBO(event.address), event.block.timestamp, event.params.amount)
  }
}

export function handleTransfer(event: Transfer): void {
  createTokenWithCall(event.address, event.block)
  handlePoolTransfer(event)
}

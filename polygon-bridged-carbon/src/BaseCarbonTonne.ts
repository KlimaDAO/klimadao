import { BigInt } from '@graphprotocol/graph-ts'
import { Deposited, Redeemed } from '../generated/BaseCarbonTonne/BaseCarbonTonne'
import { loadOrCreateCarbonOffset } from './utils/CarbonOffsets'
import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateTransaction } from './utils/Transactions'
import { loadOrCreateDeposit } from './utils/Deposit'
import { loadOrCreateRedeem } from './utils/Redeem'
import { CarbonMetricUtils } from '../src/utils/CarbonMetrics'
import { BCT } from './utils/pool_token/impl/BCT'

export function handleDeposit(event: Deposited): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offset = loadOrCreateCarbonOffset(transaction, event.params.erc20Addr, 'Toucan', 'Verra')
  let deposit = loadOrCreateDeposit(offset, transaction)

  deposit.depositor = transaction.from.toHexString()
  deposit.pool = '0x2F800Db0fdb5223b3C3f354886d907A671414A7F'
  deposit.value = toDecimal(event.params.amount)

  offset.balanceBCT = offset.balanceBCT.plus(toDecimal(event.params.amount, 18))

  deposit.save()
  offset.save()

  CarbonMetricUtils.updatePoolTokenSupply(new BCT(event.address), event.block.timestamp)
}

export function handleRedeem(event: Redeemed): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offset = loadOrCreateCarbonOffset(transaction, event.params.erc20, 'Toucan', 'Verra')
  let redeem = loadOrCreateRedeem(offset, transaction)

  redeem.redeemer = transaction.from.toHexString()
  redeem.pool = '0x2F800Db0fdb5223b3C3f354886d907A671414A7F'
  redeem.value = toDecimal(event.params.amount)

  offset.balanceBCT = offset.balanceBCT.minus(toDecimal(event.params.amount, 18))

  offset.save()
  redeem.save()

  CarbonMetricUtils.updatePoolTokenSupply(new BCT(event.address), event.block.timestamp)
  CarbonMetricUtils.updatePoolTokenRedemptions(new BCT(event.address), event.block.timestamp, event.params.amount)
}

import { Deposited, Redeemed } from '../generated/UBO/UBO'
import { loadOrCreateCarbonOffset } from './utils/CarbonOffsets'
import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateTransaction } from './utils/Transactions'
import { loadOrCreateDeposit } from './utils/Deposit'
import { loadOrCreateRedeem } from './utils/Redeem'
import { UBO } from './utils/pool_token/impl/UBO'
import { CarbonMetricUtils } from './utils/CarbonMetrics'

export function handleDeposit(event: Deposited): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offset = loadOrCreateCarbonOffset(transaction, event.params.tokenERC2OAddress, 'C3', '')
  let deposit = loadOrCreateDeposit(offset, transaction)

  deposit.depositor = transaction.from.toHexString()
  deposit.pool = '0x2B3eCb0991AF0498ECE9135bcD04013d7993110c'
  deposit.value = toDecimal(event.params.amount)

  offset.balanceUBO = offset.balanceUBO.plus(toDecimal(event.params.amount, 18))

  offset.save()
  deposit.save()

  CarbonMetricUtils.updatePoolTokenSupply(new UBO(event.address), event.block.timestamp)
}

export function handleRedeem(event: Redeemed): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offset = loadOrCreateCarbonOffset(transaction, event.params.tokenERC2OAddress, 'C3', '')
  let redeem = loadOrCreateRedeem(offset, transaction)

  redeem.redeemer = transaction.from.toHexString()
  redeem.pool = '0x2B3eCb0991AF0498ECE9135bcD04013d7993110c'
  redeem.value = toDecimal(event.params.amount)

  offset.balanceUBO = offset.balanceUBO.minus(toDecimal(event.params.amount, 18))

  offset.save()
  redeem.save()

  CarbonMetricUtils.updatePoolTokenSupply(new UBO(event.address), event.block.timestamp)
  CarbonMetricUtils.updatePoolTokenRedemptions(new UBO(event.address), event.block.timestamp, event.params.amount)
}

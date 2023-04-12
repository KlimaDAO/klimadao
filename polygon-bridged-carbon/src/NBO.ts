import { Deposited, Redeemed } from '../generated/NBO/NBO'
import { loadOrCreateCarbonOffset } from './utils/CarbonOffsets'
import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateTransaction } from './utils/Transactions'
import { loadOrCreateDeposit } from './utils/Deposit'
import { loadOrCreateRedeem } from './utils/Redeem'
import { CarbonMetricUtils } from './utils/CarbonMetrics'
import { NBO } from './utils/pool_token/impl/NBO'

export function handleDeposit(event: Deposited): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offset = loadOrCreateCarbonOffset(transaction, event.params.tokenERC2OAddress, 'C3', '')
  let deposit = loadOrCreateDeposit(offset, transaction)

  deposit.depositor = transaction.from.toHexString()
  deposit.pool = '0x6BCa3B77C1909Ce1a4Ba1A20d1103bDe8d222E48'
  deposit.value = toDecimal(event.params.amount)

  offset.balanceNBO = offset.balanceNBO.plus(toDecimal(event.params.amount, 18))

  offset.save()
  deposit.save()

  CarbonMetricUtils.updatePoolTokenSupply(new NBO(event.address), event.block.timestamp)
}

export function handleRedeem(event: Redeemed): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offset = loadOrCreateCarbonOffset(transaction, event.params.tokenERC2OAddress, 'C3', '')
  let redeem = loadOrCreateRedeem(offset, transaction)

  redeem.redeemer = transaction.from.toHexString()
  redeem.pool = '0x6BCa3B77C1909Ce1a4Ba1A20d1103bDe8d222E48'
  redeem.value = toDecimal(event.params.amount)

  offset.balanceNBO = offset.balanceNBO.minus(toDecimal(event.params.amount, 18))

  offset.save()
  redeem.save()

  CarbonMetricUtils.updatePoolTokenSupply(new NBO(event.address), event.block.timestamp)
  CarbonMetricUtils.updatePoolTokenRedemptions(new NBO(event.address), event.block.timestamp, event.params.amount)
}

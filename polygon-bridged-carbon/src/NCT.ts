import { Deposited, Redeemed } from '../generated/NCT/NCT'
import { loadOrCreateCarbonOffset } from './utils/CarbonOffsets'
import { toDecimal } from '../../lib/utils/Decimals'
import { loadOrCreateTransaction } from './utils/Transactions'
import { loadOrCreateDeposit } from './utils/Deposit'
import { loadOrCreateRedeem } from './utils/Redeem'
import { NCT } from './utils/pool_token/impl/NCT'
import { CarbonMetricUtils } from './utils/CarbonMetrics'

export function handleDeposit(event: Deposited): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offset = loadOrCreateCarbonOffset(transaction, event.params.erc20Addr, 'Toucan', 'Verra')
  let deposit = loadOrCreateDeposit(offset, transaction)

  deposit.depositor = transaction.from.toHexString()
  deposit.pool = '0xD838290e877E0188a4A44700463419ED96c16107'
  deposit.value = toDecimal(event.params.amount)

  offset.balanceNCT = offset.balanceNCT.plus(toDecimal(event.params.amount, 18))

  offset.save()
  deposit.save()

  CarbonMetricUtils.updatePoolTokenSupply(new NCT(event.address), event.block.timestamp)
}

export function handleRedeem(event: Redeemed): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let offset = loadOrCreateCarbonOffset(transaction, event.params.erc20, 'Toucan', 'Verra')
  let redeem = loadOrCreateRedeem(offset, transaction)

  redeem.redeemer = transaction.from.toHexString()
  redeem.pool = '0xD838290e877E0188a4A44700463419ED96c16107'
  redeem.value = toDecimal(event.params.amount)

  offset.balanceNCT = offset.balanceNCT.minus(toDecimal(event.params.amount, 18))

  offset.save()
  redeem.save()

  CarbonMetricUtils.updatePoolTokenSupply(new NCT(event.address), event.block.timestamp)
  CarbonMetricUtils.updatePoolTokenRedemptions(new NCT(event.address), event.block.timestamp, event.params.amount)
}

import { BigDecimal } from '@graphprotocol/graph-ts'

import { BondCreated, BondRedeemed } from '../generated/MCO2BondV1/MCO2BondV1'
import { Deposit } from '../generated/schema'
import { loadOrCreateTransaction } from "./utils/Transactions"
import { loadOrCreateKlimate, updateKlimateBalance } from "./utils/Klimate"
import { toDecimal } from "./utils/Decimals"
import { MCO2_BOND_TOKEN } from './utils/Constants'
import { loadOrCreateToken } from './utils/Tokens'
import { loadOrCreateRedemption } from './utils/Redemption'
import { createDailyBondRecord } from './utils/DailyBond'
import { getKLIMAMCO2Rate } from './utils/Price'


export function handleDeposit(event: BondCreated): void {
    let klimate = loadOrCreateKlimate(event.transaction.from)
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let token = loadOrCreateToken(MCO2_BOND_TOKEN)

    let value = toDecimal(event.params.deposit, 18)
    let payout = toDecimal(event.params.payout, 9)
    let deposit = new Deposit(transaction.id)
    deposit.transaction = transaction.id
    deposit.klimate = klimate.id
    deposit.payout = payout
    deposit.value = value
    deposit.bondPrice = toDecimal(event.params.priceInUSD, 18)
    deposit.discount = getKLIMAMCO2Rate().div(deposit.bondPrice).minus(BigDecimal.fromString('1')).times(BigDecimal.fromString('100'))
    deposit.token = token.id;
    deposit.timestamp = transaction.timestamp;
    deposit.save()

    createDailyBondRecord(deposit.timestamp, token, deposit.payout, deposit.value)
    updateKlimateBalance(klimate, transaction)
}

export function handleRedeem(event: BondRedeemed): void {
    let klimate = loadOrCreateKlimate(event.params.recipient)
    let transaction = loadOrCreateTransaction(event.transaction, event.block)

    let redemption = loadOrCreateRedemption(event.transaction)
    redemption.transaction = transaction.id
    redemption.klimate = klimate.id
    redemption.token = loadOrCreateToken(MCO2_BOND_TOKEN).id;
    redemption.timestamp = transaction.timestamp;
    redemption.save()
    updateKlimateBalance(klimate, transaction)
}

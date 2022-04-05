import { BondCreated, BondRedeemed, ControlVariableAdjustment } from '../generated/BCTBondV1/BondV1'
import { Deposit } from '../generated/schema'
import { loadOrCreateTransaction } from "./utils/Transactions"
import { toDecimal } from "../../lib/utils/Decimals"
import { KLIMABCT_LPBOND_TOKEN, KLIMA_BCT_PAIR } from '../../lib/utils/Constants'
import { loadOrCreateRedemption } from './utils/Redemption'
import { createDailyBondRecord, updateBondBCV } from './utils/DailyBond'
import { getDiscountedPairCO2, getKLIMABCTRate } from './utils/Price'
import { loadOrCreateBonder } from './utils/Bonder'


export function handleDeposit(event: BondCreated): void {
    let bonder = loadOrCreateBonder(event.transaction.from)
    let transaction = loadOrCreateTransaction(event.transaction, event.block)

    let deposit = new Deposit(transaction.id)
    deposit.token = KLIMABCT_LPBOND_TOKEN;
    deposit.transaction = transaction.id
    deposit.bonder = bonder.id
    deposit.payout = toDecimal(event.params.payout, 9)
    deposit.bondPrice = toDecimal(event.params.priceInUSD, 18)
    deposit.marketPrice = getKLIMABCTRate()
    deposit.discount = (deposit.marketPrice.minus(deposit.bondPrice)).div(deposit.marketPrice)
    deposit.tokenValue = toDecimal(event.params.deposit, 18)
    deposit.carbonCustodied = getDiscountedPairCO2(event.params.deposit, KLIMA_BCT_PAIR)
    deposit.timestamp = transaction.timestamp;
    deposit.save()

    bonder.totalCarbonCustodied = bonder.totalCarbonCustodied.plus(deposit.carbonCustodied)
    bonder.totalKlimaBonded = bonder.totalKlimaBonded.plus(deposit.payout)
    bonder.save()

    createDailyBondRecord(deposit.timestamp, deposit.token, deposit.payout, deposit.tokenValue, deposit.carbonCustodied)
}

export function handleRedeem(event: BondRedeemed): void {
    let bonder = loadOrCreateBonder(event.params.recipient)
    let transaction = loadOrCreateTransaction(event.transaction, event.block)

    let redemption = loadOrCreateRedemption(event.transaction, transaction.timestamp)
    redemption.transaction = transaction.id
    redemption.bonder = bonder.id
    redemption.token = KLIMABCT_LPBOND_TOKEN
    redemption.payout = toDecimal(event.params.payout, 9)
    redemption.payoutRemaining = toDecimal(event.params.remaining, 9)
    redemption.timestamp = transaction.timestamp;
    redemption.save()
}

export function handleBCV(event: ControlVariableAdjustment): void {
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    updateBondBCV(transaction.timestamp, KLIMABCT_LPBOND_TOKEN, event.params.newBCV)
}

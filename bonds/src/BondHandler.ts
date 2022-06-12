import { BondCreated, BondRedeemed, ControlVariableAdjustment } from '../generated/BCTBondV1/BondV1'
import { Deposit } from '../generated/schema'
import { loadOrCreateTransaction } from "./utils/Transactions"
import { loadOrCreateRedemption } from './utils/Redemption'
import { createDailyBondRecord, updateBondBCV } from './utils/DailyBond'
import { loadOrCreateBonder } from './utils/Bonder'
import { KLIMA } from '../../lib/tokens/impl/KLIMA'
import { BondFactory } from '../../lib/bonds/BondFactory'


export function handleDeposit(event: BondCreated): void {
    let bonder = loadOrCreateBonder(event.transaction.from)
    let transaction = loadOrCreateTransaction(event.transaction, event.block)

    const bond = new BondFactory().getBondForAddress(event.address)
    const klimaToken = new KLIMA()

    let deposit = new Deposit(transaction.id)
    deposit.token = bond.getBondName()
    deposit.transaction = transaction.id
    deposit.bonder = bonder.id
    deposit.payout = klimaToken.getFormattedPrice(event.params.payout)
    deposit.daoFee = bond.getDaoFeeForBondPayout(deposit.payout)
    deposit.bondPrice = bond.parseBondPrice(event.params.priceInUSD)
    deposit.marketPrice = bond.getToken().getMarketPrice(event.block.number)
    deposit.discount = (deposit.marketPrice.minus(deposit.bondPrice)).div(deposit.bondPrice)
    deposit.tokenValue = bond.parseBondTokenValueFormatted(event.params.deposit)
    deposit.carbonCustodied = bond.getCarbonCustodied(event.params.deposit) 
    deposit.timestamp = transaction.timestamp;
    deposit.save()

    bonder.totalCarbonCustodied = bonder.totalCarbonCustodied.plus(deposit.carbonCustodied)
    bonder.totalKlimaBonded = bonder.totalKlimaBonded.plus(deposit.payout)
    bonder.totalKlimaMintedForDao = bonder.totalKlimaMintedForDao.plus(deposit.daoFee)
    bonder.save()


    createDailyBondRecord(deposit.timestamp, deposit.token, deposit.payout, deposit.daoFee, deposit.tokenValue, deposit.carbonCustodied)
}

export function handleRedeem(event: BondRedeemed): void {
    let bonder = loadOrCreateBonder(event.params.recipient)
    let transaction = loadOrCreateTransaction(event.transaction, event.block)

    const bond = new BondFactory().getBondForAddress(event.address)
    const klimaToken = new KLIMA()

    let redemption = loadOrCreateRedemption(event.transaction, transaction.timestamp)
    redemption.transaction = transaction.id
    redemption.bonder = bonder.id
    redemption.token = bond.getBondName()
    redemption.payout = klimaToken.getFormattedPrice(event.params.payout)
    redemption.payoutRemaining = klimaToken.getFormattedPrice(event.params.remaining)
    redemption.timestamp = transaction.timestamp;
    redemption.save()
}

export function handleBCV(event: ControlVariableAdjustment): void {
    const bond = new BondFactory().getBondForAddress(event.address)

    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    updateBondBCV(transaction.timestamp, bond.getBondName(), event.params.newBCV)
}

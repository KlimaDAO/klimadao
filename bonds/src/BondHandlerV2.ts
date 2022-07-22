import { KLIMA } from '../../lib/tokens/impl/KLIMA'
import { CreateMarket, CloseMarket, Bond, KlimaProV2, Tuned } from '../generated/BondV2/KlimaProV2'
import { TokenFactory } from '../../lib/tokens/TokenFactory'
import { Deposit, Market } from '../generated/schema'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import  * as constants  from '../../lib/utils/Constants'
import { createTerm, loadTerm } from './utils/Term'
import { loadOrCreateBonder } from './utils/Bonder'
import { loadOrCreateTransaction } from './utils/Transactions'
import { createDailyBondRecord, updateBondBCV } from './utils/DailyBond'
import { loadMarket } from './utils/Market'
import { BondFactory } from '../../lib/bonds/BondFactory'


export function handleMarketCreated(event: CreateMarket): void {
    const klima = new KLIMA()
    const baseToken = new TokenFactory().getTokenForAddress(event.params.baseToken)

    const market = new Market(event.params.id.toString())
    market.isActive = true
    market.quoteToken = klima.getTokenName()
    market.quoteTokenAddress = event.params.quoteToken
    market.baseToken = baseToken.getTokenName()
    market.baseTokenAddress = event.params.baseToken
    market.purchased = BigDecimal.zero()
    market.sold = BigDecimal.zero()

    let bondV2Contract = KlimaProV2.bind(Address.fromString(constants.PRO_KLIMA_V2))
    let markets_call = bondV2Contract.try_markets(event.params.id)
    if (markets_call.reverted) {
        throw new Error("Market not found - Market ID: "+ event.params.id.toString());
    }
    market.initialCapacity = baseToken.getFormattedPrice(markets_call.value.value5)
    market.maxPayout = baseToken.getFormattedPrice(markets_call.value.value8)

    const term = createTerm(event.params.id)
    term.save()

    market.term = term.id
    market.save()
}

export function handleMarketClosed(event: CloseMarket): void {
    const market = loadMarket(event.params.id)
    market.isActive = false
    market.save()
}

export function handleBond(event: Bond): void {
    let bonder = loadOrCreateBonder(event.transaction.from)
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let market = loadMarket(event.params.id)
    let term = loadTerm(event.params.id)

    const bond = new BondFactory().getBondForBaseTokenAddress(Address.fromBytes(market.baseTokenAddress))

    let deposit = new Deposit(transaction.id)
    deposit.token = bond.getBondName()
    deposit.bondVersion = constants.BOND_VERSION_V2
    deposit.transaction = transaction.id
    deposit.market = event.params.id.toString()
    deposit.bonder = bonder.id
    deposit.daoFee = BigDecimal.zero()
    deposit.bondPrice = BigDecimal.fromString("1").div(bond.parseBondPrice(event.params.price))
    deposit.marketPrice = bond.getToken().getMarketPrice(event.block.number)
    deposit.discount = (deposit.bondPrice.minus(deposit.marketPrice)).div(deposit.marketPrice)
    deposit.tokenValue = bond.parseBondTokenValueFormatted(event.params.amount)
    deposit.payout = deposit.tokenValue.times(deposit.bondPrice)
    deposit.carbonCustodied = BigDecimal.zero()
    deposit.timestamp = transaction.timestamp;
    deposit.startDate = deposit.timestamp
    deposit.endDate = term.isFixedTerm ? deposit.startDate.plus(term.termExpiration) : term.termExpiration
    deposit.expirationDate = deposit.endDate
    deposit.save()

    market.purchased = market.purchased.plus(deposit.tokenValue)
    market.sold = market.sold.plus(deposit.payout)
    market.save()

    createDailyBondRecord(deposit.bondVersion, deposit.timestamp, deposit.token, deposit.payout, deposit.daoFee, deposit.tokenValue, deposit.carbonCustodied)
}

export function handleTuned(event: Tuned): void {
    const market = loadMarket(event.params.id)
    const baseToken = new TokenFactory().getTokenForAddress(Address.fromBytes(market.baseTokenAddress))

    let bondV2Contract = KlimaProV2.bind(Address.fromString(constants.PRO_KLIMA_V2))
    let markets_call = bondV2Contract.try_markets(event.params.id)
    if (markets_call.reverted) {
        throw new Error("Market not found - Market ID: "+ event.params.id.toString());
    }

    market.maxPayout = baseToken.getFormattedPrice(markets_call.value.value8)
    market.save()

    //Control variable is updated only if new control variable is bigger than the current
    if (event.params.oldControlVariable.lt(event.params.newControlVariable)) {
        const terms = loadTerm(event.params.id)
        const bond = new BondFactory().getBondForBaseTokenAddress(Address.fromBytes(market.baseTokenAddress))
        terms.controlVariable = event.params.newControlVariable
        terms.save()

        let transaction = loadOrCreateTransaction(event.transaction, event.block)
        updateBondBCV(transaction.timestamp, bond.getBondName(), event.params.newControlVariable)    
    }
}
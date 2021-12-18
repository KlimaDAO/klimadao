import { BigDecimal, BigInt, Address } from '@graphprotocol/graph-ts'
import { Klimate, KlimateBalance } from '../../generated/schema'
import { dayFromTimestamp } from './Dates';

export function loadOrCreateKlimateBalance(klimate: Klimate, timestamp: BigInt): KlimateBalance {
    let id = timestamp.toString() + klimate.id

    let klimateBalance = KlimateBalance.load(id)
    if (klimateBalance == null) {
        klimateBalance = new KlimateBalance(id)
        klimateBalance.klimate = klimate.id
        klimateBalance.timestamp = timestamp
        klimateBalance.sklimaBalance = BigDecimal.fromString("0")
        klimateBalance.klimaBalance = BigDecimal.fromString("0")
        klimateBalance.bondBalance = BigDecimal.fromString("0")
        klimateBalance.dollarBalance = BigDecimal.fromString("0")
        klimateBalance.stakes = []
        klimateBalance.bonds = []
        klimateBalance.save()
    }
    return klimateBalance as KlimateBalance
}


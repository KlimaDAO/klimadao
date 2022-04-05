import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

import { DailyBond } from '../../generated/schema'
import { dayFromTimestamp } from '../../../lib/utils/Dates';

export function loadOrCreateDailyBond(timestamp: BigInt, token: string): DailyBond {
    let day_timestamp = dayFromTimestamp(timestamp)
    let id = day_timestamp + token
    let dailyBond = DailyBond.load(id)
    if (dailyBond == null) {
        dailyBond = new DailyBond(id)
        dailyBond.timestamp = BigInt.fromString(day_timestamp)
        dailyBond.token = token
        dailyBond.payout = BigDecimal.fromString('0')
        dailyBond.tokenValue = BigDecimal.fromString('0')
        dailyBond.carbonCustodied = BigDecimal.fromString('0')
        dailyBond.BCV = BigInt.fromString('0')
        dailyBond.save()
    }
    return dailyBond as DailyBond
}

export function createDailyBondRecord(timestamp: BigInt, token: string, payout: BigDecimal,
    tokenValue: BigDecimal, carbonCustodied: BigDecimal): void {
    let dailyBond = loadOrCreateDailyBond(timestamp, token)
    dailyBond.payout = dailyBond.payout.plus(payout)
    dailyBond.tokenValue = dailyBond.tokenValue.plus(tokenValue)
    dailyBond.carbonCustodied = dailyBond.carbonCustodied.plus(carbonCustodied)
    dailyBond.save()
}

export function updateBondBCV(timestamp: BigInt, token: string, bcv_value: BigInt): void {
    let dailyBond = loadOrCreateDailyBond(timestamp, token)
    dailyBond.BCV = bcv_value
    dailyBond.save()
}

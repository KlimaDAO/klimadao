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
        dailyBond.payout = BigDecimal.zero()
        dailyBond.daoFee = BigDecimal.zero()
        dailyBond.tokenValue = BigDecimal.zero()
        dailyBond.carbonCustodied = BigDecimal.zero()
        dailyBond.BCV = BigInt.zero()
        dailyBond.save()
    }
    return dailyBond as DailyBond
}

export function createDailyBondRecord(timestamp: BigInt, token: string, payout: BigDecimal,
    daoFee: BigDecimal, tokenValue: BigDecimal, carbonCustodied: BigDecimal): void {
    let dailyBond = loadOrCreateDailyBond(timestamp, token)
    dailyBond.payout = dailyBond.payout.plus(payout)
    dailyBond.tokenValue = dailyBond.tokenValue.plus(tokenValue)
    dailyBond.daoFee = dailyBond.daoFee.plus(daoFee)
    dailyBond.carbonCustodied = dailyBond.carbonCustodied.plus(carbonCustodied)
    dailyBond.save()
}

export function updateBondBCV(timestamp: BigInt, token: string, bcv_value: BigInt): void {
    let dailyBond = loadOrCreateDailyBond(timestamp, token)
    dailyBond.BCV = bcv_value
    dailyBond.save()
}

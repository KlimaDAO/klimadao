import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

import { DailyBond, Token } from '../../generated/schema'
import { dayFromTimestamp } from './Dates';

export function loadOrCreateDailyBond(timestamp: BigInt, token: Token): DailyBond{
    let day_timestamp = dayFromTimestamp(timestamp)
    let id = day_timestamp+token.id
    let dailyBond = DailyBond.load(id)
    if (dailyBond == null) {
        dailyBond = new DailyBond(id)
        dailyBond.amount = new BigDecimal(new BigInt(0))
        dailyBond.value = new BigDecimal(new BigInt(0))
        dailyBond.timestamp = BigInt.fromString(day_timestamp)
        dailyBond.token = token.id
        dailyBond.save()
    }
    return dailyBond as DailyBond
}

export function createDailyBondRecord(timestamp: BigInt, token: Token, amount: BigDecimal, value: BigDecimal): void{
    let dailyBond = loadOrCreateDailyBond(timestamp, token)
    dailyBond.amount = dailyBond.amount.plus(amount)
    dailyBond.value = dailyBond.amount.plus(value)
    dailyBond.save()
}
import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

import { DailyStakingReward, Token } from '../../generated/schema'
import { dayFromTimestamp } from './Dates';
import { getOHMUSDRate } from './Price';

export function loadOrCreateDailyStakingReward(timestamp: BigInt): DailyStakingReward{
    let day_timestamp = dayFromTimestamp(timestamp)
    let id = day_timestamp
    let dailySR = DailyStakingReward.load(id)
    if (dailySR == null) {
        dailySR = new DailyStakingReward(id)
        dailySR.amount = new BigDecimal(new BigInt(0))
        dailySR.value = new BigDecimal(new BigInt(0))
        dailySR.timestamp = BigInt.fromString(day_timestamp)
        dailySR.save()
    }
    return dailySR as DailyStakingReward
}

export function createDailyStakingReward(timestamp: BigInt, amount: BigDecimal): void{
    let dailySR = loadOrCreateDailyStakingReward(timestamp)
    dailySR.amount = dailySR.amount.plus(amount)
    dailySR.value = dailySR.amount.times(getOHMUSDRate())
    dailySR.save()
}
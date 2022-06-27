import { VestingMetricUtils } from './utils/VestingMetrics'
import { loadOrCreateLock } from './utils/Lock'
import { dayFromTimestamp } from '../../lib/utils/Dates'
import { toDecimal } from "../../lib/utils/Decimals"

import * as constants from '../../lib/utils/Constants'
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { Co2Compound } from "./utils/vesting_platforms/impl/Co2Compound"
import { Transfer } from "../../lib/generated/ERC20"
import { convertToWsKLIMA } from './utils/Convert'



export function handleTransfers(event: Transfer): void {

    const co2Compound = new Co2Compound(Address.fromString(constants.NFT_CO2COMPOUND_CONTRACT))

    if (event.params.to == co2Compound.getContractAddress()) {
    const lock = loadOrCreateLock(event.transaction.hash.toHexString())
    
    lock.platform = co2Compound.getPlatformName()
    lock.token = co2Compound.getTokenName()
    lock.timestamp = event.block.timestamp
    lock.contractAddress = event.address
    lock.stakerAddress = event.params.from
    lock.startedAt = event.block.timestamp
    lock.maturityDate = BigInt.fromString("-1")
    lock.lockedInSeconds = BigInt.fromString("-1")
    lock.lockedAmount = convertToWsKLIMA(toDecimal(event.params.value, 9))

    lock.save()

    VestingMetricUtils.updateLockMetric(co2Compound, event.block.timestamp, lock.lockedAmount)

    //Update vesting metrics for future maturity date
    const maturityTimestampString = dayFromTimestamp(lock.maturityDate);
    VestingMetricUtils.updateMaturityMetric(co2Compound, BigInt.fromString(maturityTimestampString), lock.lockedAmount)
    }
}
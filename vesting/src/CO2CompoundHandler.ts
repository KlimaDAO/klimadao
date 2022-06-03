import { Transfer } from "../generated/CO2CompoundNFT/CO2Compound"
import { VestingMetricUtils } from './utils/VestingMetrics'
import { loadOrCreateLock } from './utils/Lock'
import { dayFromTimestamp } from '../../lib/utils/Dates'
import * as constants from '../../lib/utils/Constants'
import { BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts"
import { Co2Compound } from "./utils/vesting_platforms/impl/Co2Compound"



export function handleTransfers(event: Transfer): void {

    // Handle Mints
    if (event.params.from == Address.fromString(constants.ZERO_ADDRESS)) {

    const lock = loadOrCreateLock(event.transaction.hash.toHexString())
    const co2Compount = new Co2Compound(event.address)
    lock.platform = constants.NFT_CO2COMPOUND_PLATFORM
    lock.token = constants.NFT_CO2COMPOUND_TOKEN
    lock.timestamp = event.block.timestamp
    lock.contractAddress = event.address
    lock.stakerAddress = event.params.to
    lock.startedAt = event.block.timestamp
    lock.maturityDate = BigInt.fromString("-1")
    lock.lockedInSeconds = BigInt.fromString("-1")
    lock.lockedAmount = BigDecimal.fromString("1")

    lock.save()

    VestingMetricUtils.updateLock(co2Compount, event.block.timestamp, lock.lockedAmount)

    //Update vesting metrics for future maturity date
    const maturityTimestampString = dayFromTimestamp(lock.maturityDate);
    VestingMetricUtils.updateMaturity(co2Compount, BigInt.fromString(maturityTimestampString), lock.lockedAmount)
    }
}

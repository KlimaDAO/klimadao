import { StakeLocked } from "../generated/C3WsKlimaVesting/C3WsKlimaVesting"
import { loadOrCreateVesting, loadOrCreateAggregateVestingInfo } from './utils/Vest'
import { dayFromTimestamp } from '../../lib/utils/Dates'
import { toDecimal } from "../../lib/utils/Decimals"
import * as constants from '../../lib/utils/Constants'
import { BigInt, Bytes } from "@graphprotocol/graph-ts"



export function handleStakeLocked(event: StakeLocked): void {
    const vesting = loadOrCreateVesting(event.transaction)

    vesting.platform = constants.C3_PLATFORM
    vesting.token = constants.C3_WSKLIMA_TOKEN
    vesting.contractAddress = Bytes.fromHexString(constants.C3_WSKLIMA_CONTRACT)
    vesting.stakerAddress = event.params.source_address
    vesting.startedAt = event.block.timestamp
    vesting.maturityDate = event.block.timestamp.plus(event.params.secs)
    vesting.lockedInSeconds = event.params.secs
    vesting.lockedAmount = toDecimal(event.params.amount, 18)

    vesting.save()

    const maturityDateString = dayFromTimestamp(vesting.maturityDate)
    const id = maturityDateString + vesting.platform + vesting.token
    const aggregateVestingInfo = loadOrCreateAggregateVestingInfo(id)

    aggregateVestingInfo.platform = vesting.platform
    aggregateVestingInfo.token = vesting.token
    aggregateVestingInfo.maturityDate = maturityDateString
    aggregateVestingInfo.totalUnlocks = aggregateVestingInfo.totalUnlocks.plus(BigInt.fromString("1"))
    aggregateVestingInfo.totalAmount = aggregateVestingInfo.totalAmount.plus(vesting.lockedAmount)

    aggregateVestingInfo.save()
}

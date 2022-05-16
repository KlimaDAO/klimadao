import { BigInt, BigDecimal, Bytes, ethereum} from "@graphprotocol/graph-ts"
import { AggregatedVestingInfo, Vesting } from "../../generated/schema"


export function loadOrCreateAggregateVestingInfo(id: string): AggregatedVestingInfo {

    let aggregatedVestingInfo = AggregatedVestingInfo.load(id)

    if (aggregatedVestingInfo == null) {
        aggregatedVestingInfo = new AggregatedVestingInfo(id)
        aggregatedVestingInfo.token = ""
        aggregatedVestingInfo.platform = ""
        aggregatedVestingInfo.maturityDate = ""
        aggregatedVestingInfo.totalUnlocks = BigInt.fromString('0')
        aggregatedVestingInfo.totalAmount = BigDecimal.fromString('0')

        aggregatedVestingInfo.save()
    }

    return aggregatedVestingInfo as AggregatedVestingInfo
}

export function loadOrCreateVesting(transaction: ethereum.Transaction) : Vesting {

    let vesting = Vesting.load(transaction.hash.toHexString())

    if (vesting == null) {
        vesting = new Vesting(transaction.hash.toHexString())
        vesting.token = ""
        vesting.platform = ""
        vesting.contractAddress = Bytes.empty()
        vesting.stakerAddress = Bytes.empty()
        vesting.startedAt = BigInt.fromString('0')
        vesting.maturityDate = BigInt.fromString('0')
        vesting.lockedInSeconds = BigInt.fromString('0')
        vesting.lockedAmount = BigDecimal.fromString('0')

        vesting.save()
    }

    return vesting as Vesting
}

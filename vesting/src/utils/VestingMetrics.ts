import { BigInt, BigDecimal, log } from "@graphprotocol/graph-ts";
import { dayFromTimestamp } from "../../../lib/utils/Dates";
import { VestingMetric } from "../../generated/schema";
import { getKlimaIndex } from "./Convert";
import { ILockable } from "./vesting_platforms/ILockable";

const DAY_IN_SECONDS: BigInt = BigInt.fromString("86400")

export class VestingMetricUtils {
  static updateLockMetric(lockableToken: ILockable, timestamp: BigInt, amount: BigDecimal): void {
    const vestingMetric = this.loadOrCreateVestingMetric(timestamp, lockableToken)
    vestingMetric.dailyLockCount =  vestingMetric.dailyLockCount.plus(BigInt.fromI32(1))
    vestingMetric.dailyLockAmount =  vestingMetric.dailyLockAmount.plus(amount)
    vestingMetric.index = getKlimaIndex()

    vestingMetric.totalAmountLocked = vestingMetric.totalAmountLocked.plus(amount)
    vestingMetric.totalSupply = lockableToken.getTotalSupply()
  
    vestingMetric.save()
  }

  static updateUnlockMetric(lockableToken: ILockable, timestamp: BigInt, amount: BigDecimal): void {
    const vestingMetric = this.loadOrCreateVestingMetric(timestamp, lockableToken)
    vestingMetric.dailyUnlockCount =  vestingMetric.dailyUnlockCount.plus(BigInt.fromI32(1))
    vestingMetric.dailyUnlockAmount =  vestingMetric.dailyUnlockAmount.plus(amount)
    vestingMetric.index = getKlimaIndex()
  
    vestingMetric.totalAmountLocked = vestingMetric.totalAmountLocked.minus(amount)
    vestingMetric.totalSupply = lockableToken.getTotalSupply()

    vestingMetric.save()
  }

  static updateMaturityMetric(lockableToken: ILockable, timestamp: BigInt, amount: BigDecimal): void {
    const vestingMetric = this.loadOrCreateFutureVestingMetric(timestamp, lockableToken)
    vestingMetric.dailyMaturityCount = vestingMetric.dailyMaturityCount.plus(BigInt.fromI32(1))  
    vestingMetric.dailyMaturityAmount = vestingMetric.dailyMaturityAmount.plus(amount)
  
    vestingMetric.save()
  }

  private static loadOrCreateFutureVestingMetric(timestamp: BigInt, lockableToken: ILockable): VestingMetric {
    const dayTimestampString = dayFromTimestamp(timestamp);
    const id = this.generateId(dayTimestampString, lockableToken.getContractAddress().toHexString())
  
    let vestingMetric = VestingMetric.load(id);
    if (vestingMetric == null) {
      vestingMetric = this.returnInitializedVestingMetric(id, timestamp, lockableToken)
      vestingMetric.inFuture = true
      vestingMetric.save();
    }
  
    return vestingMetric as VestingMetric;
  }
  
  private static loadOrCreateVestingMetric(timestamp: BigInt, lockableToken: ILockable): VestingMetric {
    
    const dayTimestampString = dayFromTimestamp(timestamp);
    const dayTimestamp = BigInt.fromString(dayTimestampString)
  
    const id = this.generateId(dayTimestampString, lockableToken.getContractAddress().toHexString())
    let vestingMetric = VestingMetric.load(id);
  
    if (vestingMetric == null || vestingMetric.inFuture) {
      const mostRecentVestingMetric = this.getTheMostRecentVestingMetric(dayTimestamp, lockableToken);
      vestingMetric = vestingMetric?  vestingMetric : this.returnInitializedVestingMetric(id, dayTimestamp, lockableToken)
      vestingMetric.totalAmountLocked = mostRecentVestingMetric.totalAmountLocked
      vestingMetric.inFuture = false
      vestingMetric.save();
    }
  
    return vestingMetric;
  }
  
  private static getTheMostRecentVestingMetric(timestamp: BigInt, lockableToken: ILockable): VestingMetric {
    const prevTimestamp = timestamp.minus(DAY_IN_SECONDS)
    const prevDayTimestampString = dayFromTimestamp(prevTimestamp);
    const id = this.generateId(prevDayTimestampString, lockableToken.getContractAddress().toHexString())
  
      if (prevTimestamp.lt(lockableToken.getInitTimestamp())) {
        return this.returnInitializedVestingMetric(id, prevTimestamp, lockableToken)
      } else {
        const vestingMetric = VestingMetric.load(id)
          if (vestingMetric != null) {
            return vestingMetric  
          } else {
          return this.getTheMostRecentVestingMetric(prevTimestamp, lockableToken)
          }
      }
  }
  
  private static generateId(timestampString: string, address: string): string {
    const id = timestampString + "_" + address;
  
    return id
  }
  
 private static returnInitializedVestingMetric(id: string, timestamp: BigInt, lockableToken: ILockable): VestingMetric {
    let vestingMetrics = new VestingMetric(id);
    vestingMetrics.timestamp = timestamp
    vestingMetrics.contractAddress = lockableToken.getContractAddress().toHexString()
  
    vestingMetrics.token = lockableToken.getTokenName();
    vestingMetrics.platform = lockableToken.getPlatformName();
    vestingMetrics.dailyLockCount = BigInt.zero();
    vestingMetrics.dailyLockAmount = BigDecimal.zero();
    vestingMetrics.dailyUnlockCount = BigInt.zero();
    vestingMetrics.dailyUnlockAmount = BigDecimal.zero();
    vestingMetrics.dailyMaturityCount = BigInt.zero();
    vestingMetrics.dailyMaturityAmount = BigDecimal.zero();
    vestingMetrics.totalAmountLocked = BigDecimal.zero()
    vestingMetrics.totalSupply = BigDecimal.zero()
    vestingMetrics.index = BigDecimal.zero()
  
    return vestingMetrics as VestingMetric;
  }

}

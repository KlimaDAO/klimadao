import { StakeLocked, WithdrawLocked } from '../generated/C3WsKlimaVesting/C3WsKlimaVesting'
import { SubgraphVersion } from '../generated/schema'
import { SCHEMA_VERSION, PUBLISHED_VERSION } from './utils/version'
import { VestingMetricUtils } from './utils/VestingMetrics'
import { loadOrCreateLock, loadOrCreateUnlock } from './utils/Lock'
import { dayTimestamp } from '../../lib/utils/Dates'
import { toDecimal } from '../../lib/utils/Decimals'
import { BigInt } from '@graphprotocol/graph-ts'
import { Lock } from '../generated/schema'
import { C3Wsklima } from './utils/vesting_platforms/impl/C3Wsklima'
import { ethereum } from '@graphprotocol/graph-ts'
export function handleStakeLocked(event: StakeLocked): void {
  const lock = loadOrCreateLock(event.params.kek_id.toHexString())

  const c3Wsklima = new C3Wsklima(event.address)
  lock.platform = c3Wsklima.getPlatformName()
  lock.timestamp = event.block.timestamp
  lock.token = c3Wsklima.getTokenName()
  lock.contractAddress = event.address
  lock.stakerAddress = event.params.source_address
  lock.startedAt = event.block.timestamp
  lock.maturityDate = event.block.timestamp.plus(event.params.secs)
  lock.lockedInSeconds = event.params.secs
  lock.lockedAmount = toDecimal(event.params.amount, 18)

  lock.save()

  //Update vesting metrics for today
  VestingMetricUtils.updateLockMetric(c3Wsklima, event.block.timestamp, lock.lockedAmount)

  //Update vesting metrics for future maturity date
  const maturityTimestampString = dayTimestamp(lock.maturityDate)
  VestingMetricUtils.updateMaturityMetric(c3Wsklima, BigInt.fromString(maturityTimestampString), lock.lockedAmount)
}

export function handleWithdrawLocked(event: WithdrawLocked): void {
  const unlock = loadOrCreateUnlock(event.transaction)
  const c3Wsklima = new C3Wsklima(event.address)

  const lockId = event.params.kek_id.toHexString()
  const lock = Lock.load(lockId)
  if (lock == null) {
    throw new Error('Failed to retrieve a Lock record for Unlock - ID: ' + lockId)
  }

  unlock.platform = c3Wsklima.getPlatformName()
  unlock.timestamp = event.block.timestamp
  unlock.token = c3Wsklima.getTokenName()
  unlock.contractAddress = event.address
  unlock.stakerAddress = event.params.user
  unlock.maturityDate = lock.maturityDate
  unlock.amount = toDecimal(event.params.amount, 18)

  unlock.save()

  //Update vesting metrics for today
  VestingMetricUtils.updateUnlockMetric(c3Wsklima, event.block.timestamp, lock.lockedAmount)
}

export function handleSetSubgraphVersion(block: ethereum.Block): void {
  let version = new SubgraphVersion('vesting')
  version.schemaVersion = SCHEMA_VERSION
  version.publishedVersion = PUBLISHED_VERSION
  version.save()
}

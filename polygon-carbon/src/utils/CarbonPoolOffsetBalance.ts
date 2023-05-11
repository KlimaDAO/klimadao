import { Address, BigInt } from '@graphprotocol/graph-ts'
import { CarbonPoolOffsetBalance, CarbonPoolOffsetBalanceDailySnapshot } from '../../generated/schema'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { dayFromTimestamp } from '../../../lib/utils/Dates'

export function loadOrCreateCarbonPoolOffsetBalance(
  poolAddress: Address,
  offsetAddress: Address
): CarbonPoolOffsetBalance {
  let balance = CarbonPoolOffsetBalance.load(poolAddress.concat(offsetAddress))
  if (balance) return balance as CarbonPoolOffsetBalance

  balance = new CarbonPoolOffsetBalance(poolAddress.concat(offsetAddress))
  balance.pool = poolAddress
  balance.offset = offsetAddress
  balance.balance = ZERO_BI
  balance.deposited = ZERO_BI
  balance.redeemed = ZERO_BI
  balance.lastSnapshotDayID = 0
  balance.nextSnapshotDayID = 0
  balance.save()
  return balance as CarbonPoolOffsetBalance
}

export function recordOffsetBalanceDeposit(poolAddress: Address, offsetAddress: Address, amount: BigInt): void {
  let balance = loadOrCreateCarbonPoolOffsetBalance(poolAddress, offsetAddress)
  balance.balance = balance.balance.plus(amount)
  balance.deposited = balance.deposited.plus(amount)
  balance.save()
}

export function recordOffsetBalanceRedeem(poolAddress: Address, offsetAddress: Address, amount: BigInt): void {
  let balance = loadOrCreateCarbonPoolOffsetBalance(poolAddress, offsetAddress)
  balance.balance = balance.balance.minus(amount)
  balance.redeemed = balance.redeemed.plus(amount)
  balance.save()
}

/** Snapshot management */

export function checkForCarbonPoolOffsetSnapshot(
  poolAddress: Address,
  offsetAddress: Address,
  timestamp: BigInt,
  blockNumber: BigInt
): void {
  // We check for the prior period snapshot and then take one if needed
  let dayID = dayFromTimestamp(timestamp)

  let offsetBalance = loadOrCreateCarbonPoolOffsetBalance(poolAddress, offsetAddress)

  if (dayID > offsetBalance.lastSnapshotDayID) {
    offsetBalance.nextSnapshotDayID = dayID
    offsetBalance.save()
  }

  if (dayID - 1 > offsetBalance.lastSnapshotDayID)
    takeCarbonPoolOffsetBalanceDailySnapshot(
      poolAddress,
      offsetAddress,
      offsetBalance.nextSnapshotDayID,
      timestamp,
      blockNumber
    )
}

export function takeCarbonPoolOffsetBalanceDailySnapshot(
  poolAddress: Address,
  offsetAddress: Address,
  dayID: i32,
  timestamp: BigInt,
  blockNumber: BigInt
): void {
  let offsetBalance = loadOrCreateCarbonPoolOffsetBalance(poolAddress, offsetAddress)

  if (offsetBalance.lastSnapshotDayID == 0) {
    loadOrCreateCarbonPoolOffsetBalanceDailySnapshot(poolAddress, offsetAddress, dayID, timestamp, blockNumber)
    offsetBalance.lastSnapshotDayID = dayID
    offsetBalance.save()
    return
  }

  let priorDay = offsetBalance.lastSnapshotDayID
  offsetBalance.lastSnapshotDayID = dayID
  offsetBalance.save()

  let priorSnapshot = loadOrCreateCarbonPoolOffsetBalanceDailySnapshot(
    poolAddress,
    offsetAddress,
    priorDay,
    timestamp,
    blockNumber
  )
  let newSnapshot = loadOrCreateCarbonPoolOffsetBalanceDailySnapshot(
    poolAddress,
    offsetAddress,
    offsetBalance.lastSnapshotDayID,
    timestamp,
    blockNumber
  )

  newSnapshot.deltaBalance = offsetBalance.balance.minus(priorSnapshot.balance)
  newSnapshot.deltaDeposited = offsetBalance.deposited.minus(priorSnapshot.deposited)
  newSnapshot.deltaRedeemed = offsetBalance.redeemed.minus(priorSnapshot.redeemed)
  newSnapshot.lastUpdateTimestamp = timestamp
  newSnapshot.lastUpdateBlockNumber = blockNumber
  newSnapshot.save()
}

export function loadOrCreateCarbonPoolOffsetBalanceDailySnapshot(
  poolAddress: Address,
  offsetAddress: Address,
  dayID: i32,
  timestamp: BigInt,
  blockNumber: BigInt
): CarbonPoolOffsetBalanceDailySnapshot {
  let snapshot = CarbonPoolOffsetBalanceDailySnapshot.load(poolAddress.concat(offsetAddress).concatI32(dayID))
  if (snapshot == null) {
    let offsetBalance = loadOrCreateCarbonPoolOffsetBalance(poolAddress, offsetAddress)
    snapshot = new CarbonPoolOffsetBalanceDailySnapshot(poolAddress.concat(offsetAddress).concatI32(dayID))
    snapshot.pool = poolAddress
    snapshot.offset = offsetAddress
    snapshot.offsetBalance = poolAddress.concat(offsetAddress)
    snapshot.dayID = dayID
    snapshot.poolSnapshot = poolAddress.concatI32(dayID)
    snapshot.balance = offsetBalance.balance
    snapshot.deposited = offsetBalance.deposited
    snapshot.redeemed = offsetBalance.redeemed
    snapshot.deltaBalance = ZERO_BI
    snapshot.deltaDeposited = ZERO_BI
    snapshot.deltaRedeemed = ZERO_BI
    snapshot.lastUpdateTimestamp = timestamp
    snapshot.lastUpdateBlockNumber = blockNumber
    snapshot.save()
  }
  return snapshot as CarbonPoolOffsetBalanceDailySnapshot
}

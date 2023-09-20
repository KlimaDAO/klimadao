import { Address, BigInt } from '@graphprotocol/graph-ts'
import { CarbonPoolCreditBalance, CarbonPoolCreditBalanceDailySnapshot } from '../../generated/schema'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { dayFromTimestamp } from '../../../lib/utils/Dates'

export function loadOrCreateCarbonPoolCreditBalance(
  poolAddress: Address,
  creditAddress: Address
): CarbonPoolCreditBalance {
  let balance = CarbonPoolCreditBalance.load(poolAddress.concat(creditAddress))
  if (balance) return balance as CarbonPoolCreditBalance

  balance = new CarbonPoolCreditBalance(poolAddress.concat(creditAddress))
  balance.pool = poolAddress
  balance.credit = creditAddress
  balance.balance = ZERO_BI
  balance.crossChainSupply = ZERO_BI
  balance.deposited = ZERO_BI
  balance.redeemed = ZERO_BI
  balance.lastSnapshotDayID = 0
  balance.nextSnapshotDayID = 0
  balance.save()
  return balance as CarbonPoolCreditBalance
}

export function recordCreditBalanceDeposit(poolAddress: Address, creditAddress: Address, amount: BigInt): void {
  let balance = loadOrCreateCarbonPoolCreditBalance(poolAddress, creditAddress)
  balance.balance = balance.balance.plus(amount)
  balance.deposited = balance.deposited.plus(amount)
  balance.save()
}

export function recordCreditBalanceRedeem(poolAddress: Address, creditAddress: Address, amount: BigInt): void {
  let balance = loadOrCreateCarbonPoolCreditBalance(poolAddress, creditAddress)
  balance.balance = balance.balance.minus(amount)
  balance.redeemed = balance.redeemed.plus(amount)
  balance.save()
}

export function updateCreditBalanceCrossChainBridged(
  poolAddress: Address,
  creditAddress: Address,
  amount: BigInt
): void {
  let balance = loadOrCreateCarbonPoolCreditBalance(poolAddress, creditAddress)
  balance.balance = balance.balance.minus(amount)
  balance.crossChainSupply = balance.crossChainSupply.plus(amount)
  balance.save()
}

/** Snapshot management */

export function checkForCarbonPoolCreditSnapshot(
  poolAddress: Address,
  creditAddress: Address,
  timestamp: BigInt,
  blockNumber: BigInt
): void {
  // We check for the prior period snapshot and then take one if needed
  let dayID = dayFromTimestamp(timestamp)

  let creditBalance = loadOrCreateCarbonPoolCreditBalance(poolAddress, creditAddress)

  if (dayID > creditBalance.lastSnapshotDayID) {
    creditBalance.nextSnapshotDayID = dayID
    creditBalance.save()
  }

  if (dayID - 1 > creditBalance.lastSnapshotDayID)
    takeCarbonPoolCreditBalanceDailySnapshot(
      poolAddress,
      creditAddress,
      creditBalance.nextSnapshotDayID,
      timestamp,
      blockNumber
    )
}

export function takeCarbonPoolCreditBalanceDailySnapshot(
  poolAddress: Address,
  creditAddress: Address,
  dayID: i32,
  timestamp: BigInt,
  blockNumber: BigInt
): void {
  let creditBalance = loadOrCreateCarbonPoolCreditBalance(poolAddress, creditAddress)

  if (creditBalance.lastSnapshotDayID == 0) {
    loadOrCreateCarbonPoolCreditBalanceDailySnapshot(poolAddress, creditAddress, dayID, timestamp, blockNumber)
    creditBalance.lastSnapshotDayID = dayID
    creditBalance.save()
    return
  }

  let priorDay = creditBalance.lastSnapshotDayID
  creditBalance.lastSnapshotDayID = dayID
  creditBalance.save()

  let priorSnapshot = loadOrCreateCarbonPoolCreditBalanceDailySnapshot(
    poolAddress,
    creditAddress,
    priorDay,
    timestamp,
    blockNumber
  )
  let newSnapshot = loadOrCreateCarbonPoolCreditBalanceDailySnapshot(
    poolAddress,
    creditAddress,
    creditBalance.lastSnapshotDayID,
    timestamp,
    blockNumber
  )

  newSnapshot.deltaBalance = creditBalance.balance.minus(priorSnapshot.balance)
  newSnapshot.deltaCrossChainSupply = creditBalance.crossChainSupply.minus(priorSnapshot.crossChainSupply)
  newSnapshot.deltaDeposited = creditBalance.deposited.minus(priorSnapshot.deposited)
  newSnapshot.deltaRedeemed = creditBalance.redeemed.minus(priorSnapshot.redeemed)
  newSnapshot.lastUpdateTimestamp = timestamp
  newSnapshot.lastUpdateBlockNumber = blockNumber
  newSnapshot.save()
}

export function loadOrCreateCarbonPoolCreditBalanceDailySnapshot(
  poolAddress: Address,
  creditAddress: Address,
  dayID: i32,
  timestamp: BigInt,
  blockNumber: BigInt
): CarbonPoolCreditBalanceDailySnapshot {
  let snapshot = CarbonPoolCreditBalanceDailySnapshot.load(poolAddress.concat(creditAddress).concatI32(dayID))
  if (snapshot == null) {
    let creditBalance = loadOrCreateCarbonPoolCreditBalance(poolAddress, creditAddress)
    snapshot = new CarbonPoolCreditBalanceDailySnapshot(poolAddress.concat(creditAddress).concatI32(dayID))
    snapshot.pool = poolAddress
    snapshot.credit = creditAddress
    snapshot.creditBalance = poolAddress.concat(creditAddress)
    snapshot.dayID = dayID
    snapshot.poolSnapshot = poolAddress.concatI32(dayID)
    snapshot.balance = creditBalance.balance
    snapshot.crossChainSupply = creditBalance.crossChainSupply
    snapshot.deposited = creditBalance.deposited
    snapshot.redeemed = creditBalance.redeemed
    snapshot.deltaBalance = ZERO_BI
    snapshot.deltaCrossChainSupply = ZERO_BI
    snapshot.deltaDeposited = ZERO_BI
    snapshot.deltaRedeemed = ZERO_BI
    snapshot.lastUpdateTimestamp = timestamp
    snapshot.lastUpdateBlockNumber = blockNumber
    snapshot.save()
  }
  return snapshot as CarbonPoolCreditBalanceDailySnapshot
}

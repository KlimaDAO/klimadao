import { BigInt } from '@graphprotocol/graph-ts'

export function dayTimestamp(timestamp: BigInt): string {
  let day_ts = timestamp.toI32() - (timestamp.toI32() % 86400)
  return day_ts.toString()
}

export function hourTimestamp(timestamp: BigInt): string {
  let day_ts = timestamp.toI32() - (timestamp.toI32() % 3600)
  return day_ts.toString()
}

export function dayFromTimestamp(timestamp: BigInt): i32 {
  let day_ts = timestamp.toI32() - (timestamp.toI32() % 86400)
  return day_ts / 86400
}

export function hourFromTimestamp(timestamp: BigInt): i32 {
  let day_ts = timestamp.toI32() - (timestamp.toI32() % 3600)
  return day_ts / 3600
}

export function stdYearFromTimestamp(timestamp: BigInt): i32 {
  let date = new Date(<i64>timestamp.toI32() * 1000)
  return date.getUTCFullYear()
}

export function stdYearFromTimestampNew(timestamp: BigInt): i32 {
  let date = new Date(timestamp.toI64() * 1000)
  return date.getUTCFullYear()
}

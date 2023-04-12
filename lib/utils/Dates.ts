import { BigInt } from '@graphprotocol/graph-ts'

export function stdYearFromTimestamp(timestamp: BigInt): string {
  let date = new Date(<i64>timestamp.toI32() * 1000)
  return date.getUTCFullYear().toString()
}

export function dayFromTimestamp(timestamp: BigInt): string {
  let day_ts = timestamp.toI32() - (timestamp.toI32() % 86400)
  return day_ts.toString()
}

export function hourFromTimestamp(timestamp: BigInt): string {
  let day_ts = timestamp.toI32() - (timestamp.toI32() % 3600)
  return day_ts.toString()
}

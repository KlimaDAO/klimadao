import { BigInt, log } from "@graphprotocol/graph-ts";
import { Token } from "../../generated/schema";

export function dayFromTimestamp(timestamp: BigInt): string {
    let day_ts = timestamp.toI32() - (timestamp.toI32() % 86400)
    return day_ts.toString()
}

export function hourFromTimestamp(timestamp: BigInt): string {
    let day_ts = timestamp.toI32() - (timestamp.toI32() % 3600)
    return day_ts.toString()
}
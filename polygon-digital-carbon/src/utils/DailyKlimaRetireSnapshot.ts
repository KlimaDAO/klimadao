import { BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { DailyKlimaRetireSnapshot } from '../../generated/schema'

export function loadOrCreateDailyKlimaRetireSnapshot(id: string): DailyKlimaRetireSnapshot {
  let retire = DailyKlimaRetireSnapshot.load(id)
  if (retire == null) {
    retire = new DailyKlimaRetireSnapshot(id)
    retire.timestamp = BigInt.zero()
    retire.pool = new Bytes(0x0)
    retire.credit = new Bytes(0x0)
    retire.amount = BigInt.fromString('0')
    retire.feeAmount = BigInt.fromString('0')
  }

  return retire as DailyKlimaRetireSnapshot
}

import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { DailyKlimaRetirement } from '../../generated/schema'

export function loadOrCreateDailyKlimaRetirement(id: string): DailyKlimaRetirement {
  let retire = DailyKlimaRetirement.load(id)
  if (retire == null) {
    retire = new DailyKlimaRetirement(id)
    retire.timestamp = BigInt.zero()
    retire.pool = ''
    retire.offset = ''
    retire.amount = BigDecimal.fromString('0')
    retire.feeAmount = BigDecimal.fromString('0')
  }

  return retire as DailyKlimaRetirement
}

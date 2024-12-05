import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { KlimaRetire } from '../../generated/schema'

export function saveKlimaRetire(
  account: Address,
  retire: Bytes,
  index: BigInt,
  feeAmount: BigInt,
  specific: boolean
): KlimaRetire {
  let id = account.concatI32(index.toI32())
  let klimaRetire = KlimaRetire.load(id)
  if (klimaRetire == null) {
    klimaRetire = new KlimaRetire(id)
    klimaRetire.retire = retire
    klimaRetire.index = index
    klimaRetire.feeAmount = feeAmount
    klimaRetire.specific = specific
    klimaRetire.save()
  }
  return klimaRetire as KlimaRetire
}

export function loadKlimaRetire(id: String): KlimaRetire | null {
  return KlimaRetire.load(Bytes.fromUTF8(id))
}

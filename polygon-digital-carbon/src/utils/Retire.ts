import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { Retire } from '../../generated/schema'

export function saveRetire(
  id: Bytes,
  offset: Address,
  pool: Address,
  source: string,
  amount: BigInt,
  beneficiary: Address,
  beneficiaryName: string,
  retiringAddress: Address,
  retiringName: string,
  timestamp: BigInt,
  bridgeID: string | null
): void {
  let retire = new Retire(id)
  retire.offset = offset
  retire.pool = pool
  retire.source = source
  retire.amount = amount
  retire.beneficiaryAddress = beneficiary
  retire.beneficiaryName = beneficiaryName
  retire.retiringAddress = retiringAddress
  retire.retiringName = retiringName
  retire.timestamp = timestamp
  if (bridgeID !== null) retire.bridgeID = bridgeID
  retire.save()
}

export function loadRetire(id: Bytes): Retire {
  return Retire.load(id) as Retire
}

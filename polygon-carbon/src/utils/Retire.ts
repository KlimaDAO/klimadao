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
  timestamp: BigInt
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
  retire.save()
}

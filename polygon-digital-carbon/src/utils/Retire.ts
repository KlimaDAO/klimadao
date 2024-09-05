import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { Retire } from '../../generated/schema'
import { updateProvenanceForRetirement } from './Provenance'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { convertToAmountTonnes } from '../../utils/helpers'

export function saveRetire(
  id: Bytes,
  credit: Bytes,
  creditAddress: Address,
  pool: Address,
  source: string,
  amount: BigInt,
  beneficiary: Address,
  beneficiaryName: string,
  retiringAddress: Address,
  retiringName: string,
  timestamp: BigInt,
  hash: Bytes,
  bridgeID: string | null = null,
  message: string = ''
): void {

  let retire = new Retire(id)
  retire.credit = credit
  retire.pool = pool
  retire.source = source
  retire.amount = amount
  retire.amountTonnes = convertToAmountTonnes(creditAddress, amount)
  retire.beneficiaryAddress = beneficiary
  retire.beneficiaryName = beneficiaryName
  retire.beneficiaryLocation = ''
  retire.consumptionCountryCode = ''
  retire.consumptionPeriodStart = ZERO_BI
  retire.consumptionPeriodEnd = ZERO_BI
  retire.retirementMessage = message
  retire.retiringAddress = retiringAddress
  retire.retiringName = retiringName
  retire.timestamp = timestamp
  retire.hash = hash
  retire.provenance = updateProvenanceForRetirement(credit)
  if (bridgeID !== null) retire.bridgeID = bridgeID

  retire.save()
}

export function loadRetire(id: Bytes): Retire {
  return Retire.load(id) as Retire
}

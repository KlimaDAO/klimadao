import { Address, BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { CarbonProject, Retire } from '../../generated/schema'
import { updateProvenanceForRetirement } from './Provenance'
import { ZERO_BD, ZERO_BI } from '../../../lib/utils/Decimals'
import { loadCarbonCredit } from './CarbonCredit'

export function saveRetire(
  id: Bytes,
  credit: Bytes,
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
  retire.amountTonnes = amount.toBigDecimal()
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

  let loadedCredit = loadCarbonCredit(credit)
  let project = CarbonProject.load(loadedCredit.project)

  if (project !== null && project.registry == 'CCS') {
    let amountBD = retire.amount.toBigDecimal()
    retire.amountTonnes = amountBD.div(BigDecimal.fromString('1000'))
  } else {
    retire.amountTonnes = retire.amount.toBigDecimal()
  }
  retire.save()
}

export function loadRetire(id: Bytes): Retire {
  return Retire.load(id) as Retire
}

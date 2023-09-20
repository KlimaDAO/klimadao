import { Address, BigInt } from '@graphprotocol/graph-ts'
import { stdYearFromTimestamp } from '../../../lib/utils/Dates'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { C3ProjectToken } from '../../generated/templates/C3ProjectToken/C3ProjectToken'
import { CarbonCredit } from '../../generated/schema'
import { ToucanCarbonOffsets } from '../../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { loadOrCreateCarbonProject } from './CarbonProject'
import { MethodologyCategories } from './MethodologyCategories'

export function loadOrCreateCarbonCredit(tokenAddress: Address, bridge: string): CarbonCredit {
  let credit = CarbonCredit.load(tokenAddress)
  if (credit == null) {
    credit = new CarbonCredit(tokenAddress)
    credit.bridgeProtocol = bridge
    credit.project = ''
    credit.vintage = 1970
    credit.currentSupply = ZERO_BI
    credit.crossChainSupply = ZERO_BI
    credit.bridged = ZERO_BI
    credit.retired = ZERO_BI
    credit.provenanceCount = 0
    credit.lastBatchId = ZERO_BI
    credit.save()
  }
  return credit as CarbonCredit
}

export function loadCarbonCredit(tokenAddress: Address): CarbonCredit {
  return CarbonCredit.load(tokenAddress) as CarbonCredit
}

export function updateCarbonCreditWithCall(tokenAddress: Address): CarbonCredit {
  let credit = loadCarbonCredit(tokenAddress)
  if (credit.bridgeProtocol == 'TOUCAN') credit = updateToucanCall(tokenAddress, credit)
  else if (credit.bridgeProtocol == 'C3') credit = updateC3Call(tokenAddress, credit)

  return credit
}

function updateToucanCall(tokenAddress: Address, carbonCredit: CarbonCredit): CarbonCredit {
  let carbonCreditERC20 = ToucanCarbonOffsets.bind(tokenAddress)

  let attributes = carbonCreditERC20.getAttributes()
  let project = loadOrCreateCarbonProject('VERRA', attributes.value0.projectId)

  carbonCredit.project = project.id
  carbonCredit.vintage = stdYearFromTimestamp(attributes.value1.startTime)
  carbonCredit.save()

  project.methodologies = attributes.value0.methodology
  project.category = MethodologyCategories.getMethodologyCategory(project.methodologies)
  project.save()
  return carbonCredit
}

function updateC3Call(tokenAddress: Address, carbonCredit: CarbonCredit): CarbonCredit {
  let carbonCreditERC20 = C3ProjectToken.bind(tokenAddress)

  let attributes = carbonCreditERC20.getProjectInfo()

  // Map to enum values
  let registry = ''
  if (attributes.registry == 'VCS') registry = 'VERRA'
  else if (attributes.registry == 'GS') registry = 'GOLD_STANDARD'

  let project = loadOrCreateCarbonProject(registry, attributes.registry + '-' + attributes.project_id)

  carbonCredit.project = project.id
  let vintageParsed = BigInt.fromI64(Date.UTC(carbonCreditERC20.getVintage().toI32(), 0) / 1000)

  carbonCredit.vintage = stdYearFromTimestamp(vintageParsed)
  carbonCredit.save()

  project.methodologies = attributes.methodology
  project.category = MethodologyCategories.getMethodologyCategory(project.methodologies)
  project.save()
  return carbonCredit
}

export function updateCarbonCreditCrossChain(creditAddress: Address, amount: BigInt): void {
  let credit = loadCarbonCredit(creditAddress)
  credit.crossChainSupply = credit.crossChainSupply.plus(amount)
  credit.save()
}

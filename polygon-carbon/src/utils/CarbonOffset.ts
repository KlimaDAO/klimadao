import { Address, BigInt } from '@graphprotocol/graph-ts'
import { stdYearFromTimestamp } from '../../../lib/utils/Dates'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { C3ProjectToken } from '../../generated/templates/C3ProjectToken/C3ProjectToken'
import { CarbonOffset } from '../../generated/schema'
import { ToucanCarbonOffsets } from '../../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { loadOrCreateCarbonProject } from './CarbonProject'
import { MethodologyCategories } from './MethodologyCategories'

export function createCarbonOffset(tokenAddress: Address, bridge: string): void {
  let offset = CarbonOffset.load(tokenAddress)
  if (offset == null) {
    offset = new CarbonOffset(tokenAddress)
    offset.bridgeProtocol = bridge
    offset.project = ''
    offset.vintage = 1970
    offset.currentSupply = ZERO_BI
    offset.bridged = ZERO_BI
    offset.retired = ZERO_BI
    offset.save()
  }
}

export function loadCarbonOffset(tokenAddress: Address): CarbonOffset {
  return CarbonOffset.load(tokenAddress) as CarbonOffset
}

export function updateCarbonOffsetWithCall(tokenAddress: Address, bridge: string): CarbonOffset {
  let offset = loadCarbonOffset(tokenAddress)
  if (offset.bridgeProtocol == 'TOUCAN') offset = updateToucanCall(tokenAddress, offset)
  else if (offset.bridgeProtocol == 'C3') offset = updateC3Call(tokenAddress, offset)

  return offset
}

function updateToucanCall(tokenAddress: Address, carbonOffset: CarbonOffset): CarbonOffset {
  let carbonOffsetERC20 = ToucanCarbonOffsets.bind(tokenAddress)

  let attributes = carbonOffsetERC20.getAttributes()
  let project = loadOrCreateCarbonProject('VERRA', attributes.value0.projectId)

  carbonOffset.project = project.id
  carbonOffset.vintage = stdYearFromTimestamp(attributes.value1.startTime)
  carbonOffset.save()

  project.methodologies = attributes.value0.methodology
  project.category = MethodologyCategories.getMethodologyCategory(project.methodologies)
  project.save()
  return carbonOffset
}

function updateC3Call(tokenAddress: Address, carbonOffset: CarbonOffset): CarbonOffset {
  let carbonOffsetERC20 = C3ProjectToken.bind(tokenAddress)

  let attributes = carbonOffsetERC20.getProjectInfo()

  // Map to enum values
  let registry = ''
  if (attributes.registry == 'VCS') registry = 'VERRA'
  else if (attributes.registry == 'GS') registry = 'GOLD_STANDARD'

  let project = loadOrCreateCarbonProject(registry, attributes.registry + '-' + attributes.project_id)

  carbonOffset.project = project.id
  let vintageParsed = BigInt.fromI64(Date.UTC(carbonOffsetERC20.getVintage().toI32(), 0) / 1000)

  carbonOffset.vintage = stdYearFromTimestamp(vintageParsed)
  carbonOffset.save()

  project.methodologies = attributes.methodology
  project.category = MethodologyCategories.getMethodologyCategory(project.methodologies)
  project.save()
  return carbonOffset
}

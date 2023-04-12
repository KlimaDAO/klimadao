import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { CarbonOffset, Transaction } from '../../generated/schema'
import { ToucanCarbonOffsets } from '../../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { C3ProjectToken } from '../../generated/templates/C3ProjectToken/C3ProjectToken'
import { MethodologyCategories } from './MethodologyCategories'
import { stdYearFromTimestamp } from '../../../lib/utils/Dates'
import { VERRA_PROJECT_NAMES } from '../../../lib/utils/VerraProjectInfo'

export function loadOrCreateCarbonOffset(
  transaction: Transaction,
  token: Address,
  bridge: String,
  registry: String
): CarbonOffset {
  let id = token.toHex()

  let carbonOffset = CarbonOffset.load(id)
  if (carbonOffset == null) {
    if (bridge == 'Toucan') {
      carbonOffset = createToucanCarbonOffset(transaction, token, bridge, registry)
    } else if (bridge == 'C3') {
      carbonOffset = createC3ProjectToken(transaction, token, bridge)
    } else {
      carbonOffset = new CarbonOffset(id)
      carbonOffset.tokenAddress = token.toHex()
      carbonOffset.bridge = bridge.toString()
      carbonOffset.registry = registry.toString()
      carbonOffset.totalBridged = BigDecimal.fromString('0')
      carbonOffset.totalRetired = BigDecimal.fromString('0')
      carbonOffset.currentSupply = BigDecimal.fromString('0')
      carbonOffset.vintage = ''
      carbonOffset.vintageYear = ''
      carbonOffset.projectID = ''
      carbonOffset.standard = ''
      carbonOffset.methodology = ''
      carbonOffset.region = ''
      carbonOffset.storageMethod = ''
      carbonOffset.method = ''
      carbonOffset.emissionType = ''
      carbonOffset.category = ''
      carbonOffset.isCorsiaCompliant = false
      carbonOffset.coBenefits = ''
      carbonOffset.correspAdjustment = ''
      carbonOffset.additionalCertification = ''
      carbonOffset.klimaRanking = BigInt.fromString('0')
      carbonOffset.lastUpdate = transaction.timestamp
    }
  }

  return carbonOffset as CarbonOffset
}

// Create and set the attribute information for a TCO2 Token
export function createToucanCarbonOffset(
  transaction: Transaction,
  token: Address,
  bridge: String,
  registry: String
): CarbonOffset {
  let id = token.toHex()

  let carbonOffsetERC20 = ToucanCarbonOffsets.bind(token)

  let carbonOffset = new CarbonOffset(id)

  let attributes = carbonOffsetERC20.getAttributes()

  carbonOffset.tokenAddress = token.toHex()
  carbonOffset.bridge = bridge.toString()
  carbonOffset.registry = registry.toString()
  carbonOffset.totalBridged = BigDecimal.fromString('0')
  carbonOffset.totalRetired = BigDecimal.fromString('0')
  carbonOffset.currentSupply = BigDecimal.fromString('0')
  carbonOffset.name = ''
  carbonOffset.region = ''

  carbonOffset.vintage = attributes.value1.startTime.toString()
  carbonOffset.vintageYear = stdYearFromTimestamp(attributes.value1.startTime)
  carbonOffset.projectID = attributes.value0.projectId
  carbonOffset.standard = attributes.value0.standard
  carbonOffset.methodology = attributes.value0.methodology
  carbonOffset.methodologyCategory = MethodologyCategories.getMethodologyCategory(carbonOffset.methodology)
  carbonOffset.region = attributes.value0.region
  carbonOffset.storageMethod = attributes.value0.storageMethod
  carbonOffset.method = attributes.value0.method
  carbonOffset.emissionType = attributes.value0.emissionType
  carbonOffset.category = attributes.value0.category
  carbonOffset.isCorsiaCompliant = attributes.value1.isCorsiaCompliant
  carbonOffset.coBenefits = attributes.value1.coBenefits
  carbonOffset.correspAdjustment = attributes.value1.correspAdjustment
  carbonOffset.additionalCertification = attributes.value1.additionalCertification
  carbonOffset.klimaRanking = BigInt.fromString(
    carbonOffset.vintage + carbonOffset.projectID.substring(4).padStart(6, '0')
  )
  carbonOffset.lastUpdate = transaction.timestamp

  // Manually update some of the items missing from the initial Toucan bridging
  for (let i = 0; i < VERRA_PROJECT_NAMES.length; i++) {
    if (attributes.value0.projectId == VERRA_PROJECT_NAMES[i][0]) {
      carbonOffset.name = VERRA_PROJECT_NAMES[i][1]
      carbonOffset.country = VERRA_PROJECT_NAMES[i][2]
      break
    }
  }

  // Exclude the HFC methodology from jumping to the front of the list.
  if (token.toString() == '0x92BFcddaC83f2e94f02fc7aA092EB6AEc08A0DEC') {
    carbonOffset.klimaRanking = BigInt.fromString('253370786400' + carbonOffset.projectID.substring(4).padStart(6, '0'))
  }

  return carbonOffset as CarbonOffset
}

// Create and set the attribute information for a C3T Token
export function createC3ProjectToken(transaction: Transaction, token: Address, bridge: String): CarbonOffset {
  let id = token.toHex()

  let carbonOffsetERC20 = C3ProjectToken.bind(token)

  let carbonOffset = new CarbonOffset(id)

  let attributes = carbonOffsetERC20.getProjectInfo()

  carbonOffset.tokenAddress = token.toHex()
  carbonOffset.bridge = bridge.toString()
  carbonOffset.totalBridged = BigDecimal.fromString('0')
  carbonOffset.totalRetired = BigDecimal.fromString('0')
  carbonOffset.currentSupply = BigDecimal.fromString('0')

  if (attributes.registry === 'VCS') {
    carbonOffset.registry = 'Verra'
  } else {
    carbonOffset.registry = attributes.registry
  }

  const vintageParsed = BigInt.fromI64(Date.UTC(carbonOffsetERC20.getVintage().toI32(), 0) / 1000)

  carbonOffset.vintage = vintageParsed.toString()
  carbonOffset.vintageYear = stdYearFromTimestamp(vintageParsed)

  carbonOffset.name = attributes.name
  carbonOffset.projectID = attributes.registry + '-' + attributes.project_id
  carbonOffset.standard = attributes.registry
  carbonOffset.methodology = attributes.methodology
  carbonOffset.methodologyCategory = MethodologyCategories.getMethodologyCategory(carbonOffset.methodology)
  carbonOffset.country = attributes.country
  carbonOffset.region = attributes.region
  carbonOffset.category = attributes.project_type
  carbonOffset.additionalCertification = attributes.ac

  // Not currently mapped by C3
  carbonOffset.method = ''
  carbonOffset.storageMethod = ''
  carbonOffset.emissionType = ''
  carbonOffset.coBenefits = ''
  carbonOffset.correspAdjustment = ''

  carbonOffset.klimaRanking = BigInt.fromString(
    carbonOffset.vintage + carbonOffset.projectID.substring(4).padStart(6, '0')
  )
  carbonOffset.lastUpdate = transaction.timestamp

  return carbonOffset as CarbonOffset
}

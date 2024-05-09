import { Address, BigInt, Bytes, log, ethereum } from '@graphprotocol/graph-ts'
import { stdYearFromTimestampNew as stdYearFromTimestamp } from '../../../lib/utils/Dates'
import { ZERO_BI } from '../../../lib/utils/Decimals'
import { C3ProjectToken } from '../../generated/templates/C3ProjectToken/C3ProjectToken'
import { CarbonCredit } from '../../generated/schema'
import { ToucanCarbonOffsets } from '../../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { loadOrCreateCarbonProject } from './CarbonProject'
import { MethodologyCategories } from './MethodologyCategories'
import { ToucanContractRegistry } from '../../generated/ToucanPuroFactory/ToucanContractRegistry'
import { ToucanCarbonOffsetBatches } from '../../generated/ToucanCarbonOffsetBatch/ToucanCarbonOffsetBatches'

export function loadOrCreateCarbonCredit(tokenAddress: Address, bridge: string, tokenId: BigInt | null): CarbonCredit {
  let id = Bytes.fromHexString(tokenAddress.toHexString())

  if (tokenId !== null) {
    id = Bytes.fromHexString(tokenAddress.toHexString()).concatI32(tokenId.toI32())
  }

  let credit = CarbonCredit.load(id)
  if (credit == null) {
    credit = new CarbonCredit(id)
    credit.tokenAddress = tokenAddress
    credit.bridgeProtocol = bridge
    credit.project = ''
    credit.vintage = 1970
    credit.currentSupply = ZERO_BI
    credit.crossChainSupply = ZERO_BI
    credit.bridged = ZERO_BI
    credit.retired = ZERO_BI
    credit.provenanceCount = 0
    credit.lastBatchId = ZERO_BI
    credit.isExAnte = false

    if (tokenId !== null) {
      credit.tokenId = tokenId
    }

    credit.save()
  }
  return credit as CarbonCredit
}

export function loadCarbonCredit(id: Bytes): CarbonCredit {
  return CarbonCredit.load(id) as CarbonCredit
}

export function updateCarbonCreditWithCall(tokenAddress: Address, registry: string): CarbonCredit {
  let credit = loadCarbonCredit(tokenAddress)
  if (credit.bridgeProtocol == 'TOUCAN') credit = updateToucanCall(tokenAddress, credit, registry)
  else if (credit.bridgeProtocol == 'C3') credit = updateC3Call(tokenAddress, credit)

  return credit
}

function updateToucanCall(tokenAddress: Address, carbonCredit: CarbonCredit, registry: string): CarbonCredit {
  let carbonCreditERC20 = ToucanCarbonOffsets.bind(tokenAddress)

  let attributes = carbonCreditERC20.getAttributes()
  let project = loadOrCreateCarbonProject(registry, attributes.value0.projectId)

  carbonCredit.project = project.id
  carbonCredit.vintage = stdYearFromTimestamp(attributes.value1.endTime)
  carbonCredit.tokenId = attributes.value1.projectTokenId

  let standard = attributes.value0.standard

  if (standard.toLowerCase() == 'puro') {
    carbonCredit.consumptionPeriodStart = attributes.value1.startTime
    carbonCredit.consumptionPeriodEnd = attributes.value1.endTime

    // retrieve nft token id linked to batch to enable retirement
    let projectVintageTokenId = carbonCreditERC20.projectVintageTokenId()
    let contractRegistryAddress = carbonCreditERC20.contractRegistry()

    let contractRegistry = ToucanContractRegistry.bind(contractRegistryAddress)
    let toucanCarbonOffsetsBatchesAddress = contractRegistry.carbonOffsetBatchesAddress()

    let toucanCarbonOffsetsBatches = ToucanCarbonOffsetBatches.bind(toucanCarbonOffsetsBatchesAddress)
    let totalSupply = toucanCarbonOffsetsBatches.totalSupply()

    let tokenIds: Array<BigInt> = []

    for (let i = 0; i < totalSupply.toI32(); i++) {
      let tokenId = toucanCarbonOffsetsBatches.try_tokenOfOwnerByIndex(tokenAddress, BigInt.fromI32(i))
      if (tokenId.reverted) {
        break
      }
      tokenIds.push(tokenId.value)
    }

    for (let i = 0; i < tokenIds.length; i++) {
      let nftData = toucanCarbonOffsetsBatches.nftList(tokenIds[i])
      let projectVintageTokenIdFromNftList = nftData.value0

      if (projectVintageTokenIdFromNftList == projectVintageTokenId) {
        carbonCredit.puroNftTokenId = tokenIds[i]
        break
      }
    }
  }

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
  else if (attributes.registry == 'JCS' || attributes.registry == 'JPN') registry = 'J_CREDIT'
  else if (attributes.registry == 'ACR') registry = 'AMERICAN_CARBON_REGISTRY'
  else if (attributes.registry == 'ECO') registry = 'ECO_REGISTRY'

  let projectID: string

  /** the last two characters of a JCS/JPN project ID are a  batch suffix id of
   * the vintage and do not relate to the projectId itself */
  if (attributes.registry == 'JCS' || attributes.registry == 'JPN') {
    projectID = attributes.project_id.slice(0, attributes.project_id.length - 2)
  } else {
    projectID = attributes.project_id
  }

  let project = loadOrCreateCarbonProject(registry, attributes.registry + '-' + projectID)

  carbonCredit.project = project.id
  let vintageParsed = BigInt.fromI64(Date.UTC(carbonCreditERC20.getVintage().toI32(), 0) / 1000)

  carbonCredit.vintage = stdYearFromTimestamp(vintageParsed)
  carbonCredit.save()

  project.methodologies = attributes.methodology
  project.category = MethodologyCategories.getMethodologyCategory(project.methodologies)
  project.region = attributes.region
  project.methodologies = attributes.methodology
  project.save()

  return carbonCredit
}

export function updateICRCredit(tokenAddress: Address, tokenId: BigInt, timestamp: BigInt): void {
  let defaultCredit = loadOrCreateCarbonCredit(tokenAddress, 'ICR', BigInt.fromI32(0))
  let credit = loadOrCreateCarbonCredit(tokenAddress, 'ICR', tokenId)

  credit.project = defaultCredit.project
  credit.vintage = stdYearFromTimestamp(timestamp)
  credit.exPostTokenId = tokenId
  credit.save()
}

export function updateCarbonCreditCrossChain(creditAddress: Address, amount: BigInt): void {
  let credit = loadCarbonCredit(creditAddress)
  credit.crossChainSupply = credit.crossChainSupply.plus(amount)
  credit.save()
}

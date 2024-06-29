import {
  Address,
  BigInt,
  Bytes,
  log,
  ethereum,
  BigDecimal,
  store,
} from '@graphprotocol/graph-ts'
import { CarbonProject, Token } from '../../generated/schema'
import { ERC20 } from '../../generated/ToucanFactory/ERC20'
import { ICRProjectToken } from '../../generated/ICRCarbonContractRegistry/ICRProjectToken'
import { PuroIdMigration } from '../../generated/schema'
import { PURO_ID_MIGRATION_BLOCK } from '../../../lib/utils/Constants'
import { ProjectIdUpdated } from '../../generated/CarbonProjectsAddress/CarbonProjectsAddress'
import { USDC_ERC20_CONTRACT } from '../../../lib/utils/Constants'
import { ZERO_BD, ZERO_BI } from '../../../lib/utils/Decimals'
import { loadCarbonCredit, loadOrCreateCarbonCredit } from './CarbonCredit'
import { ToucanCarbonOffsetBatches } from '../../generated/ToucanCarbonOffsetBatch/ToucanCarbonOffsetBatches'
import { ToucanCarbonOffsets } from '../../generated/templates/ToucanCarbonOffsets/ToucanCarbonOffsets'
import { loadOrCreateCarbonProject } from './CarbonProject'

export function createTokenWithCall(tokenAddress: Address, block: ethereum.Block): void {
  let token = Token.load(tokenAddress)
  if (token) return

  token = new Token(tokenAddress)

  let tokenContract = ERC20.bind(tokenAddress)

  token.name = tokenContract.name()
  token.symbol = tokenContract.symbol()
  token.decimals = tokenContract.decimals()
  token.isExAnte = false
  token.save()

  if (token.symbol.startsWith('TCO2-PUR') && block.number < PURO_ID_MIGRATION_BLOCK) {
    let migration = PuroIdMigration.load('puro-migration')
    if (migration == null) {
      migration = new PuroIdMigration('puro-migration')
      migration.tokenIds = []
      migration.save()
    }

    let tokenIds = migration.tokenIds
    tokenIds.push(token.id)
    migration.tokenIds = tokenIds
    migration.save()
  }
}

export function createICRTokenID(tokenAddress: Address, tokenId: BigInt): Bytes {
  return tokenAddress.concatI32(tokenId.toI32())
}

export function createICRTokenWithCall(tokenAddress: Address, tokenId: BigInt): void {
  log.info('Creating ICR Tokens for token address {}', [tokenAddress.toHexString()])

  let tokenContract = ICRProjectToken.bind(tokenAddress)

  const isExPost = tokenContract.isExPostToken(tokenId)

  let exPostTokenId: BigInt

  // if it's not exPost it's an exAnte. Get the equivalent exPost for the corresponding exAnte info
  if (!isExPost) {
    const exPostId = tokenContract.exAnteToExPostTokenId(tokenId)
    exPostTokenId = exPostId
  } else {
    exPostTokenId = tokenId
  }

  const id = createICRTokenID(tokenAddress, tokenId)

  let token = Token.load(id)

  if (token == null) {
    log.info('New ICR Token created with id {}', [id.toHexString()])
    token = new Token(id)

    const mappingValues = tokenContract.exPostVintageMapping(exPostTokenId)

    const serializationParts = mappingValues.value0.split('-')

    const symbol =
      'ICR' +
      '-' +
      serializationParts[3].toString() +
      '-' +
      serializationParts[serializationParts.length - 1].toString()

    token.name = `ICR: ${symbol}`

    token.symbol = symbol
    token.decimals = 18
    token.tokenId = tokenId
    token.isExAnte = !isExPost

    token.save()
  }
}

export function loadOrCreateToken(tokenAddress: Address): Token {
  let token = Token.load(tokenAddress)
  log.debug('Loading token {}', [tokenAddress.toHexString()])
  if (token == null) {
    let tokenContract = ERC20.bind(tokenAddress)
    token = new Token(tokenAddress)

    let nameCall = tokenContract.try_name()
    if (nameCall.reverted) token.name = ''
    else token.name = nameCall.value

    let symbolCall = tokenContract.try_symbol()
    if (symbolCall.reverted) token.symbol = ''
    else token.symbol = symbolCall.value

    let decimalCall = tokenContract.try_decimals()
    if (decimalCall.reverted) token.decimals = 18 // Default to 18 decimals
    else token.decimals = decimalCall.value

    token.latestPriceUSD = tokenAddress == USDC_ERC20_CONTRACT ? BigDecimal.fromString('1') : ZERO_BD
    token.latestPriceUSDUpdated = ZERO_BI
    token.latestPricePerKLIMA = ZERO_BD
    token.latestPricePerKLIMAUpdated = ZERO_BI
    token.isExAnte = false

    token.save()
  }
  return token as Token
}
export function handlePuroIdMigration(event: ProjectIdUpdated): void {
  let migration = PuroIdMigration.load('puro-migration')

  if (migration == null) {
    log.info('No migration created yet {}', [])
    return
  }
  let tokenIds = migration.tokenIds
  // update tokens
  for (let i = 0; i < tokenIds.length; i++) {
    let token = Token.load(tokenIds[i])

    if (token == null) {
      log.info('Token with id {} not found', [tokenIds[i].toHexString()])
      continue
    }

    let projectAddress = Address.fromBytes(tokenIds[i])
    // let carbonCreditContract = ERC20.bind(projectAddress)
    let carbonCreditContract = ToucanCarbonOffsets.bind(projectAddress)

    let newSymbol = carbonCreditContract.try_symbol()
    if (!newSymbol.reverted) {
      token.symbol = newSymbol.value
    }
    token.save()

    // update credit and project
    let carbonCredit = loadCarbonCredit(projectAddress)
    let previousProject = CarbonProject.load(carbonCredit.project)

    if (previousProject == null) {
      log.info('Project not found for token {}', [projectAddress.toHexString()])
      continue
    }

    store.remove('CarbonProject', previousProject.id)

    // retrieve new project attributes
    let attributes = carbonCreditContract.getAttributes()
    // create new project with updated Id
    const updatedProject = loadOrCreateCarbonProject(
      'PURO_EARTH',
      attributes.value0.projectId,
      attributes.value1.name,
      attributes.value0.region
    )

    updatedProject.save()

    // update credit
    carbonCredit.project = updatedProject.id
    carbonCredit.save()
  }
}

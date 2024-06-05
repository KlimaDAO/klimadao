import { Address, BigInt, Bytes, log, ByteArray, ethereum, dataSource } from '@graphprotocol/graph-ts'
import { Token } from '../../generated/schema'
import { ERC20 } from '../../generated/ToucanFactory/ERC20'
import { ICRProjectToken } from '../../generated/ICRCarbonContractRegistry/ICRProjectToken'
import { PuroIdMigration } from '../../generated/schema'
import { PURO_ID_MIGRATION_BLOCK } from '../../../lib/utils/Constants'
import { ProjectIdUpdated } from '../../generated/CarbonProjectsAddress/CarbonProjectsAddress'

export function createTokenWithCall(tokenAddress: Address, block: ethereum.Block): void {
  let token = Token.load(tokenAddress)
  if (token) return

  token = new Token(tokenAddress)

  let tokenContract = ERC20.bind(tokenAddress)

  token.name = tokenContract.name()
  token.symbol = tokenContract.symbol()
  token.decimals = tokenContract.decimals()
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

export function handlePuroIdMigration(event: ProjectIdUpdated): void {
  let migrations = PuroIdMigration.load('puro-migrations')

  if (migrations == null) {
    migrations = new PuroIdMigration('puro-migrations')
    migrations.tokenIds = []
    migrations.save()
  }
  let tokenIds = migrations.tokenIds

  for (let i = 0; i < tokenIds.length; i++) {
    let token = Token.load(tokenIds[i])

    if (token == null) {
      log.info('Token with id {} not found', [tokenIds[i].toHexString()])
      continue
    }

    let projectAddress = Address.fromBytes(tokenIds[i])
    let projectContract = ERC20.bind(projectAddress)

    let newSymbol = projectContract.try_symbol()
    if (!newSymbol.reverted) {
      token.symbol = newSymbol.value
    }
    token.save()
  }
}

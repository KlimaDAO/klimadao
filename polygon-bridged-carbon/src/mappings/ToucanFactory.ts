import { ToucanCarbonOffsets } from '../../generated/templates'
import { TokenCreated } from '../../generated/ToucanFactory/ToucanCarbonOffsetsFactory'
import { PUBLISHED_VERSION, SCHEMA_VERSION } from '../utils/version'
import { SubgraphVersion } from '../../generated/schema'
import { ethereum } from '@graphprotocol/graph-ts'

export function handleNewTCO2(event: TokenCreated): void {
  // Start indexing the TCO2 tokens; `event.params.tokenAddress` is the
  // address of the new token contract
  ToucanCarbonOffsets.create(event.params.tokenAddress)
}

export function handleSetSubgraphVersion(block: ethereum.Block): void {
  let version = new SubgraphVersion('ethereum-bridged-carbon')
  version.schemaVersion = SCHEMA_VERSION
  version.publishedVersion = PUBLISHED_VERSION
  version.save()
}

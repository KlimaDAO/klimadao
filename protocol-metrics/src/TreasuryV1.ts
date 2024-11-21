import { Deposit } from '../generated/TreasuryV1/TreasuryV1'
import { loadOrCreateTransaction } from './utils/Transactions'
import { updateProtocolMetrics } from './utils/ProtocolMetrics'
import { SubgraphVersion } from '../generated/schema'
import { PUBLISHED_VERSION, SCHEMA_VERSION } from './utils/version'
import { ethereum } from '@graphprotocol/graph-ts'

export function handleDeposit(event: Deposit): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)

  updateProtocolMetrics(transaction)
}

export function handleSetSubgraphVersion(block: ethereum.Block): void {
  let version = new SubgraphVersion('klima-protocol-metrics')
  version.schemaVersion = SCHEMA_VERSION
  version.publishedVersion = PUBLISHED_VERSION
  version.save()
}

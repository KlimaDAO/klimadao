import { MossRetired } from '../generated/RetireMossCarbon/RetireMossCarbon'
import { ToucanRetired } from '../generated/RetireToucanCarbon/RetireToucanCarbon'
import { C3Retired } from '../generated/RetireC3Carbon/RetireC3Carbon'
import { CarbonRetired, CarbonRetired1 as CarbonRetiredTokenId } from '../generated/KlimaInfinity/KlimaInfinity'
import { KlimaCarbonRetirements } from '../generated/RetireC3Carbon/KlimaCarbonRetirements'
import { BigInt, dataSource, ethereum } from '@graphprotocol/graph-ts'
import { loadOrCreateAccount } from './utils/Account'
import { loadRetire } from './utils/Retire'
import { ZERO_ADDRESS } from '../../lib/utils/Constants'
import { saveKlimaRetire } from './utils/KlimaRetire'
import { ZERO_BI } from '../../lib/utils/Decimals'
import { getRetirementsContractAddress } from '../utils/helpers'
import { SubgraphVersion } from '../generated/schema'

export function handleMossRetired(event: MossRetired): void {
  // Ignore zero value retirements
  if (event.params.retiredAmount == ZERO_BI) return
  let network = dataSource.network()

  let retirementsContractAddress = getRetirementsContractAddress(network)

  let klimaRetirements = KlimaCarbonRetirements.bind(retirementsContractAddress)
  let index = klimaRetirements.retirements(event.params.beneficiaryAddress).value0.minus(BigInt.fromI32(1))

  let sender = loadOrCreateAccount(event.transaction.from)
  loadOrCreateAccount(event.params.beneficiaryAddress)
  loadOrCreateAccount(event.params.retiringAddress)

  let retire = loadRetire(sender.id.concatI32(sender.totalRetirements - 1))

  if (event.params.carbonPool != ZERO_ADDRESS) retire.pool = event.params.carbonPool

  retire.source = 'KLIMA'
  retire.beneficiaryAddress = event.params.beneficiaryAddress
  retire.beneficiaryName = event.params.beneficiaryString
  retire.retiringAddress = event.params.retiringAddress
  retire.retirementMessage = event.params.retirementMessage
  retire.save()

  saveKlimaRetire(
    event.params.beneficiaryAddress,
    retire.id,
    index,
    event.params.retiredAmount.div(BigInt.fromI32(100)),
    false
  )
}

export function handleToucanRetired(event: ToucanRetired): void {
  // Ignore zero value retirements
  if (event.params.retiredAmount == ZERO_BI) return
  let network = dataSource.network()

  let retirementsContractAddress = getRetirementsContractAddress(network)
  let klimaRetirements = KlimaCarbonRetirements.bind(retirementsContractAddress)

  let index = klimaRetirements.retirements(event.params.beneficiaryAddress).value0.minus(BigInt.fromI32(1))

  let sender = loadOrCreateAccount(event.transaction.from)
  loadOrCreateAccount(event.params.beneficiaryAddress)
  loadOrCreateAccount(event.params.retiringAddress)

  let retire = loadRetire(sender.id.concatI32(sender.totalRetirements - 1))

  if (event.params.carbonPool != ZERO_ADDRESS) retire.pool = event.params.carbonPool

  retire.source = 'KLIMA'
  retire.beneficiaryAddress = event.params.beneficiaryAddress
  retire.beneficiaryName = event.params.beneficiaryString
  retire.retiringAddress = event.params.retiringAddress
  retire.retirementMessage = event.params.retirementMessage
  retire.save()

  saveKlimaRetire(
    event.params.beneficiaryAddress,
    retire.id,
    index,
    event.params.retiredAmount.div(BigInt.fromI32(100)),
    false
  )
}

export function handleC3Retired(event: C3Retired): void {
  // Ignore zero value retirements
  if (event.params.retiredAmount == ZERO_BI) return

  let network = dataSource.network()
  let retirementsContractAddress = getRetirementsContractAddress(network)

  let klimaRetirements = KlimaCarbonRetirements.bind(retirementsContractAddress)
  let index = klimaRetirements.retirements(event.params.beneficiaryAddress).value0.minus(BigInt.fromI32(1))

  let sender = loadOrCreateAccount(event.transaction.from)
  loadOrCreateAccount(event.params.retiringAddress)
  loadOrCreateAccount(event.params.beneficiaryAddress)

  let retire = loadRetire(sender.id.concatI32(sender.totalRetirements - 1))

  if (event.params.carbonPool != ZERO_ADDRESS) retire.pool = event.params.carbonPool

  retire.source = 'KLIMA'
  retire.beneficiaryAddress = event.params.beneficiaryAddress
  retire.beneficiaryName = event.params.beneficiaryString
  retire.retiringAddress = event.params.retiringAddress
  retire.retirementMessage = event.params.retirementMessage
  retire.save()

  saveKlimaRetire(
    event.params.beneficiaryAddress,
    retire.id,
    index,
    event.params.retiredAmount.div(BigInt.fromI32(100)),
    false
  )
}

export function handleCarbonRetired(event: CarbonRetired): void {
  // Ignore zero value retirements
  if (event.params.retiredAmount == ZERO_BI) return
  let network = dataSource.network()

  let retirementsContractAddress = getRetirementsContractAddress(network)

  let klimaRetirements = KlimaCarbonRetirements.bind(retirementsContractAddress)
  let index = klimaRetirements.retirements(event.params.beneficiaryAddress).value0.minus(BigInt.fromI32(1))

  let sender = loadOrCreateAccount(event.transaction.from)
  loadOrCreateAccount(event.params.retiringAddress)
  loadOrCreateAccount(event.params.beneficiaryAddress)

  let retire = loadRetire(sender.id.concatI32(sender.totalRetirements - 1))

  if (event.params.carbonPool != ZERO_ADDRESS) retire.pool = event.params.carbonPool

  retire.source = 'KLIMA'
  retire.beneficiaryAddress = event.params.beneficiaryAddress
  retire.beneficiaryName = event.params.beneficiaryString
  retire.retiringAddress = event.params.retiringAddress
  retire.retirementMessage = event.params.retirementMessage
  retire.save()

  saveKlimaRetire(
    event.params.beneficiaryAddress,
    retire.id,
    index,
    event.params.retiredAmount.div(BigInt.fromI32(100)),
    false
  )
}

export function handleCarbonRetiredWithTokenId(event: CarbonRetiredTokenId): void {
  // Ignore zero value retirements
  if (event.params.retiredAmount == ZERO_BI) return
  let network = dataSource.network()

  let retirementsContractAddress = getRetirementsContractAddress(network)
  let klimaRetirements = KlimaCarbonRetirements.bind(retirementsContractAddress)
  let index = klimaRetirements.retirements(event.params.beneficiaryAddress).value0.minus(BigInt.fromI32(1))

  let sender = loadOrCreateAccount(event.transaction.from)
  loadOrCreateAccount(event.params.retiringAddress)
  loadOrCreateAccount(event.params.beneficiaryAddress)

  let retire = loadRetire(sender.id.concatI32(sender.totalRetirements - 1))

  if (event.params.carbonPool != ZERO_ADDRESS) retire.pool = event.params.carbonPool

  retire.source = 'KLIMA'
  retire.beneficiaryAddress = event.params.beneficiaryAddress
  retire.beneficiaryName = event.params.beneficiaryString
  retire.retiringAddress = event.params.retiringAddress
  retire.retirementMessage = event.params.retirementMessage
  retire.save()

  saveKlimaRetire(
    event.params.beneficiaryAddress,
    retire.id,
    index,
    event.params.retiredAmount.div(BigInt.fromI32(100)),
    false
  )
}

export function handleSetSubgraphVersion(block: ethereum.Block): void {
  let version = new SubgraphVersion('polygon-digital-carbon')
  version.schemaVersion = version.schemaVersion
  version.publishedVersion = version.publishedVersion
  version.save()
}

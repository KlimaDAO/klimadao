import { MossRetired } from '../generated/RetireMossCarbon/RetireMossCarbon'
import { ToucanRetired } from '../generated/RetireToucanCarbon/RetireToucanCarbon'
import { C3Retired } from '../generated/RetireC3Carbon/RetireC3Carbon'
import { CarbonRetired } from '../generated/KlimaInfinity/KlimaInfinity'

import { KlimaCarbonRetirements } from '../generated/RetireC3Carbon/KlimaCarbonRetirements'
import { Address, BigInt } from '@graphprotocol/graph-ts'
import { loadOrCreateAccount } from './utils/Account'
import { loadRetire } from './utils/Retire'
import { ZERO_ADDRESS } from '../../lib/utils/Constants'
import { saveKlimaRetire } from './utils/KlimaRetire'
import { KLIMA_CARBON_RETIREMENTS_CONTRACT } from '../../lib/utils/Constants'
import { ZERO_BI } from '../../lib/utils/Decimals'

export function handleMossRetired(event: MossRetired): void {
  // Ignore zero value retirements
  if (event.params.retiredAmount == ZERO_BI) return

  let klimaRetirements = KlimaCarbonRetirements.bind(Address.fromString(KLIMA_CARBON_RETIREMENTS_CONTRACT))
  let index = klimaRetirements.retirements(event.params.beneficiaryAddress).value0.minus(BigInt.fromI32(1))

  let sender = loadOrCreateAccount(event.transaction.from)
  loadOrCreateAccount(event.params.beneficiaryAddress)
  loadOrCreateAccount(event.params.retiringAddress)

  let retire = loadRetire(event.transaction.from.concatI32(sender.totalRetirements - 1))

  if (event.params.carbonPool != ZERO_ADDRESS) retire.pool = event.params.carbonPool

  retire.source = 'KLIMA'
  retire.beneficiaryAddress = event.params.beneficiaryAddress
  retire.beneficiaryName = event.params.beneficiaryString
  retire.retiringAddress = event.params.retiringAddress
  retire.retirementMessage = event.params.retirementMessage
  retire.save()

  saveKlimaRetire(event.transaction.from, retire.id, index, event.params.retiredAmount.div(BigInt.fromI32(100)), false)
}

export function handleToucanRetired(event: ToucanRetired): void {
  // Ignore zero value retirements
  if (event.params.retiredAmount == ZERO_BI) return

  let klimaRetirements = KlimaCarbonRetirements.bind(Address.fromString(KLIMA_CARBON_RETIREMENTS_CONTRACT))
  let index = klimaRetirements.retirements(event.params.beneficiaryAddress).value0.minus(BigInt.fromI32(1))

  let sender = loadOrCreateAccount(event.transaction.from)
  loadOrCreateAccount(event.params.beneficiaryAddress)
  loadOrCreateAccount(event.params.retiringAddress)

  let retire = loadRetire(event.transaction.from.concatI32(sender.totalRetirements - 1))

  if (event.params.carbonPool != ZERO_ADDRESS) retire.pool = event.params.carbonPool

  retire.source = 'KLIMA'
  retire.beneficiaryAddress = event.params.beneficiaryAddress
  retire.beneficiaryName = event.params.beneficiaryString
  retire.retiringAddress = event.params.retiringAddress
  retire.retirementMessage = event.params.retirementMessage
  retire.save()

  saveKlimaRetire(event.transaction.from, retire.id, index, event.params.retiredAmount.div(BigInt.fromI32(100)), false)
}

export function handleC3Retired(event: C3Retired): void {
  // Ignore zero value retirements
  if (event.params.retiredAmount == ZERO_BI) return

  let klimaRetirements = KlimaCarbonRetirements.bind(Address.fromString(KLIMA_CARBON_RETIREMENTS_CONTRACT))
  let index = klimaRetirements.retirements(event.params.beneficiaryAddress).value0.minus(BigInt.fromI32(1))

  let sender = loadOrCreateAccount(event.transaction.from)
  loadOrCreateAccount(event.params.beneficiaryAddress)
  loadOrCreateAccount(event.params.retiringAddress)

  let retire = loadRetire(event.transaction.from.concatI32(sender.totalRetirements - 1))

  if (event.params.carbonPool != ZERO_ADDRESS) retire.pool = event.params.carbonPool

  retire.source = 'KLIMA'
  retire.beneficiaryAddress = event.params.beneficiaryAddress
  retire.beneficiaryName = event.params.beneficiaryString
  retire.retiringAddress = event.params.retiringAddress
  retire.retirementMessage = event.params.retirementMessage
  retire.save()

  saveKlimaRetire(event.transaction.from, retire.id, index, event.params.retiredAmount.div(BigInt.fromI32(100)), false)
}

export function handleCarbonRetired(event: CarbonRetired): void {
  // Ignore zero value retirements
  if (event.params.retiredAmount == ZERO_BI) return

  let klimaRetirements = KlimaCarbonRetirements.bind(Address.fromString(KLIMA_CARBON_RETIREMENTS_CONTRACT))
  let index = klimaRetirements.retirements(event.params.beneficiaryAddress).value0.minus(BigInt.fromI32(1))

  let sender = loadOrCreateAccount(event.transaction.from)
  loadOrCreateAccount(event.params.beneficiaryAddress)
  loadOrCreateAccount(event.params.retiringAddress)

  let retire = loadRetire(event.transaction.from.concatI32(sender.totalRetirements - 1))

  if (event.params.carbonPool != ZERO_ADDRESS) retire.pool = event.params.carbonPool

  retire.source = 'KLIMA'
  retire.beneficiaryAddress = event.params.beneficiaryAddress
  retire.beneficiaryName = event.params.beneficiaryString
  retire.retiringAddress = event.params.retiringAddress
  retire.retirementMessage = event.params.retirementMessage
  retire.save()

  saveKlimaRetire(event.transaction.from, retire.id, index, event.params.retiredAmount.div(BigInt.fromI32(100)), false)
}

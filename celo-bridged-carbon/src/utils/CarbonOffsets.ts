import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { CarbonOffset, Transaction } from '../../generated/schema'

export function loadOrCreateCarbonOffset(
  transaction: Transaction,
  token: Address,
  bridge: String,
  registry: String
): CarbonOffset {
  let id = token.toHex()

  let carbonOffset = CarbonOffset.load(id)
  if (carbonOffset == null) {
    // if (bridge == 'Toucan') {
    //     carbonOffset = createToucanCarbonOffset(transaction, token, bridge, registry)
    // }
    // else {
    carbonOffset = new CarbonOffset(id)
    carbonOffset.name = ''
    carbonOffset.tokenAddress = token.toHex()
    carbonOffset.bridge = bridge.toString()
    carbonOffset.registry = registry.toString()
    carbonOffset.totalBridged = BigDecimal.fromString('0')
    carbonOffset.totalRetired = BigDecimal.fromString('0')
    carbonOffset.currentSupply = BigDecimal.fromString('0')
    carbonOffset.vintage = ''
    carbonOffset.projectID = ''
    carbonOffset.standard = ''
    carbonOffset.methodology = ''
    carbonOffset.region = ''
    carbonOffset.storageMethod = ''
    carbonOffset.method = ''
    carbonOffset.emissionType = ''
    carbonOffset.category = ''
    carbonOffset.isCorsiaCompliant = false
    carbonOffset.methodologyCategory = ''
    carbonOffset.country = ''
    carbonOffset.coBenefits = ''
    carbonOffset.correspAdjustment = ''
    carbonOffset.additionalCertification = ''
    carbonOffset.klimaRanking = BigInt.fromString('0')
    carbonOffset.lastUpdate = transaction.timestamp
    carbonOffset.balanceBCT = BigDecimal.zero()
    carbonOffset.balanceNCT = BigDecimal.zero()
    // }
  }

  return carbonOffset as CarbonOffset
}

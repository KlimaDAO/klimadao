import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { ERC20 } from '../../../../generated/ToucanFactory/ERC20'
import { CarbonMetric } from '../../../../generated/schema'
import { IPoolToken } from '../IPoolToken'
import * as constants from '../../Constants'
import { toDecimal } from '../../../../../lib/utils/Decimals'

export class NBO implements IPoolToken {
  private contractAddress: Address

  constructor(contractAddress: Address) {
    this.contractAddress = contractAddress
  }

  getDecimals(): number {
    return 18
  }

  returnUpdatedSupplyMetrics(carbonMetrics: CarbonMetric): CarbonMetric {
    const oldSupply = carbonMetrics.nboSupply
    const newSupplyRaw = ERC20.bind(this.contractAddress).totalSupply()
    const newSupply = toDecimal(newSupplyRaw, this.getDecimals())

    const deltaSupply = newSupply.minus(oldSupply)
    carbonMetrics.nboSupply = newSupply
    carbonMetrics.totalCarbonSupply = carbonMetrics.totalCarbonSupply.plus(deltaSupply)

    return carbonMetrics
  }

  returnUpdatedCrosschainSupplyMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    throw new Error('Method not implemented.')
  }

  returnUpdatedKlimaRetirementMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    const oldKlimaRetired = carbonMetrics.nboKlimaRetired
    const newKlimaRetired = carbonMetrics.nboKlimaRetired.plus(toDecimal(amount, this.getDecimals()))

    const delta = newKlimaRetired.minus(oldKlimaRetired)
    carbonMetrics.nboKlimaRetired = newKlimaRetired
    carbonMetrics.totalKlimaRetirements = carbonMetrics.totalKlimaRetirements.plus(delta)

    return carbonMetrics
  }

  returnUpdatedRedemptionMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    const oldRedeemed = carbonMetrics.nboRedeemed
    const newReeemed = carbonMetrics.nboRedeemed.plus(toDecimal(amount, this.getDecimals()))

    carbonMetrics.nboRedeemed = newReeemed

    return carbonMetrics
  }
}

import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { CarbonMetric } from '../../../../generated/schema'
import { ERC20 } from '../../../../generated/ToucanFactory/ERC20'
import { IPoolToken } from '../IPoolToken'
import * as constants from '../../Constants'
import { toDecimal } from '../../../../../lib/utils/Decimals'

export class BCT implements IPoolToken {
  private contractAddress: Address

  constructor(contractAddress: Address) {
    this.contractAddress = contractAddress
  }

  getDecimals(): number {
    return 18
  }

  returnUpdatedSupplyMetrics(carbonMetrics: CarbonMetric): CarbonMetric {
    const oldSupply = carbonMetrics.bctSupply
    const newSupplyRaw = ERC20.bind(this.contractAddress).totalSupply()
    const newSupply = toDecimal(newSupplyRaw, this.getDecimals())

    const deltaSupply = newSupply.minus(oldSupply)
    carbonMetrics.bctSupply = newSupply
    carbonMetrics.totalCarbonSupply = carbonMetrics.totalCarbonSupply.plus(deltaSupply)

    return carbonMetrics
  }

  returnUpdatedCrosschainSupplyMetrics(carbonMetrics: CarbonMetric, amountRaw: BigInt): CarbonMetric {
    const oldCrosschainSupply = carbonMetrics.bctCrosschainSupply
    const amount = toDecimal(amountRaw, this.getDecimals())
    const newCrosschainSupply = oldCrosschainSupply.plus(amount)

    carbonMetrics.bctCrosschainSupply = newCrosschainSupply
    carbonMetrics.totalCrosschainSupply = carbonMetrics.totalCrosschainSupply.plus(amount)

    return carbonMetrics
  }

  returnUpdatedKlimaRetirementMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    const oldKlimaRetired = carbonMetrics.bctKlimaRetired
    const newKlimaRetired = carbonMetrics.bctKlimaRetired.plus(toDecimal(amount, this.getDecimals()))

    const delta = newKlimaRetired.minus(oldKlimaRetired)
    carbonMetrics.bctKlimaRetired = newKlimaRetired
    carbonMetrics.totalKlimaRetirements = carbonMetrics.totalKlimaRetirements.plus(delta)

    return carbonMetrics
  }

  returnUpdatedRedemptionMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    const oldRedeemed = carbonMetrics.bctRedeemed
    const newReeemed = carbonMetrics.bctRedeemed.plus(toDecimal(amount, this.getDecimals()))

    carbonMetrics.bctRedeemed = newReeemed

    return carbonMetrics
  }
}

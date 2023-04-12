import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { ERC20 } from '../../../../generated/ToucanFactory/ERC20'
import { CarbonMetric } from '../../../../generated/schema'
import { IPoolToken } from '../IPoolToken'
import * as constants from '../../Constants'
import { toDecimal } from '../../../../../lib/utils/Decimals'

export class MCO2 implements IPoolToken {
  private contractAddress: Address

  constructor(contractAddress: Address) {
    this.contractAddress = contractAddress
  }

  getDecimals(): number {
    return 18
  }

  returnUpdatedSupplyMetrics(carbonMetrics: CarbonMetric): CarbonMetric {
    const oldSupply = carbonMetrics.mco2Supply
    const newSupplyRaw = ERC20.bind(this.contractAddress).totalSupply()
    const newSupply = toDecimal(newSupplyRaw, this.getDecimals())

    const deltaSupply = newSupply.minus(oldSupply)
    carbonMetrics.mco2Supply = newSupply
    carbonMetrics.totalCarbonSupply = carbonMetrics.totalCarbonSupply.plus(deltaSupply)

    return carbonMetrics
  }

  returnUpdatedCrosschainSupplyMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    throw new Error('Method not implemented.')
  }

  returnUpdatedKlimaRetirementMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    const oldKlimaRetired = carbonMetrics.mco2KlimaRetired
    const newKlimaRetired = carbonMetrics.mco2KlimaRetired.plus(toDecimal(amount, this.getDecimals()))

    const delta = newKlimaRetired.minus(oldKlimaRetired)
    carbonMetrics.mco2KlimaRetired = newKlimaRetired
    carbonMetrics.totalKlimaRetirements = carbonMetrics.totalKlimaRetirements.plus(delta)

    return carbonMetrics
  }

  returnUpdatedRedemptionMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    throw new Error('MCO2 is not redeemable')
  }
}

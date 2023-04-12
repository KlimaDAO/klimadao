import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { ERC20 } from '../../../../generated/MossCarbon/ERC20'
import { CarbonMetric } from '../../../../generated/schema'
import { IPoolToken } from '../IPoolToken'
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

  returnUpdatedKlimaRetirementMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    throw new Error('Not yet implemented')
  }
}

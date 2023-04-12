import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { CarbonMetric } from '../../../../generated/schema'
import { ERC20 } from '../../../../generated/ToucanCrossChainMessenger/ERC20'
import { IPoolToken } from '../IPoolToken'
import * as constants from '../../Constants'
import { toDecimal } from '../../../../../lib/utils/Decimals'

export class BCT implements IPoolToken {
  private contractAddress: Address

  constructor(contractAddress: Address) {
    this.contractAddress = contractAddress
  }

  getTotalSupply(): BigInt {
    return ERC20.bind(this.contractAddress).totalSupply()
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
}

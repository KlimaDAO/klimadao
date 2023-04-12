import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { CarbonMetric } from '../../../generated/schema'

export interface IPoolToken {
  getTotalSupply(): BigInt
  getDecimals(): number
  returnUpdatedSupplyMetrics(carbonMetrics: CarbonMetric): CarbonMetric
}

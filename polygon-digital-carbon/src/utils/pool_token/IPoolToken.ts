import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { CarbonMetric } from '../../../generated/schema'

export interface IPoolToken {
  getDecimals(): number
  returnUpdatedSupplyMetrics(carbonMetrics: CarbonMetric): CarbonMetric
  returnUpdatedRedemptionMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric
  returnUpdatedCrosschainSupplyMetrics(carbonMetrics: CarbonMetric, amountRaw: BigInt): CarbonMetric
  returnUpdatedKlimaRetirementMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric
}

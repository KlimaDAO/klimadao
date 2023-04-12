import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { toDecimal } from '../../../../../lib/utils/Decimals'
import { CarbonMetric } from '../../../../generated/schema'
import { ICarbonToken } from '../ICarbonToken'

export class C3T implements ICarbonToken {
  getDecimals(): number {
    return 18
  }

  returnUpdatedRetirementMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    carbonMetrics.c3tRetired = carbonMetrics.c3tRetired.plus(toDecimal(amount, this.getDecimals()))
    carbonMetrics.totalRetirements = carbonMetrics.totalRetirements.plus(toDecimal(amount, this.getDecimals()))

    return carbonMetrics
  }
}

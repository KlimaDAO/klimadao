import { BigInt } from '@graphprotocol/graph-ts'
import { toDecimal } from '../../../../../lib/utils/Decimals'
import { CarbonMetric } from '../../../../generated/schema'
import { ICarbonToken } from '../ICarbonToken'

export class ICR implements ICarbonToken {
  getDecimals(): number {
    return 18
  }

  returnUpdatedRetirementMetrics(carbonMetrics: CarbonMetric, amount: BigInt): CarbonMetric {
    carbonMetrics.mco2Retired = carbonMetrics.icrRetired.plus(toDecimal(amount, this.getDecimals()))
    carbonMetrics.totalRetirements = carbonMetrics.totalRetirements.plus(toDecimal(amount, this.getDecimals()))

    return carbonMetrics
  }
}

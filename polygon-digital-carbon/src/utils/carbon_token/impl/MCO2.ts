import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { toDecimal } from '../../../../../lib/utils/Decimals'
import { CarbonMetric, CarbonPoolCreditBalanceLoader } from '../../../../generated/schema'
import { ICarbonToken } from '../ICarbonToken'

export class MCO2 implements ICarbonToken {
  getDecimals(): number {
    return 18
  }

  returnUpdatedRetirementMetrics(carbonMetrics: CarbonMetric, carbonTon: BigInt): CarbonMetric {
    const carbonTonDecimal = new BigDecimal(carbonTon)
    carbonMetrics.mco2Retired = carbonMetrics.mco2Retired.plus(carbonTonDecimal)
    carbonMetrics.totalRetirements = carbonMetrics.totalRetirements.plus(carbonTonDecimal)

    return carbonMetrics
  }
}

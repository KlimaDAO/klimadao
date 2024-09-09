
import { BigDecimal } from '@graphprotocol/graph-ts'
import { CCO2 } from '../generated/KLIMA_CCO2/CCO2'
import { CCO2_ERC20_CONTRACT } from '../../lib/utils/Constants'

class AdjustedPriceResult {
    adjustedPrice: BigDecimal
    adjustedPricePerTonne: BigDecimal
  
    constructor(adjustedPrice: BigDecimal, adjustedPricePerTonne: BigDecimal) {
      this.adjustedPrice = adjustedPrice
      this.adjustedPricePerTonne = adjustedPricePerTonne
    }
  }
  
  export function calculateCCO2AdjustedPrice(swapClose: BigDecimal): AdjustedPriceResult {
    let cco2_contract = CCO2.bind(CCO2_ERC20_CONTRACT)
    let decimalRatio = BigDecimal.fromString(cco2_contract.decimalRatio().toString())
    let burningPercentage = BigDecimal.fromString(cco2_contract.burningPercentage().toString())
  
    /** Need to take into the account the fee, charged in the retired token
     * i.e. if the goal is to retire 100 tonnes at a 10% fee
     * ex. 100 = .9 * x. x = 111.11
     * So cost to the user is the same as retiring 111.11 tonnes, which accounts for the fee and actually retires 100 tonnes
     */
  
    let effectiveFeePercentage = BigDecimal.fromString('1').minus(burningPercentage.div(decimalRatio))
  
    let adjustedPrice = swapClose.div(effectiveFeePercentage)
  
    return new AdjustedPriceResult(adjustedPrice, adjustedPrice.times(BigDecimal.fromString('1000')))
  }
  
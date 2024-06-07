import {
  KLIMA_BCT_PAIR,
  BCT_USDC_PAIR,
  KLIMA_MCO2_PAIR,
  KLIMA_USDC_PAIR,
  KLIMA_UBO_PAIR,
  KLIMA_NBO_PAIR,
  MCO2_USDC_PAIR,
  NCT_USDC_PAIR,
  KLIMA_NCT_PAIR,
  KLIMA_CCO2_PAIR,
} from './Constants'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { UniswapV2Pair } from '../generated/UniswapV2Pair'
import { toDecimal, BIG_DECIMAL_1E9, BIG_DECIMAL_1E12 } from './Decimals'
import { IToken } from '../tokens/IToken'
import { BCT } from '../tokens/impl/BCT'
import { USDC } from '../tokens/impl/USDC'
import { KLIMA } from '../tokens/impl/KLIMA'
import { MCO2 } from '../tokens/impl/MCO2'
import { UBO } from '../tokens/impl/UBO'
import { NBO } from '../tokens/impl/NBO'
import { NCT } from '../tokens/impl/NCT'
import { CCO2 } from '../tokens/impl/CCO2'

enum RATE_FOR_TOKEN {
  FIRST,
  SECOND,
}

export class PriceUtil {
  private static bctToken: BCT = new BCT()
  private static nctToken: NCT = new NCT()
  private static mco2Token: MCO2 = new MCO2()
  private static cco2Token: CCO2 = new CCO2()
  private static uboToken: UBO = new UBO()
  private static nboToken: NBO = new NBO()
  private static klimaToken: KLIMA = new KLIMA()
  private static usdcToken: USDC = new USDC()

  static getBCT_USDRate(): BigDecimal {
    return this.getUniV2Rate(
      BCT_USDC_PAIR,
      this.usdcToken.getDecimals(),
      this.bctToken.getDecimals(),
      RATE_FOR_TOKEN.SECOND
    )
  }

  static getKLIMA_BCTRate(): BigDecimal {
    return this.getUniV2Rate(
      KLIMA_BCT_PAIR,
      this.bctToken.getDecimals(),
      this.klimaToken.getDecimals(),
      RATE_FOR_TOKEN.SECOND
    )
  }

  static getKLIMA_USDRate(): BigDecimal {
    return this.getUniV2Rate(
      KLIMA_USDC_PAIR,
      this.usdcToken.getDecimals(),
      this.klimaToken.getDecimals(),
      RATE_FOR_TOKEN.SECOND
    )
  }

  static getKLIMA_MCO2Rate(): BigDecimal {
    return this.getUniV2Rate(
      KLIMA_MCO2_PAIR,
      this.klimaToken.getDecimals(),
      this.mco2Token.getDecimals(),
      RATE_FOR_TOKEN.FIRST
    )
  }

  static getKLIMA_CCO2Rate(): BigDecimal {
    return this.getUniV2Rate(
      KLIMA_CCO2_PAIR,
      this.klimaToken.getDecimals(),
      this.cco2Token.getDecimals(),
      RATE_FOR_TOKEN.FIRST
    )
  }

  static getMCO2_USDRate(): BigDecimal {
    return this.getUniV2Rate(
      MCO2_USDC_PAIR,
      this.usdcToken.getDecimals(),
      this.mco2Token.getDecimals(),
      RATE_FOR_TOKEN.SECOND
    )
  }

  static getKLIMA_UBORate(): BigDecimal {
    return this.getUniV2Rate(
      KLIMA_UBO_PAIR,
      this.uboToken.getDecimals(),
      this.klimaToken.getDecimals(),
      RATE_FOR_TOKEN.SECOND
    )
  }

  static getKLIMA_NBORate(): BigDecimal {
    return this.getUniV2Rate(
      KLIMA_NBO_PAIR,
      this.klimaToken.getDecimals(),
      this.nboToken.getDecimals(),
      RATE_FOR_TOKEN.FIRST
    )
  }

  static getNCT_USDRate(): BigDecimal {
    return this.getUniV2Rate(
      NCT_USDC_PAIR,
      this.usdcToken.getDecimals(),
      this.nctToken.getDecimals(),
      RATE_FOR_TOKEN.SECOND
    )
  }

  static getKLIMA_NCTRate(): BigDecimal {
    return this.getUniV2Rate(
      KLIMA_NCT_PAIR,
      this.klimaToken.getDecimals(),
      this.nctToken.getDecimals(),
      RATE_FOR_TOKEN.SECOND
    )
  }

  //(slp_treasury/slp_supply)*(2*sqrt(lp_dai * lp_ohm))
  static getDiscountedPairCO2(
    lp_amount: BigInt,
    pair_address: Address,
    pairToken0: IToken,
    pairToken1: IToken
  ): BigDecimal {
    let pair = UniswapV2Pair.bind(pair_address)

    let total_lpCall = pair.try_totalSupply()
    if (total_lpCall.reverted) {
      return BigDecimal.zero()
    }

    let total_lp = total_lpCall.value
    let lp_token_1 = toDecimal(pair.getReserves().value0, pairToken0.getDecimals())
    let lp_token_2 = toDecimal(pair.getReserves().value1, pairToken1.getDecimals())
    let kLast = lp_token_1.times(lp_token_2).truncate(0).digits

    let part1 = toDecimal(lp_amount, 18).div(toDecimal(total_lp, 18))
    let two = BigInt.fromI32(2)

    let sqrt = kLast.sqrt()
    let part2 = toDecimal(two.times(sqrt), 0)
    let result = part1.times(part2)

    return result
  }

  // (bondPrice-marketPrice)/bondPrice
  static calculateBondDiscount(bondPrice: BigDecimal, marketPrice: BigDecimal): BigDecimal {
    const discount = marketPrice.minus(bondPrice).div(bondPrice)
    return discount
  }

  private static getUniV2Rate(
    pairAddress: Address,
    token0Decimals: number,
    token1Decimals: number,
    rateForToken: RATE_FOR_TOKEN
  ): BigDecimal {
    let pair = UniswapV2Pair.bind(pairAddress)

    let reservesCall = pair.try_getReserves()
    if (reservesCall.reverted) {
      return BigDecimal.zero()
    }

    let reserves = reservesCall.value
    let reserve0 = reserves.value0
    let reserve1 = reserves.value1

    if (rateForToken == RATE_FOR_TOKEN.FIRST) {
      return toDecimal(reserve1, token1Decimals).div(toDecimal(reserve0, token0Decimals))
    } else {
      return toDecimal(reserve0, token0Decimals).div(toDecimal(reserve1, token1Decimals))
    }
  }
}

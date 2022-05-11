import {
    KLIMA_BCT_PAIR, BCT_USDC_PAIR, NCT_USDC_PAIR,
    KLIMA_MCO2_PAIR, KLIMA_ERC20_V1_CONTRACT,
    KLIMA_UBO_PAIR, KLIMA_NBO_PAIR
} from '../../../lib/utils/Constants'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { UniswapV2Pair } from '../../generated/TreasuryV1/UniswapV2Pair';
import { toDecimal } from '../../../lib/utils/Decimals'


let BIG_DECIMAL_1E9 = BigDecimal.fromString('1e9')
let BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12')

export function getBCTUSDRate(): BigDecimal {

    let pair = UniswapV2Pair.bind(Address.fromString(BCT_USDC_PAIR))

    let reserves = pair.getReserves()
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    let bctRate = reserve0.div(reserve1).times(BIG_DECIMAL_1E12)
    log.debug("BCT rate {}", [bctRate.toString()])

    return bctRate
}

export function getNCTUSDRate(): BigDecimal {

    let pair = UniswapV2Pair.bind(Address.fromString(NCT_USDC_PAIR))

    let reserves = pair.getReserves()
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    let nctRate = reserve0.div(reserve1).times(BIG_DECIMAL_1E12)
    log.debug("NCT rate {}", [nctRate.toString()])

    return nctRate
}

export function getKLIMAUSDRate(): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(KLIMA_BCT_PAIR))

    let reserves = pair.getReserves()
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    let bctRate = getBCTUSDRate()

    let klimaRate = reserve0.div(reserve1).div(BIG_DECIMAL_1E9).times(bctRate)
    log.debug("KLIMA rate {}", [klimaRate.toString()])

    return klimaRate
}

export function getKLIMABCTRate(): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(KLIMA_BCT_PAIR))

    let reserves = pair.getReserves()
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    let klimaRate = reserve0.div(reserve1).div(BIG_DECIMAL_1E9)
    log.debug("KLIMA BCT rate {}", [klimaRate.toString()])

    return klimaRate
}

export function getKLIMAMCO2Rate(): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(KLIMA_MCO2_PAIR))

    let reserves = pair.getReserves()
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    let klimaRate = reserve0.div(reserve1).times(BIG_DECIMAL_1E9)
    log.debug("KLIMA MCO2 rate {}", [klimaRate.toString()])

    return klimaRate
}

export function getKLIMAUBORate(): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(KLIMA_UBO_PAIR))

    let reserves = pair.getReserves()
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    let klimaRate = reserve0.div(reserve1).div(BIG_DECIMAL_1E9)
    log.debug("KLIMA UBO rate {}", [klimaRate.toString()])

    return klimaRate
}

export function getKLIMANBORate(): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(KLIMA_NBO_PAIR))

    let reserves = pair.getReserves()
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    let klimaRate = reserve1.div(reserve0).div(BIG_DECIMAL_1E9)
    log.debug("KLIMA NBO rate {}", [klimaRate.toString()])

    return klimaRate
}

//(slp_treasury/slp_supply)*(2*sqrt(lp_dai * lp_ohm))
export function getDiscountedPairCO2(lp_amount: BigInt, pair_address: string): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(pair_address))

    let total_lp = pair.totalSupply()
    let lp_token_1 = toDecimal(pair.getReserves().value0, 9)
    let lp_token_2 = toDecimal(pair.getReserves().value1, 18)
    let kLast = lp_token_1.times(lp_token_2).truncate(0).digits

    let part1 = toDecimal(lp_amount, 18).div(toDecimal(total_lp, 18))
    let two = BigInt.fromI32(2)

    let sqrt = kLast.sqrt();
    let part2 = toDecimal(two.times(sqrt), 0)
    let result = part1.times(part2)
    return result
}

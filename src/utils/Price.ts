import {
    KLIMA_BCT_PAIR, BCT_USDC_PAIR, KLIMA_ERC20_V1_CONTRACT
} from './Constants'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { UniswapV2Pair } from '../../generated/KlimaStakingV1/UniswapV2Pair';
import { toDecimal } from './Decimals'


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

//(slp_treasury/slp_supply)*(2*sqrt(lp_dai * lp_ohm))
export function getDiscountedPairCO2(lp_amount: BigInt, pair_adress: string): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(pair_adress))

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

export function getKlimaPairUSD(lp_amount: BigInt, pair_adress: string): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(pair_adress))
    let total_lp = pair.totalSupply()
    let token_0 = pair.token0().toString()
    let lp_token_0 = pair.getReserves().value0
    let lp_token_1 = pair.getReserves().value1
    let ownedLP = toDecimal(lp_amount, 18).div(toDecimal(total_lp, 18))

    let total_lp_usd = BigDecimal.fromString("0")

    if (token_0 = KLIMA_ERC20_V1_CONTRACT) {
        let klima_value = toDecimal(lp_token_0, 9).times(getKLIMAUSDRate())
        let total_lp_usd = klima_value.plus(toDecimal(lp_token_1, 18).times(getBCTUSDRate()))
    } else {
        let klima_value = toDecimal(lp_token_1, 9).times(getKLIMAUSDRate())
        let total_lp_usd = klima_value.plus(toDecimal(lp_token_0, 18).times(getBCTUSDRate()))
    }

    return ownedLP.times(total_lp_usd)
}

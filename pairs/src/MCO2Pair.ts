import {
  TREASURY_ADDRESS, KLIMA_USDC_PAIR, KLIMA_BCT_PAIR, BCT_USDC_PAIR, NCT_USDC_PAIR,
  BCT_USDC_PAIR_BLOCK, KLIMA_BCT_PAIR_BLOCK
} from '../../lib/utils/Constants'
import { BigInt, BigDecimal, log } from '@graphprotocol/graph-ts'
import { Pair, Token, Swap } from '../generated/schema'
import {
  Swap as SwapEvent,
  Pair as PairContract,
} from "../generated/KLIMA_USDC/Pair"
import { ERC20 as ERC20Contract } from '../generated/KLIMA_USDC/ERC20'
import { Address } from '@graphprotocol/graph-ts'
import { BigDecimalZero, BigIntZero } from './utils'
import { hourFromTimestamp } from '../../lib/utils/Dates'

let BIG_DECIMAL_1E9 = BigDecimal.fromString('1e9')
let BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12')

export function getKLIMAUSDRate(): BigDecimal {
  let pair = PairContract.bind(Address.fromString(KLIMA_BCT_PAIR))

  let reserves = pair.getReserves()
  let reserve0 = reserves.value0.toBigDecimal()
  let reserve1 = reserves.value1.toBigDecimal()

  let bctRate = getBCTUSDRate()

  let klimaRate = reserve0.div(reserve1).div(BIG_DECIMAL_1E9).times(bctRate)
  log.debug("KLIMA rate {}", [klimaRate.toString()])

  return klimaRate
}
  export function getBCTUSDRate(): BigDecimal {

    let pair = PairContract.bind(Address.fromString(BCT_USDC_PAIR))

    let reserves = pair.getReserves()
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    let bctRate = reserve0.div(reserve1).times(BIG_DECIMAL_1E12)
    log.debug("BCT rate {}", [bctRate.toString()])

    return bctRate
}

export function getCreateToken(address: Address): Token {
  let token = Token.load(address.toHexString())

  if (token == null) {
    let contract = ERC20Contract.bind(address)

    token = new Token(address.toHexString())
    token.name = contract.name()
    token.symbol = contract.symbol()
    token.decimals = contract.decimals()
    token.save()
  }

  return token as Token
}

export function getCreatePair(address: Address): Pair {
  let pair = Pair.load(address.toHexString())

  if (pair == null) {
    let contract = PairContract.bind(address)

    pair = new Pair(address.toHexString())
    pair.token0 = getCreateToken(contract.token0()).id
    pair.token1 = getCreateToken(contract.token1()).id
    pair.currentprice = BigDecimalZero
    pair.totalvolume = BigDecimalZero
    pair.totalklimaearnedfees = BigDecimalZero
    pair.lastupdate = ''
    pair.save()
  }

  return pair as Pair
}

function toUnits(x: BigInt, decimals: number): BigDecimal {
  let denom = BigInt.fromI32(10).pow(decimals as u8).toBigDecimal()
  return x.toBigDecimal().div(denom)
}


export function handleSwap(event: SwapEvent): void {
  let treasury_address = Address.fromString(TREASURY_ADDRESS)
  let klima_usdc_address = Address.fromString(KLIMA_USDC_PAIR)
  let bct_usdc_address = Address.fromString(BCT_USDC_PAIR)
  let nct_usdc_address = Address.fromString(NCT_USDC_PAIR)
  let pair = getCreatePair(event.address)
  let contract = PairContract.bind(event.address)
  let total_lp = toUnits(contract.totalSupply(), 18)
  let tokenBalance = toUnits(contract.balanceOf(treasury_address), 18)
  let ownedLP = tokenBalance.div(total_lp)

  let hour_timestamp = hourFromTimestamp(event.block.timestamp)
  // let hourlyId = event.address.toHexString() + hour_timestamp
  let hourlyId = event.transaction.hash.toHexString()
  // let hourlyId = event.address.toHexString() + event.block.timestamp.toString()
  let price = BigDecimalZero
  let volume = BigDecimalZero
  let token0qty = BigDecimalZero
  let token1qty = BigDecimalZero
  let lastreserves0 = BigDecimalZero
  let lastreserves1 = BigDecimalZero
  let expectedrate = BigDecimalZero
  let token0_decimals = (Token.load(pair.token0) as Token).decimals
  let token1_decimals = (Token.load(pair.token1) as Token).decimals
  let lprate = BigDecimal.fromString('0.003')
  let lpfees = BigDecimalZero
  let klimaearnedfees = BigDecimalZero
  let slippage = BigDecimalZero

  if (event.params.amount0In == BigIntZero && event.params.amount0Out == BigIntZero) {
    token1qty = toUnits(event.params.amount1In, token1_decimals)
    lpfees = (lprate).times(token1qty)
    klimaearnedfees = ownedLP.times(lpfees)
    volume = token1qty
  }

  if (event.params.amount1In == BigIntZero && event.params.amount1Out != BigIntZero) {
    price = toUnits(event.params.amount1Out, token1_decimals).div(toUnits(event.params.amount0In, token0_decimals))
    token0qty = toUnits(event.params.amount0In, token0_decimals)
    token1qty = toUnits(event.params.amount1Out, token1_decimals)
    lastreserves0 = toUnits(contract.getReserves().value0, token0_decimals).minus(token0qty)
    lastreserves1= toUnits(contract.getReserves().value1, token1_decimals).plus(token1qty)
    expectedrate = lastreserves1.div(lastreserves0)
    lpfees = (lprate).times(token1qty)
    slippage = ((expectedrate.minus(price)).times(token1qty)).minus(lpfees)
    klimaearnedfees = ownedLP.times(lpfees)
    volume = token1qty
  }
  if (event.params.amount1Out == BigIntZero && event.params.amount1In != BigIntZero) {
    price = toUnits(event.params.amount1In, token1_decimals).div(toUnits(event.params.amount0Out, token0_decimals))
    token0qty = toUnits(event.params.amount0Out, token0_decimals)
    token1qty = toUnits(event.params.amount1In, token1_decimals)
    lastreserves0 = toUnits(contract.getReserves().value0, token0_decimals).plus(token0qty)
    lastreserves1= toUnits(contract.getReserves().value1, token1_decimals).minus(token1qty)
    expectedrate = lastreserves1.div(lastreserves0)
    lpfees = (lprate).times(token1qty)
    slippage = ((price.minus(expectedrate)).times(token1qty)).minus(lpfees)
    klimaearnedfees = ownedLP.times(lpfees)
    volume = token1qty
  }
  let swap = Swap.load(hourlyId)
  let usdprice = getKLIMAUSDRate().div(price)
  if (swap == null) {
    swap = new Swap(hourlyId)
    swap.lpfees = lpfees.times(usdprice)
    swap.slippage = slippage.times(usdprice)
    swap.klimaearnedfees = klimaearnedfees.times(usdprice)
    swap.open = usdprice
    swap.high = usdprice
    swap.low = usdprice
    swap.close = usdprice
    swap.volume = volume.times(usdprice)
    swap.timestamp = hour_timestamp
    swap.pair = pair.id
    swap.save()
  }
  else {
    if (swap.high < usdprice && usdprice != BigDecimalZero) {
      swap.high = usdprice
    }

    if (swap.low > usdprice && usdprice != BigDecimalZero) {
      swap.low = usdprice
    }

    if (usdprice != BigDecimalZero){
      swap.close = usdprice
    }
    swap.volume = swap.volume.plus((volume.times(usdprice)))
    swap.lpfees = swap.lpfees.plus((lpfees.times(usdprice)))
    swap.klimaearnedfees = swap.klimaearnedfees.plus((klimaearnedfees.times(usdprice)))
    swap.slippage = swap.slippage.plus((slippage.times(usdprice)))
    swap.save()
  }
  pair.currentprice = swap.close
  pair.totalvolume = pair.totalvolume.plus(swap.volume)
  pair.totalklimaearnedfees = pair.totalklimaearnedfees.plus(swap.klimaearnedfees)
  pair.lastupdate = hour_timestamp
  pair.save()
}

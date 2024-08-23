import { TREASURY_ADDRESS, KLIMA_USDC_PAIR, BCT_USDC_PAIR, NCT_USDC_PAIR } from '../../lib/utils/Constants'
import { BigInt, BigDecimal, log } from '@graphprotocol/graph-ts'
import { Pair, Token, Swap } from '../generated/schema'
import { Swap as SwapEvent, Pair as PairContract } from '../generated/KLIMA_USDC/Pair'
import { ERC20 as ERC20Contract } from '../generated/KLIMA_USDC/ERC20'
import { Address } from '@graphprotocol/graph-ts'
import { BigDecimalZero, BigIntZero } from './utils'
import { hourTimestamp } from '../../lib/utils/Dates'
import { PriceUtil } from '../../lib/utils/Price'

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
    pair.currentpricepertonne = BigDecimalZero
    pair.totalvolume = BigDecimalZero
    pair.totalklimaearnedfees = BigDecimalZero
    pair.lastupdate = ''
    pair.save()
  }

  return pair as Pair
}

function toUnits(x: BigInt, decimals: number): BigDecimal {
  let denom = BigInt.fromI32(10)
    .pow(decimals as u8)
    .toBigDecimal()
  return x.toBigDecimal().div(denom)
}

export function handleSwap(event: SwapEvent): void {
  let pair = getCreatePair(event.address)
  let contract = PairContract.bind(event.address)
  let total_lp = toUnits(contract.totalSupply(), 18)
  let tokenBalance = toUnits(contract.balanceOf(TREASURY_ADDRESS), 18)
  let ownedLP = tokenBalance.div(total_lp)

  let hour_timestamp = hourTimestamp(event.block.timestamp)
  let hourlyId = event.address.toHexString() + hour_timestamp

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
    lpfees = lprate.times(token1qty)
    klimaearnedfees = ownedLP.times(lpfees)
    volume = token1qty
  }

  if (event.params.amount1In == BigIntZero && event.params.amount1Out != BigIntZero) {
    price = toUnits(event.params.amount1Out, token1_decimals).div(toUnits(event.params.amount0In, token0_decimals))
    token0qty = toUnits(event.params.amount0In, token0_decimals)
    token1qty = toUnits(event.params.amount1Out, token1_decimals)
    lastreserves0 = toUnits(contract.getReserves().value0, token0_decimals).minus(token0qty)
    lastreserves1 = toUnits(contract.getReserves().value1, token1_decimals).plus(token1qty)
    expectedrate = lastreserves1.div(lastreserves0)
    lpfees = lprate.times(token1qty)
    slippage = expectedrate.minus(price).times(token1qty).minus(lpfees)
    klimaearnedfees = ownedLP.times(lpfees)
    volume = token1qty
  }
  if (event.params.amount1Out == BigIntZero && event.params.amount1In != BigIntZero) {
    price = toUnits(event.params.amount1In, token1_decimals).div(toUnits(event.params.amount0Out, token0_decimals))
    token0qty = toUnits(event.params.amount0Out, token0_decimals)
    token1qty = toUnits(event.params.amount1In, token1_decimals)
    lastreserves0 = toUnits(contract.getReserves().value0, token0_decimals).plus(token0qty)
    lastreserves1 = toUnits(contract.getReserves().value1, token1_decimals).minus(token1qty)
    expectedrate = lastreserves1.div(lastreserves0)
    lpfees = lprate.times(token1qty)
    slippage = price.minus(expectedrate).times(token1qty).minus(lpfees)
    klimaearnedfees = ownedLP.times(lpfees)
    volume = token1qty
  }
  let swap = Swap.load(hourlyId)
  let usdprice = PriceUtil.getKLIMA_USDRate().div(price)
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
  } else {
    if (swap.high < usdprice && usdprice != BigDecimalZero) {
      swap.high = usdprice
    }

    if (swap.low > usdprice && usdprice != BigDecimalZero) {
      swap.low = usdprice
    }

    if (usdprice != BigDecimalZero) {
      swap.close = usdprice
    }
    swap.volume = swap.volume.plus(volume.times(usdprice))
    swap.lpfees = swap.lpfees.plus(lpfees.times(usdprice))
    swap.klimaearnedfees = swap.klimaearnedfees.plus(klimaearnedfees.times(usdprice))
    swap.slippage = swap.slippage.plus(slippage.times(usdprice))
    swap.save()
  }
  pair.currentprice = swap.close
  pair.currentpricepertonne = swap.close
  pair.totalvolume = pair.totalvolume.plus(swap.volume)
  pair.totalklimaearnedfees = pair.totalklimaearnedfees.plus(swap.klimaearnedfees)
  pair.lastupdate = hour_timestamp
  pair.save()
}

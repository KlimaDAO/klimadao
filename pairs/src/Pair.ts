import {
  TREASURY_ADDRESS,
  KLIMA_USDC_PAIR,
  KLIMA_BCT_PAIR,
  BCT_USDC_PAIR,
  NCT_USDC_PAIR,
  KLIMA_NBO_PAIR,
  KLIMA_NBO_V2_PAIR,
  KLIMA_UBO_PAIR,
  UBO_KLIMA_V2_PAIR,
  KLIMA_MCO2_PAIR,
  KLIMA_CCO2_PAIR,
  KLIMA_NBO_PAIR_BLOCK,
  KLIMA_UBO_PAIR_BLOCK,
  UBO_KLIMA_V2_PAIR_BLOCK,
  KLIMA_NBO_V2_PAIR_BLOCK,
  KLIMA_BCT_PAIR_BLOCK,
  KLIMA_MCO2_PAIR_BLOCK,
  KLIMA_CCO2_PAIR_BLOCK,
  CCO2_ERC20_CONTRACT,
} from '../../lib/utils/Constants'
import { BigInt, BigDecimal, log } from '@graphprotocol/graph-ts'
import { Pair, Token, Swap } from '../generated/schema'
import { Swap as SwapEvent, Pair as PairContract } from '../generated/KLIMA_USDC/Pair'
import { ERC20 as ERC20Contract } from '../generated/KLIMA_USDC/ERC20'
import { Address } from '@graphprotocol/graph-ts'
import { BigDecimalZero, BigIntZero } from './utils'
import { calculateCCO2AdjustedPrice } from './pair.utils'
import { hourTimestamp } from '../../lib/utils/Dates'
import { PriceUtil } from '../../lib/utils/Price'

// Create or Load Token
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

// Create or Load Pair
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

// Update usd_price of the pair whenever a swap event occurs in KLIMA_USDC Pair
export function updatePairPrice(address: Address, klima_usdc_rate: BigDecimal, hour_timestamp: string): void {
  log.debug('Updating price for {}', [address.toHexString()])
  let price = BigDecimalZero

  if (address == KLIMA_NBO_PAIR) {
    price = klima_usdc_rate.div(PriceUtil.getKLIMA_NBORate())
  }
  if (address == KLIMA_UBO_PAIR) {
    price = klima_usdc_rate.div(PriceUtil.getKLIMA_UBORate())
  }
  if (address == KLIMA_NBO_V2_PAIR) {
    price = klima_usdc_rate.div(PriceUtil.getKLIMA_NBOV2Rate())
  }
  if (address == UBO_KLIMA_V2_PAIR) {
    price = klima_usdc_rate.div(PriceUtil.getUBO_KLIMAV2Rate())
  }
  if (address == KLIMA_MCO2_PAIR) {
    price = klima_usdc_rate.div(PriceUtil.getKLIMA_MCO2Rate())
  }
  if (address == KLIMA_BCT_PAIR) {
    log.debug('Klima BCT rate {}', [PriceUtil.getKLIMA_BCTRate().toString()])
    price = klima_usdc_rate.div(PriceUtil.getKLIMA_BCTRate())
  }
  if (address == KLIMA_CCO2_PAIR) {
    log.debug('Klima CCO2 rate {}', [PriceUtil.getKLIMA_CCO2Rate().toString()])
    price = klima_usdc_rate.div(PriceUtil.getKLIMA_CCO2Rate())
  }

  let hourly_id = address.toHexString() + hour_timestamp
  let swap = Swap.load(hourly_id)
  let pair = getCreatePair(address)
  if (swap == null) {
    swap = new Swap(hourly_id)
    swap.lpfees = BigDecimalZero
    swap.slippage = BigDecimalZero
    swap.klimaearnedfees = BigDecimalZero
    swap.open = price
    swap.high = price
    swap.low = price
    swap.close = price
    swap.volume = BigDecimalZero
    swap.timestamp = hour_timestamp
    swap.pair = pair.id
    swap.save()
  } else {
    if (swap.high < price && price != BigDecimalZero) {
      swap.high = price
    }

    if (swap.low > price && price != BigDecimalZero) {
      swap.low = price
    }

    if (price != BigDecimalZero) {
      swap.close = price
    }
    swap.save()
  }
  pair.currentprice = swap.close
  pair.currentpricepertonne = swap.close

  // calculate cco2 fee from contract. Apply to currentprice and currentPricePerTonne
  if (address == KLIMA_CCO2_PAIR) {
    let adjustedPriceResult = calculateCCO2AdjustedPrice(swap.close)

    pair.currentprice = adjustedPriceResult.adjustedPrice
    // convert the adjusted price to per tonne as cco2 uses kgs
    pair.currentpricepertonne = adjustedPriceResult.adjustedPricePerTonne
  }

  pair.lastupdate = hour_timestamp
  pair.save()
}

function toUnits(x: BigInt, decimals: number): BigDecimal {
  let denom = BigInt.fromI32(10)
    .pow(decimals as u8)
    .toBigDecimal()
  return x.toBigDecimal().div(denom)
}

export function handleSwap(event: SwapEvent): void {
  let treasury_address = TREASURY_ADDRESS
  let pair = getCreatePair(event.address)
  let contract = PairContract.bind(event.address)
  let total_lp = toUnits(contract.totalSupply(), 18)
  let tokenBalance = toUnits(contract.balanceOf(treasury_address), 18)
  let ownedLP = total_lp == BigDecimalZero ? BigDecimalZero : tokenBalance.div(total_lp)

  let hour_timestamp = hourTimestamp(event.block.timestamp)
  let hourlyId = event.address.toHexString() + hour_timestamp

  // variables default values
  let price = BigDecimalZero
  let usdprice = BigDecimalZero
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

  if (event.params.amount1In == BigIntZero && event.params.amount1Out == BigIntZero) {
    token0qty = toUnits(event.params.amount0In, token0_decimals)
    lpfees = lprate.times(token0qty)
    klimaearnedfees = ownedLP.times(lpfees)
    volume = token0qty
  }

  if (event.params.amount0In == BigIntZero && event.params.amount0Out != BigIntZero) {
    price = toUnits(event.params.amount0Out, token0_decimals).div(toUnits(event.params.amount1In, token1_decimals))
    token0qty = toUnits(event.params.amount0Out, token0_decimals)
    token1qty = toUnits(event.params.amount1In, token1_decimals)
    lastreserves0 = toUnits(contract.getReserves().value0, token0_decimals).plus(token0qty)
    lastreserves1 = toUnits(contract.getReserves().value1, token1_decimals).minus(token1qty)
    expectedrate = lastreserves0.div(lastreserves1)
    lpfees = lprate.times(token0qty)
    slippage = expectedrate.minus(price).times(token1qty).minus(lpfees)
    klimaearnedfees = ownedLP.times(lpfees)
    volume = token0qty
  }
  if (event.params.amount0Out == BigIntZero && event.params.amount0In != BigIntZero) {
    price = toUnits(event.params.amount0In, token0_decimals).div(toUnits(event.params.amount1Out, token1_decimals))
    token0qty = toUnits(event.params.amount0In, token0_decimals)
    token1qty = toUnits(event.params.amount1Out, token1_decimals)
    lastreserves0 = toUnits(contract.getReserves().value0, token0_decimals).minus(token0qty)
    lastreserves1 = toUnits(contract.getReserves().value1, token1_decimals).plus(token1qty)
    expectedrate = lastreserves0.div(lastreserves1)
    lpfees = lprate.times(token0qty)
    slippage = price.minus(expectedrate).times(token1qty).minus(lpfees)
    klimaearnedfees = ownedLP.times(lpfees)
    volume = token0qty
  }

  if (event.address == BCT_USDC_PAIR || event.address == KLIMA_USDC_PAIR || event.address == NCT_USDC_PAIR) {
    let swap = Swap.load(hourlyId)
    if (swap == null) {
      swap = new Swap(hourlyId)
      swap.lpfees = lpfees
      swap.slippage = slippage
      swap.klimaearnedfees = klimaearnedfees
      swap.open = price
      swap.high = price
      swap.low = price
      swap.close = price
      swap.volume = volume
      swap.timestamp = hour_timestamp
      swap.pair = pair.id
      swap.save()
    } else {
      if (swap.high < price && price != BigDecimalZero) {
        swap.high = price
      }

      if (swap.low > price && price != BigDecimalZero) {
        swap.low = price
      }

      if (price != BigDecimalZero) {
        swap.close = price
      }
      swap.volume = swap.volume.plus(volume)
      swap.lpfees = swap.lpfees.plus(lpfees)
      swap.klimaearnedfees = swap.klimaearnedfees.plus(klimaearnedfees)
      swap.slippage = swap.slippage.plus(slippage)
      swap.save()
    }
    pair.currentprice = swap.close
    pair.currentpricepertonne = swap.close
    pair.totalvolume = pair.totalvolume.plus(swap.volume)
    pair.totalklimaearnedfees = pair.totalklimaearnedfees.plus(swap.klimaearnedfees)
    pair.lastupdate = hour_timestamp
    pair.save()
  }
  if (event.address == KLIMA_USDC_PAIR) {
    // Update prices of tokens which are dependent on klima_usdc rate
    if (event.block.number.ge(KLIMA_NBO_PAIR_BLOCK)) {
      updatePairPrice(KLIMA_NBO_PAIR, price, hour_timestamp)
    }
    if (event.block.number.ge(KLIMA_UBO_PAIR_BLOCK)) {
      updatePairPrice(KLIMA_UBO_PAIR, price, hour_timestamp)
    }
    if (event.block.number.ge(KLIMA_NBO_V2_PAIR_BLOCK)) {
      updatePairPrice(KLIMA_NBO_V2_PAIR, price, hour_timestamp)
    }
    if (event.block.number.ge(UBO_KLIMA_V2_PAIR_BLOCK)) {
      updatePairPrice(UBO_KLIMA_V2_PAIR, price, hour_timestamp)
    }
    if (event.block.number.ge(KLIMA_BCT_PAIR_BLOCK)) {
      updatePairPrice(KLIMA_BCT_PAIR, price, hour_timestamp)
    }
    if (event.block.number.ge(KLIMA_MCO2_PAIR_BLOCK)) {
      updatePairPrice(KLIMA_MCO2_PAIR, price, hour_timestamp)
    }
    if (event.block.number.ge(KLIMA_CCO2_PAIR_BLOCK)) {
      updatePairPrice(KLIMA_CCO2_PAIR, price, hour_timestamp)
    }
  }

  if (event.address == KLIMA_BCT_PAIR || event.address == KLIMA_CCO2_PAIR) {
    let swap = Swap.load(hourlyId)
    if (price != BigDecimalZero) {
      usdprice = PriceUtil.getKLIMA_USDRate().div(price)
    }
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

    // calculate cco2 fee from contract. Apply to currentprice and currentPricePerTonne
    if (event.address == KLIMA_CCO2_PAIR) {
      let adjustedPriceResult = calculateCCO2AdjustedPrice(swap.close)

      pair.currentprice = adjustedPriceResult.adjustedPrice
      // convert the adjusted price to per tonne as cco2 uses kgs
      pair.currentpricepertonne = adjustedPriceResult.adjustedPricePerTonne
    }

    pair.totalvolume = pair.totalvolume.plus(swap.volume)
    pair.totalklimaearnedfees = pair.totalklimaearnedfees.plus(swap.klimaearnedfees)
    pair.lastupdate = hour_timestamp
    pair.save()
  }
}

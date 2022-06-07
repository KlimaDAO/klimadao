import { BigDecimal, BigInt, Address, log } from "@graphprotocol/graph-ts";
import { UniswapV2Pair } from '../../../bonds/generated/BCTBondV1/UniswapV2Pair'
import { ERC20 } from '../../generated/ERC20'
import { IToken } from "../IToken";

import * as constants from '../../utils/Constants'
import { toDecimal, BIG_DECIMAL_1E9, BIG_DECIMAL_1E12, BIG_DECIMAL_1E18 } from "../../utils/Decimals";
import { KLIMA } from "./KLIMA";

export class MCO2 implements IToken {

  private contractAddress: Address = Address.fromString(constants.MCO2_ERC20_CONTRACT)
  private klimaToken: KLIMA = new KLIMA()

  getERC20ContractAddress(): string {
    return this.contractAddress.toHexString()
  }

  getTokenName(): string {
    return constants.MCO2_BOND_TOKEN
  }

  getDecimals(): number {
    return 18
  }

  getFormattedPrice(rawPrice: BigInt): BigDecimal {
    return toDecimal(rawPrice, this.getDecimals())
  }

  getMarketPrice(): BigDecimal {

    let pair = UniswapV2Pair.bind(Address.fromString(constants.KLIMA_MCO2_PAIR))
    let reserveCall = pair.try_getReserves()

    if (reserveCall.reverted) {
      return this.getMarketPriceViaUsdc()
    }

    let reserve0 = reserveCall.value.value0.toBigDecimal()
    let reserve1 = reserveCall.value.value1.toBigDecimal()

    let klimaRate = (reserve1.div(BIG_DECIMAL_1E18)).div((reserve0).div(BIG_DECIMAL_1E9))
    log.debug("[MCO2] Getting market price directly from LP: {}", [klimaRate.toString()])

    return klimaRate
  }

  private getMarketPriceViaUsdc(): BigDecimal {

    let mco2UsdcRate = this.getMco2USDRate()
    let klimaUsdcRate = this.klimaToken.getUSDPrice()

    log.debug("[MCO2] Getting market price via USDC - MCO2-USDC Rate: {} ; KLIMA-USDC Rate: {}",
      [mco2UsdcRate.toString(), klimaUsdcRate.toString()])

    if (mco2UsdcRate.equals(BigDecimal.zero())) {
      return BigDecimal.zero()
    }

    return klimaUsdcRate.div(mco2UsdcRate);
  }

  getUSDPrice(): BigDecimal {
    return this.getMco2USDRate()
  }

  private getMco2USDRate(): BigDecimal {

    let mco2UsdcPair = UniswapV2Pair.bind(Address.fromString(constants.MCO2_USDC_PAIR))
    let reservesCall = mco2UsdcPair.try_getReserves()
    if (reservesCall.reverted) {
      return BigDecimal.zero()
    }

    let mco2UsdcReserves = reservesCall.value
    let mco2UsdcReserve1 = mco2UsdcReserves.value0.toBigDecimal()
    let mco2UsdcReserve2 = mco2UsdcReserves.value1.toBigDecimal()

    let mco2UsdcRate = (mco2UsdcReserve1.times(BIG_DECIMAL_1E12)).div(mco2UsdcReserve2)

    return mco2UsdcRate
  }

  /**
   * Sekula: Need to find the most elegant way to call ether smart contract from here 
   */
  getTotalSupply(): BigDecimal {
    let ercContract = ERC20.bind(this.contractAddress)
    let totalSupply = toDecimal(ercContract.totalSupply(), this.getDecimals())

    return totalSupply
  }

  getAddressBalance(address: Address): BigDecimal {
    const newBalanceRaw = ERC20.bind(this.contractAddress).try_balanceOf(address)
    if (!newBalanceRaw.reverted) {
      return toDecimal(newBalanceRaw.value, this.getDecimals())
    }
    return BigDecimal.fromString("0")
  }
}

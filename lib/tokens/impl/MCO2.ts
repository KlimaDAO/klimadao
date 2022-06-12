import { BigDecimal, BigInt, Address, log } from "@graphprotocol/graph-ts";
import { UniswapV2Pair } from '../../../bonds/generated/BCTBondV1/UniswapV2Pair'
import { ERC20 } from '../../generated/ERC20'
import { IToken } from "../IToken";

import * as constants from '../../utils/Constants'
import { toDecimal } from "../../utils/Decimals";
import { KLIMA } from "./KLIMA";
import { PriceUtil } from "../../utils/Price";

export class MCO2 implements IToken {

  private contractAddress: Address = Address.fromString(constants.MCO2_ERC20_CONTRACT)
  private klimaToken: KLIMA = new KLIMA()

  getERC20ContractAddress(): string {
    return this.contractAddress.toHexString()
  }

  getTokenName(): string {
    return constants.MCO2_TOKEN
  }

  getDecimals(): number {
    return 18
  }

  getFormattedPrice(rawPrice: BigInt): BigDecimal {
    return toDecimal(rawPrice, this.getDecimals())
  }

  getMarketPrice(blockNumber: BigInt): BigDecimal {

    //We are going through MCO2-USD until KLIMA-MCO2 LP is created
    if (blockNumber.lt(BigInt.fromString(constants.KLIMA_MCO2_PAIR_BLOCK))) {
      return this.getMarketPriceViaUsdc(blockNumber)
    } else {
      return PriceUtil.getKLIMA_MCO2Rate()
    }
  }

  private getMarketPriceViaUsdc(blockNumber: BigInt): BigDecimal {

    let mco2UsdcRate = this.getUSDPrice(blockNumber)
    let klimaUsdcRate = this.klimaToken.getUSDPrice(blockNumber)

    log.debug("[MCO2] Getting market price via USDC - MCO2-USDC Rate: {} ; KLIMA-USDC Rate: {}",
      [mco2UsdcRate.toString(), klimaUsdcRate.toString()])

    if (mco2UsdcRate.equals(BigDecimal.zero())) {
      return BigDecimal.zero()
    }

    return klimaUsdcRate.div(mco2UsdcRate);
  }

  getUSDPrice(blockNumber: BigInt): BigDecimal {
    return PriceUtil.getMCO2_USDRate()
  }

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

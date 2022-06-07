import { BigDecimal, BigInt, Address, log } from "@graphprotocol/graph-ts";
import { UniswapV2Pair } from '../../../bonds/generated/BCTBondV1/UniswapV2Pair'
import { ERC20 } from '../../generated/ERC20'
import { IToken } from "../IToken";

import * as constants from '../../utils/Constants'
import { toDecimal, BIG_DECIMAL_1E9 } from "../../utils/Decimals"
import { KLIMA } from "./KLIMA";


export class UBO implements IToken {

  private contractAddress: Address = Address.fromString(constants.UBO_ERC20_CONTRACT)
  private klimaToken: KLIMA = new KLIMA()

  getERC20ContractAddress(): string {
    return this.contractAddress.toHexString()
  }

  getTokenName(): string {
    return constants.UBO_BOND_TOKEN
  }
  getDecimals(): number {
    return 18
  }

  getFormattedPrice(rawPrice: BigInt): BigDecimal {
    return toDecimal(rawPrice, this.getDecimals())
  }

  getMarketPrice(): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(constants.KLIMA_UBO_PAIR))

    let reservesCall = pair.try_getReserves()
    if (reservesCall.reverted) {
      return BigDecimal.zero()
    }

    let reserves = reservesCall.value
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    let klimaRate = reserve0.div(reserve1).div(BIG_DECIMAL_1E9)
    log.debug("KLIMA UBO rate {}", [klimaRate.toString()])

    return klimaRate
  }

  getUSDPrice(): BigDecimal {
    const klimaUsdPrice = this.klimaToken.getUSDPrice()
    const uboMarketPrice = this.getMarketPrice()
    if (uboMarketPrice.equals(BigDecimal.zero())) {
      return BigDecimal.zero()
    }

    return klimaUsdPrice.div(uboMarketPrice)
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

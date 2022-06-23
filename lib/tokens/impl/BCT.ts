import { BigDecimal, BigInt, Address } from "@graphprotocol/graph-ts";
import { ERC20 } from '../../generated/ERC20'
import { IToken } from "../IToken";

import * as constants from '../../utils/Constants'
import { toDecimal } from "../../utils/Decimals"
import { KLIMA } from "./KLIMA";
import { PriceUtil } from "../../utils/Price";


export class BCT implements IToken {

  private contractAddress: Address = Address.fromString(constants.BCT_ERC20_CONTRACT)
  private klimaToken: KLIMA = new KLIMA()

  getERC20ContractAddress(): string {
    return this.contractAddress.toHexString()
  }

  getTokenName(): string {
    return constants.BCT_TOKEN
  }
  getDecimals(): number {
    return 18
  }

  getFormattedPrice(rawPrice: BigInt): BigDecimal {
    return toDecimal(rawPrice, this.getDecimals())
  }

  getMarketPrice(blockNumber: BigInt): BigDecimal {
    return PriceUtil.getKLIMA_BCTRate()
  }

  getUSDPrice(blockNumber: BigInt): BigDecimal {

    //We are going through BCT-USD until the liquidity is removed
    if (blockNumber.lt(BigInt.fromString(constants.BCT_USDC_PAIR_REMOVE_LIQUIDITY_BLOCK))) {
      return PriceUtil.getBCT_USDRate()
    }

    const klimaUsdPrice = this.klimaToken.getUSDPrice(blockNumber)
    const bctMarketPrice = this.getMarketPrice(blockNumber)

    if (bctMarketPrice.equals(BigDecimal.zero())) {
      return BigDecimal.zero()
    }
    return klimaUsdPrice.div(bctMarketPrice)
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

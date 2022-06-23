import { BigDecimal, BigInt, Address } from "@graphprotocol/graph-ts";
import { ERC20 } from '../../generated/ERC20';
import { IToken } from "../IToken";

import * as constants from "../../utils/Constants";
import { toDecimal } from "../../utils/Decimals";
import { PriceUtil } from "../../utils/Price";

export class KLIMA implements IToken {

  private contractAddress: Address = Address.fromString(constants.KLIMA_ERC20_V1_CONTRACT);

  getERC20ContractAddress(): string {
    return this.contractAddress.toHexString();
  }

  getTokenName(): string {
    return constants.KLIMA_TOKEN;
  }

  getDecimals(): number {
    return 9;
  }

  getFormattedPrice(rawPrice: BigInt): BigDecimal {
    return toDecimal(rawPrice, this.getDecimals());
  }

  getMarketPrice(blockNumber: BigInt): BigDecimal {
    return BigDecimal.fromString("1")
  }

  getUSDPrice(blockNumber: BigInt): BigDecimal {

    //We are going through KLIMA-BCT route until Liquidity is bolstered for KLIMA USDC
    if (blockNumber.lt(BigInt.fromString(constants.KLIMA_USDC_PAIR_BOLSTER_LIQUIDITY_BLOCK))) {
      return PriceUtil.getKLIMA_BCTRate().times(PriceUtil.getBCT_USDRate())
    }

    return PriceUtil.getKLIMA_USDRate()
  }

  getTotalSupply(): BigDecimal {
    let ercContract = ERC20.bind(this.contractAddress);
    let totalSupply = toDecimal(ercContract.totalSupply(), this.getDecimals());

    return totalSupply;
  }

  getAddressBalance(address: Address): BigDecimal {
    const newBalanceRaw = ERC20.bind(this.contractAddress).try_balanceOf(address)
    if (!newBalanceRaw.reverted) {
      return toDecimal(newBalanceRaw.value, this.getDecimals())
    }
    return BigDecimal.fromString("0")
  }
}

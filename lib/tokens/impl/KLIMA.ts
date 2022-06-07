import { BigDecimal, BigInt, Address } from "@graphprotocol/graph-ts";
import { getKLIMAUSDRate } from "../../../bonds/src/utils/Price";
import { ERC20 } from '../../generated/ERC20';
import { IToken } from "../IToken";

import * as constants from "../../utils/Constants";
import { toDecimal } from "../../utils/Decimals";

export class KLIMA implements IToken {

  private contractAddress: Address = Address.fromString(constants.KLIMA_ERC20_V1_CONTRACT);

  getERC20ContractAddress(): string {
    return this.contractAddress.toHexString();
  }

  getTokenName(): string {
    return "KLIMA";
  }

  getDecimals(): number {
    return 9;
  }

  getFormattedPrice(rawPrice: BigInt): BigDecimal {
    return toDecimal(rawPrice, this.getDecimals());
  }

  getMarketPrice(): BigDecimal {
    return BigDecimal.fromString("1")
  }

  getUSDPrice(): BigDecimal {
    return getKLIMAUSDRate()
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

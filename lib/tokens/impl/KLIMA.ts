import { BigDecimal, BigInt, Address } from "@graphprotocol/graph-ts";
import { getKLIMAUSDRate } from "../../../bonds/src/utils/Price";
import { ERC20 } from "../../../bonds/generated/BCTBondV1/ERC20";
import { IToken } from "../IToken";

import * as constants from "../../utils/Constants";
import { toDecimal } from "../../utils/Decimals";

export class KLIMA implements IToken {

  private contractAddress: string = constants.KLIMA_ERC20_V1_CONTRACT;

  getERC20ContractAddress(): string {
    return this.contractAddress;
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
    let ercContract = ERC20.bind(Address.fromString(this.contractAddress));
    let totalSupply = toDecimal(ercContract.totalSupply(), this.getDecimals());

    return totalSupply;
  }
}

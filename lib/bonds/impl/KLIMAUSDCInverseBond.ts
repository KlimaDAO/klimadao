import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { IBondable } from "../IBondable";
import { IToken } from "../../tokens/IToken";

import * as constants from "../../utils/Constants";
import { toDecimal } from "../../utils/Decimals";
import { USDC } from "../../tokens/impl/USDC";
import { KLIMA } from "../../tokens/impl/KLIMA";

export class KLIMAUSDCInverseBond implements IBondable {
  
  private usdcToken: IToken
  private klimaToken: IToken

  constructor() {
    this.usdcToken = new USDC()
    this.klimaToken = new KLIMA()
  }

  getToken(): IToken {
    return this.usdcToken
  }

  getBondName(): string {
    return constants.USDC_INVERSE_BOND;
  }

  getDaoFeeForBondPayout(payout: BigDecimal): BigDecimal {
    return BigDecimal.zero()
  }

  getBondPrice(): BigDecimal {
    throw new Error("Not yet implemented")
  }

  getBondDiscount(blockNumber: BigInt): BigDecimal {
    throw new Error("Not yet implemented")
  }

  parseBondPrice(priceInUSD: BigInt): BigDecimal {
    return toDecimal(priceInUSD, this.getToken().getDecimals());
  }

  parseBondTokenValueFormatted(rawPrice: BigInt): BigDecimal {
    return this.klimaToken.getFormattedPrice(rawPrice)
  }

  getCarbonCustodied(depositAmount: BigInt): BigDecimal {
    return BigDecimal.zero()
  }

  getTreasuredAmount(): BigDecimal {
    return BigDecimal.zero()
  }
}

import { BigDecimal, BigInt, Address } from "@graphprotocol/graph-ts";
import { BondV1 } from "../../../bonds/generated/BCTBondV1/BondV1";
import { getDaoFee } from "../../../bonds/src/utils/DaoFee";
import { calculateBondDiscount } from "../../../bonds/src/utils/Price";
import { IBondable } from "../IBondable";
import { IToken } from "../../tokens/IToken";

import * as constants from "../../utils/Constants";
import { toDecimal } from "../../utils/Decimals";
import { USDC } from "../../tokens/impl/USDC";

export class KLIMAUSDCBond implements IBondable {
  
  private contractAddress: Address;
  private usdcToken: IToken

  constructor(constractAddress: Address) {
    this.contractAddress = constractAddress;
    this.usdcToken = new USDC()
  }

  getToken(): IToken {
    return this.usdcToken
  }

  getBondName(): string {
    return constants.KLIMAUSDC_LPBOND_TOKEN;
  }

  getBondPrice(): BigDecimal {

    let bond = BondV1.bind(this.contractAddress)
    const bondPriceInUsd = bond.bondPriceInUSD()

    return toDecimal(bondPriceInUsd, 6)
  }

  getBondDiscount(): BigDecimal {

    const bondPrice = this.getBondPrice()
    const marketPrice = this.getToken().getMarketPrice()

    return calculateBondDiscount(bondPrice, marketPrice)
  }

  getDaoFeeForBondPayout(payout: BigDecimal): BigDecimal {
    return getDaoFee(this.contractAddress, payout)
  }

  parseBondPrice(priceInUSD: BigInt): BigDecimal {
    return toDecimal(priceInUSD, 6);
  }

  parseBondTokenValueFormatted(rawPrice: BigInt): BigDecimal {
    return toDecimal(rawPrice, 18)
  }

  getCarbonCustodied(depositAmount: BigInt): BigDecimal {
    return toDecimal(depositAmount, this.getToken().getDecimals())
  }

  getTreasuredAmount(): BigDecimal {
    //This Bond does not bring any carbon offset into treasury
    return BigDecimal.zero()
  }
}

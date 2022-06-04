import { BigDecimal, BigInt, Address, log } from "@graphprotocol/graph-ts";
import { BondV1 } from "../../../bonds/generated/BCTBondV1/BondV1";
import { UniswapV2Pair } from "../../../bonds/generated/BCTBondV1/UniswapV2Pair";
import { getDaoFee } from "../../../bonds/src/utils/DaoFee";
import { calculateBondDiscount } from "../../../bonds/src/utils/Price";
import { IBondable } from "../IBondable";
import { IToken } from "../../tokens/IToken";

import * as constants from "../../utils/Constants";
import { toDecimal } from "../../utils/Decimals";
import { BCT } from "../../tokens/impl/BCT";
import { USDC } from "../../tokens/impl/USDC";

export class BCTUSDCBond implements IBondable {
  
  contractAddress: Address;

  private bctToken: IToken
  private usdcToken: IToken

  constructor(constractAddress: Address) {
    this.contractAddress = constractAddress;
    this.bctToken = new BCT()
    this.usdcToken = new USDC()
  }

  getToken(): IToken {
    return this.bctToken
  }

  getBondName(): string {
    return constants.BCTUSDC_LPBOND_TOKEN;
  }

  getBondPrice(): BigDecimal {

    let bond = BondV1.bind(this.contractAddress)
    const bondPriceInUsd = bond.bondPriceInUSD()

    //Is it 6 decimals here?
    return toDecimal(bondPriceInUsd, this.getToken().getDecimals())
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
    return toDecimal(priceInUSD, 18);
  }

  parseBondTokenValueFormatted(rawPrice: BigInt): BigDecimal {
    return toDecimal(rawPrice, 18)
  }

  getCarbonCustodied(depositAmount: BigInt): BigDecimal {
    // From older implementation - this returns zero
    return BigDecimal.zero()
  }

  getTreasuredAmount(): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(constants.KLIMA_BCT_PAIR))
    let reservesCall = pair.try_getReserves()
    if (reservesCall.reverted) {
        return BigDecimal.zero()
    }
    let reserves = reservesCall.value
    let lp_token_1 = toDecimal(reserves.value0, this.getToken().getDecimals())

    return lp_token_1
  }
}

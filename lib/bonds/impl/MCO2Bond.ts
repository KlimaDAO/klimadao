import { BigDecimal, BigInt, Address } from "@graphprotocol/graph-ts";
import { BondV1 } from "../../../bonds/generated/BCTBondV1/BondV1";
import { ERC20 } from "../../../bonds/generated/BCTBondV1/ERC20";
import { getDaoFee } from "../../../bonds/src/utils/DaoFee";
import { calculateBondDiscount } from "../../../bonds/src/utils/Price";
import { IBondable } from "../IBondable";
import { IToken } from "../../tokens/IToken";

import * as constants from "../../utils/Constants";
import { toDecimal } from "../../utils/Decimals";
import { MCO2 } from "../../tokens/impl/MCO2";

export class MCO2Bond implements IBondable {
  private contractAddress: Address;
  private mco2Token: IToken

  constructor(constractAddress: Address) {
    this.contractAddress = constractAddress;
    this.mco2Token = new MCO2()
  }

  getToken(): IToken {
    return this.mco2Token
  }

  getBondName(): string {
    return constants.MCO2_BOND_TOKEN;
  }

  getDaoFeeForBondPayout(payout: BigDecimal): BigDecimal {
    return getDaoFee(this.contractAddress, payout)
  }

  getBondPrice(): BigDecimal {

    let bond = BondV1.bind(this.contractAddress)
    const bondPriceInUsd = bond.bondPriceInUSD()

    return toDecimal(bondPriceInUsd, this.getToken().getDecimals())
  }

  getBondDiscount(): BigDecimal {

    const bondPrice = this.getBondPrice()
    const marketPrice = this.getToken().getMarketPrice()

    return calculateBondDiscount(bondPrice, marketPrice)
  }

  parseBondPrice(priceInUSD: BigInt): BigDecimal {
    return toDecimal(priceInUSD, 18);
  }

  parseBondTokenValueFormatted(rawPrice: BigInt): BigDecimal {
    return this.getToken().getFormattedPrice(rawPrice)
  }

  getCarbonCustodied(depositAmount: BigInt): BigDecimal {
    return toDecimal(depositAmount, this.getToken().getDecimals())
  }

  getTreasuredAmount(): BigDecimal {
    let treasuryAddress = Address.fromString(constants.TREASURY_ADDRESS);

    let ercContract = ERC20.bind(
      Address.fromString(this.getToken().getERC20ContractAddress())
    );
    let treasuryBalance = toDecimal(
      ercContract.balanceOf(treasuryAddress),
      this.getToken().getDecimals()
    );

    return treasuryBalance;
  }
}

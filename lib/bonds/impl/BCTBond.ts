import { BigDecimal, BigInt, Address, log } from "@graphprotocol/graph-ts";
import { BondV1 } from "../../../bonds/generated/BCTBondV1/BondV1";
import { ERC20 } from "../../../bonds/generated/BCTBondV1/ERC20";
import { getDaoFee } from "../../../bonds/src/utils/DaoFee";
import { IBondable } from "../../bonds/IBondable";
import { IToken } from "../../tokens/IToken";

import * as constants from "../../utils/Constants";
import { toDecimal } from "../../utils/Decimals";
import { BCT } from "../../tokens/impl/BCT";
import { PriceUtil } from "../../utils/Price";

export class BCTBond implements IBondable {
  
  private contractAddress: Address;
  private bctToken: IToken

  constructor(constractAddress: Address) {
    this.contractAddress = constractAddress;
    this.bctToken = new BCT()
  }

  getToken(): IToken {
    return this.bctToken
  }

  getBondName(): string {
    return constants.BCT_BOND_TOKEN;
  }

  getBondPrice(): BigDecimal {

    let bond = BondV1.bind(this.contractAddress)
    const bondPriceInUsd = bond.bondPriceInUSD()

    return toDecimal(bondPriceInUsd, this.getToken().getDecimals())
  }

  getBondDiscount(blockNumber: BigInt): BigDecimal {

    const bondPrice = this.getBondPrice()
    const marketPrice = this.getToken().getMarketPrice(blockNumber)

    return PriceUtil.calculateBondDiscount(bondPrice, marketPrice)
  }


  getDaoFeeForBondPayout(payout: BigDecimal): BigDecimal {
    return getDaoFee(this.contractAddress, payout)
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

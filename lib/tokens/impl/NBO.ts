import { BigDecimal, BigInt, Address, log } from "@graphprotocol/graph-ts";
import { UniswapV2Pair } from '../../../bonds/generated/BCTBondV1/UniswapV2Pair'
import { ERC20 } from '../../../bonds/generated/BCTBondV1/ERC20'
import { IToken } from "../IToken";

import * as constants from '../../utils/Constants'
import { toDecimal, BIG_DECIMAL_1E9 } from "../../utils/Decimals"
import { KLIMA } from "./KLIMA";


export class NBO implements IToken {

  private contractAddress: string = constants.NBO_ERC20_CONTRACT
  private klimaToken: KLIMA = new KLIMA()

  getERC20ContractAddress(): string {
    return this.contractAddress
  }

  getTokenName(): string {
    return constants.NBO_BOND_TOKEN
  }
  getDecimals(): number {
    return 18
  }

  getFormattedPrice(rawPrice: BigInt): BigDecimal {
    return toDecimal(rawPrice, this.getDecimals())
  }

  getMarketPrice(): BigDecimal {
    let pair = UniswapV2Pair.bind(Address.fromString(constants.KLIMA_NBO_PAIR))

    let reservesCall = pair.try_getReserves()
    if (reservesCall.reverted) {
        return BigDecimal.zero()
    }

    let reserves = reservesCall.value
    let reserve0 = reserves.value0.toBigDecimal()
    let reserve1 = reserves.value1.toBigDecimal()

    let klimaRate = reserve1.div((reserve0).times(BIG_DECIMAL_1E9))
    log.debug("KLIMA NBO rate {}", [klimaRate.toString()])

    return klimaRate
  }
   
  getUSDPrice(): BigDecimal {
    const klimaUsdPrice = this.klimaToken.getUSDPrice()
    const nboMarketPrice = this.getMarketPrice()
    if (nboMarketPrice.equals(BigDecimal.zero())) {
      return BigDecimal.zero()
    }
    
    return klimaUsdPrice.div(nboMarketPrice)
  }

  getTotalSupply(): BigDecimal {
   let ercContract = ERC20.bind(Address.fromString(this.contractAddress))
   let totalSupply = toDecimal(ercContract.totalSupply(), this.getDecimals())

   return totalSupply
  }
}

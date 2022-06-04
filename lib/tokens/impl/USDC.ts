import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { IToken } from "../IToken";

import { getKLIMAUSDRate } from "../../../bonds/src/utils/Price";
import { toDecimal } from "../../utils/Decimals";

export class USDC implements IToken {

    getERC20ContractAddress(): string {
        throw new Error("Method not implemented.");
    }

    getTokenName(): string {
        return "USDC"
    }
    getDecimals(): number {
        return 12
    }
    getFormattedPrice(rawPrice: BigInt): BigDecimal {
        return toDecimal(rawPrice, this.getDecimals())
    }
    
    getMarketPrice(): BigDecimal {
        return getKLIMAUSDRate()
    }
    
    getUSDPrice(): BigDecimal {
        return BigDecimal.fromString("1")
    }

    getTotalSupply(): BigDecimal {
        throw new Error("Method not implemented.");
    }
}
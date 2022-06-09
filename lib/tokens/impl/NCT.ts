import { BigDecimal, BigInt, Address, log } from "@graphprotocol/graph-ts";
import { UniswapV2Pair } from '../../../bonds/generated/BCTBondV1/UniswapV2Pair'
import { ERC20 } from '../../generated/ERC20'
import { IToken } from "../IToken";

import * as constants from '../../utils/Constants'
import { toDecimal, BIG_DECIMAL_1E9 } from "../../utils/Decimals"
import { KLIMA } from "./KLIMA";


export class NCT implements IToken {

    private contractAddress: Address = Address.fromString(constants.NCT_ERC20_CONTRACT)
    private klimaToken: KLIMA = new KLIMA()

    getERC20ContractAddress(): string {
        return this.contractAddress.toHexString()
    }

    getTokenName(): string {
        return constants.NCT_TOKEN
    }
    getDecimals(): number {
        return 18
    }

    getFormattedPrice(rawPrice: BigInt): BigDecimal {
        return toDecimal(rawPrice, this.getDecimals())
    }

    getMarketPrice(): BigDecimal {
        throw new Error("Method not implemented.");
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
        let ercContract = ERC20.bind(this.contractAddress)
        let totalSupply = toDecimal(ercContract.totalSupply(), this.getDecimals())

        return totalSupply
    }

    getAddressBalance(address: Address): BigDecimal {
        const newBalanceRaw = ERC20.bind(this.contractAddress).try_balanceOf(address)
        if (!newBalanceRaw.reverted) {
            return toDecimal(newBalanceRaw.value, this.getDecimals())
        }
        return BigDecimal.fromString("0")
    }
}

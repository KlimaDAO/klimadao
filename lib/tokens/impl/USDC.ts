import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { IToken } from "../IToken";
import { ERC20 } from '../../generated/ERC20'
import * as constants from '../../utils/Constants'

import { toDecimal } from "../../utils/Decimals";
import { KLIMA } from "./KLIMA";

export class USDC implements IToken {

    private contractAddress: Address = Address.fromString(constants.USDC_ERC20_CONTRACT)
    private klimaToken: KLIMA = new KLIMA()

    getERC20ContractAddress(): string {
        return this.contractAddress.toHexString()
    }

    getTokenName(): string {
        return "USDC"
    }
    getDecimals(): number {
        return 6
    }
    getFormattedPrice(rawPrice: BigInt): BigDecimal {
        return toDecimal(rawPrice, this.getDecimals())
    }

    getMarketPrice(blockNumber: BigInt): BigDecimal {
        return this.klimaToken.getUSDPrice(blockNumber)
    }

    getUSDPrice(blockNumber: BigInt): BigDecimal {
        return BigDecimal.fromString("1")
    }

    getTotalSupply(): BigDecimal {
        throw new Error("Method not implemented.");
    }

    getAddressBalance(address: Address): BigDecimal {
        const newBalanceRaw = ERC20.bind(this.contractAddress).try_balanceOf(address)
        if (!newBalanceRaw.reverted) {
            return toDecimal(newBalanceRaw.value, this.getDecimals())
        }
        return BigDecimal.fromString("0")
    }
}

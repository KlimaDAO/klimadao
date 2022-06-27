import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { ILockable } from "../ILockable";
import * as constants from '../../../../../lib/utils/Constants'
import { KLIMA } from "../../../../../lib/tokens/impl/KLIMA";
import { convertToWsKLIMA } from "../../Convert";


export class C3Wsklima implements ILockable {

    private contractAddress: Address
    private klima: KLIMA = new KLIMA()

    constructor(contractAddress: Address) {
        this.contractAddress = contractAddress
    }

    getContractAddress(): Address {
        return this.contractAddress
    }
    
    getTokenName(): string {
        return constants.WSKLIMA_TOKEN
    }
    getPlatformName(): string {
        return constants.C3_PLATFORM
    }

    getInitTimestamp(): BigInt {
        return BigInt.fromString(constants.C3_WSKLIMA_INIT_TIMESTAMP)
    }

    //Get wsKLIMA supply via index
    getTotalSupply(): BigDecimal {
        return convertToWsKLIMA(this.klima.getTotalSupply())
    }
}

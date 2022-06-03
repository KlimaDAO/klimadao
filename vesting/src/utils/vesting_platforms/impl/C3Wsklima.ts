import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ILockable } from "../ILockable";
import * as constants from '../../../../../lib/utils/Constants'


export class C3Wsklima implements ILockable {

    private contractAddress: Address

    constructor(contractAddress: Address) {
        this.contractAddress = contractAddress
    }

    getContractAddress(): Address {
        return this.contractAddress
    }
    
    getTokenName(): string {
        return constants.C3_WSKLIMA_TOKEN
    }
    getPlatformName(): string {
        return constants.C3_PLATFORM
    }

    getInitTimestamp(): BigInt {
        return BigInt.fromString(constants.C3_WSKLIMA_INIT_TIMESTAMP)
    }

}

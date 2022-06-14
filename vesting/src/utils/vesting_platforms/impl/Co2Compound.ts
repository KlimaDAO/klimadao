import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ILockable } from "../ILockable";
import * as constants from '../../../../../lib/utils/Constants'


export class Co2Compound implements ILockable {

    private contractAddress: Address

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
        return constants.NFT_CO2COMPOUND_PLATFORM
    }

    getInitTimestamp(): BigInt {
        return BigInt.fromString(constants.NFT_CO2COMPOUND_INIT_TIMESTAMP)
    }

}

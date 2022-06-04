import { Address } from "@graphprotocol/graph-ts";

import { IToken } from "./IToken";
import * as constants from "../utils/Constants"
import { KLIMA } from "./impl/KLIMA";
import { BCT } from "./impl/BCT";
import { MCO2 } from "./impl/MCO2";
import { UBO } from "./impl/UBO";
import { NBO } from "./impl/NBO";



export class TokenFactory {
    constructor() {}

    public getTokenForAddress(address: Address): IToken {

        if (address.equals(Address.fromHexString(constants.BCT_ERC20_CONTRACT))) {
            return new BCT()
        } 
        if (address.equals(Address.fromHexString(constants.MCO2_ERC20_CONTRACT))) {
            return new MCO2()
        } 
        if (address.equals(Address.fromHexString(constants.UBO_ERC20_CONTRACT))) {
            return new UBO()
        } 
        if (address.equals(Address.fromHexString(constants.NBO_ERC20_CONTRACT))) {
            return new NBO()
        } 
        if (address.equals(Address.fromHexString(constants.KLIMA_ERC20_V1_CONTRACT))) {
            return new KLIMA()
        }

        throw new Error("[Token Factory] Failed to get Token for address: "+ address.toHexString());
    }
}

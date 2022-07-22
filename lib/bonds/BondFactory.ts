import { Address, log } from "@graphprotocol/graph-ts";

import { IBondable } from "./IBondable";
import { BCTBond } from "./impl/BCTBond";
import * as constants from "../utils/Constants"
import { MCO2Bond } from "./impl/MCO2Bond";
import { NBOBond } from "./impl/NBOBond";
import { UBOBond } from "./impl/UBOBond";
import { KLIMABCTBond } from "./impl/KLIMABCTBond";
import { KLIMAMCO2Bond } from "./impl/KLIMAMCO2Bond";
import { KLIMAUSDCBond } from "./impl/KLIMAUSDCBond.ts";
import { BCTUSDCBond } from "./impl/BCTUSDCBond";
import { KLIMAUSDCInverseBond } from "./impl/KLIMAUSDCInverseBond";


export class BondFactory {
    constructor() {}

    public getBondForBondAddress(address: Address): IBondable {

        //Naked bonds
        if (address.equals(Address.fromHexString(constants.BCTBOND_V1))) {
            return new BCTBond(address)
        } 
        if (address.equals(Address.fromHexString(constants.MCO2BOND_V1))) {
            return new MCO2Bond(address)
        } 
        if (address.equals(Address.fromHexString(constants.MCO2BOND_V1_2))) {
            return new MCO2Bond(address)
        } 
        if (address.equals(Address.fromHexString(constants.UBOBOND_V1))) {
            return new UBOBond(address)
        } 
        if (address.equals(Address.fromHexString(constants.NBOBOND_V1))) {
            return new NBOBond(address)
        }

        //LPS 
        if (address.equals(Address.fromHexString(constants.KLIMA_BCT_BOND_V1))) {
            return new KLIMABCTBond(address)
        }
        if (address.equals(Address.fromHexString(constants.KLIMA_MCO2_BOND_V1))) {
            return new KLIMAMCO2Bond(address)
        }
        if (address.equals(Address.fromHexString(constants.KLIMA_MCO2_BOND_V1_2))) {
            return new KLIMAMCO2Bond(address)
        }
        if (address.equals(Address.fromHexString(constants.KLIMA_USDC_BOND_V1))) {
            return new KLIMAUSDCBond(address)
        }
        if (address.equals(Address.fromHexString(constants.BCT_USDC_BOND_V1))) {
            return new BCTUSDCBond(address)
        }

        throw new Error("[Bond Factory] Failed to get Bond for address: "+ address.toHexString());
    }

    public getBondForBaseTokenAddress(address: Address): IBondable {
        if (address.equals(Address.fromHexString(constants.USDC_ERC20_CONTRACT))) {
            return new KLIMAUSDCInverseBond()
        }
        throw new Error("[Bond Factory] Failed to get Bond for base token address: "+ address.toHexString());
    }
}

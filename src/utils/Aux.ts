import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

import { Aux } from '../../generated/schema'

export const HOLDER_AUX = '0';
 
export function getHolderAux(): Aux{
    let holders = Aux.load(HOLDER_AUX)
    if (holders == null) {
        holders = new Aux(HOLDER_AUX)
        holders.value = new BigInt(0)
    }
    return holders as Aux
}
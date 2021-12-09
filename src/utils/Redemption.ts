import { Address } from '@graphprotocol/graph-ts';
import { Redemption } from '../../generated/schema'

export function loadOrCreateRedemption(addres: Address): Redemption{
    let redemption = Redemption.load(addres.toHex())
    if (redemption == null) {
        redemption = new Redemption(addres.toHex())
        redemption.save()
    }
    return redemption as Redemption
}
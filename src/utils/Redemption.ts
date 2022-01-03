import { ethereum } from '@graphprotocol/graph-ts'
import { Redemption } from '../../generated/schema'

export function loadOrCreateRedemption(eth_transaction: ethereum.Transaction): Redemption {
    let redemption = Redemption.load(eth_transaction.hash.toHex())
    if (redemption == null) {
        redemption = new Redemption((eth_transaction.hash.toHex()))
        redemption.save()
    }
    return redemption as Redemption
}

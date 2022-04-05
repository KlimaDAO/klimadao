import { BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts'
import { Redemption } from '../../generated/schema'

export function loadOrCreateRedemption(eth_transaction: ethereum.Transaction, timestamp: BigInt): Redemption {
    let redemption = Redemption.load(eth_transaction.hash.toHex())
    if (redemption == null) {
        redemption = new Redemption((eth_transaction.hash.toHex()))
        redemption.payout = BigDecimal.fromString('0')
        redemption.payoutRemaining = BigDecimal.fromString('0')
        redemption.timestamp = timestamp
    }
    return redemption as Redemption
}

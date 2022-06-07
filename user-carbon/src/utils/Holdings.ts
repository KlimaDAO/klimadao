import { BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts"
import { dayFromTimestamp } from "../../../lib/utils/Dates"
import { Holding } from "../../generated/schema"
import { KlimateUtils } from "./Klimate"
import { IToken } from "../../../lib/tokens/IToken"

export class HoldingsUtils {

    private static DAY_IN_SECONDS: BigInt = BigInt.fromString("86400")

    static updateHolding(token: IToken, timestamp: BigInt, address: Address): void {
        const dayTimestamp = dayFromTimestamp(timestamp)

        // Handle the to address

        let klimate = KlimateUtils.loadKlimate(address)
        let holdingId = klimate.id + '-' + token.getTokenName() + '-' + dayTimestamp
        let klimateHolding = Holding.load(holdingId)
        if (klimateHolding == null) {
            klimateHolding = this.createAndReturnEmptyHolding(holdingId)
        }
        let newBalance = token.getAddressBalance(Address.fromString(klimate.id))
        klimateHolding.klimate = klimate.id
        klimateHolding.token = token.getTokenName()
        klimateHolding.timestamp = BigInt.fromString(dayTimestamp)
        klimateHolding.tokenAmount = newBalance
        klimateHolding.carbonValue = newBalance
        klimateHolding.save()
        klimate.save()
    }

    private static createAndReturnEmptyHolding(id: string): Holding {
        let holding = new Holding(id)
        holding.klimate = '0x0'
        holding.token = ''
        holding.timestamp = BigInt.fromString('0')
        holding.tokenAmount = BigDecimal.fromString('0')
        holding.carbonValue = BigDecimal.fromString('0')
        return holding
    }
}

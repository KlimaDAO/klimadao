import { BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts"
import { Klimate } from "../../generated/schema"

export class KlimateUtils {

    static loadKlimate(id: Address): Klimate {
        let klimate = Klimate.load(id.toHexString())
        if (klimate == null) {
            klimate = this.createAndReturnEmptyKlimate(id.toHexString())
        }

        return klimate
    }

    private static createAndReturnEmptyKlimate(id: string): Klimate {
        let klimate = new Klimate(id)
        klimate.active = false

        return klimate
    }
}

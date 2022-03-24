import { Address, BigDecimal } from "@graphprotocol/graph-ts"
import { Bonder } from "../../generated/schema"

export function loadOrCreateBonder(addr: Address): Bonder {

    let bonder = Bonder.load(addr.toHexString())
    if (bonder == null) {
        bonder = new Bonder(addr.toHexString())
        bonder.totalKlimaBonded = BigDecimal.fromString('0')
        bonder.totalCarbonCustodied = BigDecimal.fromString('0')
        bonder.save()
    }

    return bonder as Bonder
}

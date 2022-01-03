import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { Klimate, Transaction } from '../../generated/schema'

import { KlimaERC20V1 } from '../../generated/KlimaStakingV1/KlimaERC20V1'
import { sKlimaERC20V1 } from '../../generated/KlimaStakingV1/sKlimaERC20V1'
import { BCTBondV1 } from '../../generated/BCTBondV1/BCTBondV1'

import * as constants from './Constants';
import { loadOrCreateKlimateBalance } from './KlimateBalances'
import { toDecimal } from './Decimals'
import { getKLIMAUSDRate } from './Price'
import { loadOrCreateContractInfo } from './ContractInfo'
import { getHolderAux } from './Aux'

export function loadOrCreateKlimate(addres: Address): Klimate {
    let klimate = Klimate.load(addres.toHex())
    if (klimate == null) {
        let holders = getHolderAux()
        holders.value = holders.value.plus(BigInt.fromI32(1))
        holders.save()

        klimate = new Klimate(addres.toHex())
        klimate.active = true
        klimate.save()
    }
    return klimate as Klimate
}

export function updateKlimateBalance(klimate: Klimate, transaction: Transaction): void {

    let balance = loadOrCreateKlimateBalance(klimate, transaction.timestamp)

    let klima_contract = KlimaERC20V1.bind(Address.fromString(constants.KLIMA_ERC20_V1_CONTRACT))
    let sklima_contract_v1 = sKlimaERC20V1.bind(Address.fromString(constants.SKLIMA_ERC20_V1_CONTRACT))
    balance.klimaBalance = toDecimal(klima_contract.balanceOf(Address.fromString(klimate.id)), 9)
    let sklimaV1Balance = toDecimal(sklima_contract_v1.balanceOf(Address.fromString(klimate.id)), 9)
    balance.sklimaBalance = sklimaV1Balance

    let stakes = balance.stakes

    let cinfoSklimaBalance_v1 = loadOrCreateContractInfo(klimate.id + transaction.timestamp.toString() + "sKlimaERC20")
    cinfoSklimaBalance_v1.name = "sKLIMA"
    cinfoSklimaBalance_v1.contract = constants.SKLIMA_ERC20_V1_CONTRACT
    cinfoSklimaBalance_v1.amount = sklimaV1Balance
    cinfoSklimaBalance_v1.save()

    if (!stakes) {
        stakes = [] as string[]
        stakes.push(cinfoSklimaBalance_v1.id)
    } else {
        stakes.push(cinfoSklimaBalance_v1.id)
    }

    balance.stakes = stakes

    if (klimate.active && balance.klimaBalance.lt(BigDecimal.fromString("0.01")) && balance.sklimaBalance.lt(BigDecimal.fromString("0.01"))) {
        let holders = getHolderAux()
        holders.value = holders.value.minus(BigInt.fromI32(1))
        holders.save()
        klimate.active = false
    }
    else if (klimate.active == false && (balance.klimaBalance.gt(BigDecimal.fromString("0.01")) || balance.sklimaBalance.gt(BigDecimal.fromString("0.01")))) {
        let holders = getHolderAux()
        holders.value = holders.value.plus(BigInt.fromI32(1))
        holders.save()
        klimate.active = true
    }

    // Bond Updates
    let bonds = balance.bonds
    if (!bonds) {
        bonds = [] as string[]
    }

    // BCT Reserve
    if (transaction.blockNumber.gt(BigInt.fromString(constants.BCTBOND_V1_BLOCK))) {
        let bondBCT_contract = BCTBondV1.bind(Address.fromString(constants.BCTBOND_V1))
        let pending = bondBCT_contract.bondInfo(Address.fromString(klimate.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(klimate.id + transaction.timestamp.toString() + "BCTBondV1")
            binfo.name = "BCT"
            binfo.contract = constants.BCTBOND_V1
            binfo.amount = pending_bond
            binfo.save()

            bonds.push(binfo.id)

            log.debug("Klimate {} pending BCTBondV1 V1 {} on tx {}", [klimate.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }

    // KLIMA-BCT LP
    if (transaction.blockNumber.gt(BigInt.fromString(constants.KLIMA_BCT_BOND_V1_BLOCK))) {
        let bondBCT_contract = BCTBondV1.bind(Address.fromString(constants.KLIMA_BCT_BOND_V1))
        let pending = bondBCT_contract.bondInfo(Address.fromString(klimate.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(klimate.id + transaction.timestamp.toString() + "BCTBondV1")
            binfo.name = "KLIMA-BCT"
            binfo.contract = constants.KLIMA_BCT_BOND_V1
            binfo.amount = pending_bond
            binfo.save()

            bonds.push(binfo.id)

            log.debug("Klimate {} pending KLIMA-BCTBondV1 V1 {} on tx {}", [klimate.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }

    // BCT-USDC LP
    if (transaction.blockNumber.gt(BigInt.fromString(constants.BCT_USDC_BOND_V1_BLOCK))) {
        let bondBCT_contract = BCTBondV1.bind(Address.fromString(constants.BCT_USDC_BOND_V1))
        let pending = bondBCT_contract.bondInfo(Address.fromString(klimate.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(klimate.id + transaction.timestamp.toString() + "BCTBondV1")
            binfo.name = "BCT-USDC"
            binfo.contract = constants.BCT_USDC_BOND_V1
            binfo.amount = pending_bond
            binfo.save()

            bonds.push(binfo.id)

            log.debug("Klimate {} pending BCT-USDCBondV1 V1 {} on tx {}", [klimate.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }

    balance.bonds = bonds

    //Price
    if (transaction.blockNumber.gt(BigInt.fromString(constants.KLIMA_BCT_PAIR_BLOCK))) {
        let usdRate = getKLIMAUSDRate()
        balance.dollarBalance = balance.klimaBalance.times(usdRate).plus(balance.sklimaBalance.times(usdRate)).plus(balance.bondBalance.times(usdRate))
    }

    balance.save()

    klimate.lastBalance = balance.id;
    klimate.save()
}

import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { Klimate, Transaction } from '../../generated/schema'
import { KlimaERC20V1 } from '../../generated/KlimaStakingV1/KlimaERC20V1'
import { sKlimaERC20V1 } from '../../generated/KlimaStakingV1/sKlimaERC20V1'
import { BCTBondV1 } from '../../generated/BCTBondV1/BCTBondV1'
/*import { DAIBondV2 } from '../../generated/DAIBondV1/DAIBondV2'
import { DAIBondV3 } from '../../generated/DAIBondV1/DAIBondV3'
import { OHMDAIBondV1 } from '../../generated/DAIBondV1/OHMDAIBondV1'
import { OHMDAIBondV2 } from '../../generated/DAIBondV1/OHMDAIBondV2'
import { OHMDAIBondV3 } from '../../generated/DAIBondV1/OHMDAIBondV3'
import { OHMDAIBondV4 } from '../../generated/DAIBondV1/OHMDAIBondV4'
import { OHMFRAXBondV1 } from '../../generated/DAIBondV1/OHMFRAXBondV1'
import { OHMFRAXBondV2 } from '../../generated/DAIBondV1/OHMFRAXBondV2'
import { FRAXBondV1 } from '../../generated/DAIBondV1/FRAXBondV1'
import { ETHBondV1 } from '../../generated/DAIBondV1/ETHBondV1'
*/
import { KLIMA_ERC20_V1_CONTRACT, SKLIMA_ERC20_V1_CONTRACT, BCTBOND_V1, BCTBOND_V1_BLOCK } from '../utils/Constants'

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

    let klima_contract = KlimaERC20V1.bind(Address.fromString(KLIMA_ERC20_V1_CONTRACT))
    let sklima_contract = sKlimaERC20V1.bind(Address.fromString(SKLIMA_ERC20_V1_CONTRACT))
    balance.klimaBalance = toDecimal(klima_contract.balanceOf(Address.fromString(klimate.id)), 9)
    let sklimaV1Balance = toDecimal(sklima_contract.balanceOf(Address.fromString(klimate.id)), 9)
    balance.sklimaBalance = sklimaV1Balance

    let stakes = balance.stakes

    let cinfoSklimaBalance_v1 = loadOrCreateContractInfo(klimate.id + transaction.timestamp.toString() + "sKlimaERC20")
    cinfoSklimaBalance_v1.name = "sKLIMA"
    cinfoSklimaBalance_v1.contract = SKLIMA_ERC20_V1_CONTRACT
    cinfoSklimaBalance_v1.amount = sklimaV1Balance
    cinfoSklimaBalance_v1.save()
    //stakes.push(cinfoSklimaBalance_v1.id)

    /* V2 - save for later
    if (transaction.blockNumber.gt(BigInt.fromString(SOHM_ERC20_CONTRACTV2_BLOCK))) {
        let sohm_contract_v2 = sOlympusERC20V2.bind(Address.fromString(SOHM_ERC20_CONTRACTV2))
        let sohmV2Balance = toDecimal(sohm_contract_v2.balanceOf(Address.fromString(ohmie.id)), 9)
        balance.sohmBalance = balance.sohmBalance.plus(sohmV2Balance)

        let cinfoSohmBalance_v2 = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "sOlympusERC20V2")
        cinfoSohmBalance_v2.name = "sOHM"
        cinfoSohmBalance_v2.contract = SOHM_ERC20_CONTRACTV2
        cinfoSohmBalance_v2.amount = sohmV2Balance
        cinfoSohmBalance_v2.save()
        stakes.push(cinfoSohmBalance_v2.id)
    }
    */

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

    // BCT Reserve
    let bonds = balance.bonds
    if (transaction.blockNumber.gt(BigInt.fromString(BCTBOND_V1_BLOCK))) {
        let bondBCT_contract = BCTBondV1.bind(Address.fromString(BCTBOND_V1))
        let pending = bondBCT_contract.bondInfo(Address.fromString(klimate.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(klimate.id + transaction.timestamp.toString() + "BCTBondV1")
            binfo.name = "BCT"
            binfo.contract = BCTBOND_V1
            binfo.amount = pending_bond
            binfo.save()
            //bonds.push(binfo.id)

            log.debug("Klimate {} pending BCTBondV1 V1 {} on tx {}", [klimate.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    /*
    if (transaction.blockNumber.gt(BigInt.fromString(OHMDAISLPBOND_CONTRACT2_BLOCK))) {
        let bondOHMDai_contract = OHMDAIBondV2.bind(Address.fromString(OHMDAISLPBOND_CONTRACT2))
        let pending = bondOHMDai_contract.bondInfo(Address.fromString(ohmie.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "OHMDAIBondV2")
            binfo.name = "OHM-DAI"
            binfo.contract = OHMDAISLPBOND_CONTRACT2
            binfo.amount = pending_bond
            binfo.save()
            bonds.push(binfo.id)

            log.debug("Ohmie {} pending OHMDAIBondV2 V1 {} on tx {}", [ohmie.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    if (transaction.blockNumber.gt(BigInt.fromString(OHMDAISLPBOND_CONTRACT3_BLOCK))) {
        let bondOHMDai_contract = OHMDAIBondV3.bind(Address.fromString(OHMDAISLPBOND_CONTRACT3))
        let pending = bondOHMDai_contract.bondInfo(Address.fromString(ohmie.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "OHMDAIBondV3")
            binfo.name = "OHM-DAI"
            binfo.contract = OHMDAISLPBOND_CONTRACT3
            binfo.amount = pending_bond
            binfo.save()
            bonds.push(binfo.id)

            log.debug("Ohmie {} pending OHMDAIBondV3 V1 {} on tx {}", [ohmie.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    if (transaction.blockNumber.gt(BigInt.fromString(OHMDAISLPBOND_CONTRACT4_BLOCK))) {
        let bondOHMDai_contract = OHMDAIBondV4.bind(Address.fromString(OHMDAISLPBOND_CONTRACT4))
        let pending = bondOHMDai_contract.bondInfo(Address.fromString(ohmie.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "OHMDAIBondV4")
            binfo.name = "OHM-DAI"
            binfo.contract = OHMDAISLPBOND_CONTRACT4
            binfo.amount = pending_bond
            binfo.save()
            bonds.push(binfo.id)

            log.debug("Ohmie {} pending OHMDAIBondV4 V1 {} on tx {}", [ohmie.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    //DAI
    if (transaction.blockNumber.gt(BigInt.fromString(DAIBOND_CONTRACTS1_BLOCK))) {
        let bondDai_contract = DAIBondV1.bind(Address.fromString(DAIBOND_CONTRACTS1))
        let pending = bondDai_contract.getDepositorInfo(Address.fromString(ohmie.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "DAIBondV1")
            binfo.name = "DAI"
            binfo.contract = DAIBOND_CONTRACTS1
            binfo.amount = pending_bond
            binfo.save()
            bonds.push(binfo.id)

            log.debug("Ohmie {} pending DAIBondV1 V1 {} on tx {}", [ohmie.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    if (transaction.blockNumber.gt(BigInt.fromString(DAIBOND_CONTRACTS2_BLOCK))) {
        let bondDai_contract = DAIBondV2.bind(Address.fromString(DAIBOND_CONTRACTS2))
        let pending = bondDai_contract.bondInfo(Address.fromString(ohmie.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "DAIBondV2")
            binfo.name = "DAI"
            binfo.contract = DAIBOND_CONTRACTS2
            binfo.amount = pending_bond
            binfo.save()
            bonds.push(binfo.id)

            log.debug("Ohmie {} pending DAIBondV2 V1 {} on tx {}", [ohmie.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    if (transaction.blockNumber.gt(BigInt.fromString(DAIBOND_CONTRACTS3_BLOCK))) {
        let bondDai_contract = DAIBondV3.bind(Address.fromString(DAIBOND_CONTRACTS3))
        let pending = bondDai_contract.bondInfo(Address.fromString(ohmie.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "DAIBondV3")
            binfo.name = "DAI"
            binfo.contract = DAIBOND_CONTRACTS3
            binfo.amount = pending_bond
            binfo.save()
            bonds.push(binfo.id)

            log.debug("Ohmie {} pending DAIBondV3 V1 {} on tx {}", [ohmie.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    //OHM-FRAX
    if (transaction.blockNumber.gt(BigInt.fromString(OHMFRAXLPBOND_CONTRACT1_BLOCK))) {
        let bondFRAXDai_contract = OHMFRAXBondV1.bind(Address.fromString(OHMFRAXLPBOND_CONTRACT1))
        let pending = bondFRAXDai_contract.bondInfo(Address.fromString(ohmie.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "OHMFRAXBondV1")
            binfo.name = "DAI"
            binfo.contract = OHMFRAXLPBOND_CONTRACT1
            binfo.amount = pending_bond
            binfo.save()
            bonds.push(binfo.id)

            log.debug("Ohmie {} pending OHMFRAXBondV1 V1 {} on tx {}", [ohmie.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    if (transaction.blockNumber.gt(BigInt.fromString(OHMFRAXLPBOND_CONTRACT2_BLOCK))) {
        let bondFRAXDai_contract = OHMFRAXBondV2.bind(Address.fromString(OHMFRAXLPBOND_CONTRACT2))
        let pending = bondFRAXDai_contract.bondInfo(Address.fromString(ohmie.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "OHMFRAXBondV2")
            binfo.name = "DAI"
            binfo.contract = OHMFRAXLPBOND_CONTRACT2
            binfo.amount = pending_bond
            binfo.save()
            bonds.push(binfo.id)

            log.debug("Ohmie {} pending OHMFRAXBondV2 V1 {} on tx {}", [ohmie.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    //FRAX
    if (transaction.blockNumber.gt(BigInt.fromString(FRAXBOND_CONTRACT1_BLOCK))) {
        let bondFRAX_contract = FRAXBondV1.bind(Address.fromString(FRAXBOND_CONTRACT1))
        let pending = bondFRAX_contract.bondInfo(Address.fromString(ohmie.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "FRAXBondV1")
            binfo.name = "DAI"
            binfo.contract = FRAXBOND_CONTRACT1
            binfo.amount = pending_bond
            binfo.save()
            bonds.push(binfo.id)

            log.debug("Ohmie {} pending FRAXBondV1 V1 {} on tx {}", [ohmie.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    //WETH
    if (transaction.blockNumber.gt(BigInt.fromString(ETHBOND_CONTRACT1_BLOCK))) {
        let bondETH_contract = ETHBondV1.bind(Address.fromString(ETHBOND_CONTRACT1))
        let pending = bondETH_contract.bondInfo(Address.fromString(ohmie.id))
        if (pending.value1.gt(BigInt.fromString("0"))) {
            let pending_bond = toDecimal(pending.value1, 9)
            balance.bondBalance = balance.bondBalance.plus(pending_bond)

            let binfo = loadOrCreateContractInfo(ohmie.id + transaction.timestamp.toString() + "FRAXBondV1")
            binfo.name = "DAI"
            binfo.contract = FRAXBOND_CONTRACT1
            binfo.amount = pending_bond
            binfo.save()
            bonds.push(binfo.id)

            log.debug("Ohmie {} pending ETHBondV1 V1 {} on tx {}", [ohmie.id, toDecimal(pending.value1, 9).toString(), transaction.id])
        }
    }
    balance.bonds = bonds

    //TODO add LUSD and OHMLUSD

    //Price
    let usdRate = getOHMUSDRate()
    balance.dollarBalance = balance.ohmBalance.times(usdRate).plus(balance.sohmBalance.times(usdRate)).plus(balance.bondBalance.times(usdRate))
    */
    balance.save()

    klimate.lastBalance = balance.id;
    klimate.save()
}

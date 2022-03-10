import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'

import { BCTBondV1 } from '../../generated/BCTBondV1/BCTBondV1';
import { KLIMABCTBondV1 } from '../../generated/KLIMABCTBondV1/KLIMABCTBondV1';
import { BCTUSDCBondV1 } from '../../generated/BCTUSDCBondV1/BCTUSDCBondV1';
import { MCO2BondV1 } from '../../generated/MCO2BondV1/MCO2BondV1';
import { KLIMAMCO2BondV1 } from '../../generated/KLIMAMCO2BondV1/KLIMAMCO2BondV1';
import { KLIMAUSDCBondV1 } from '../../generated/KLIMAUSDCBondV1/KLIMAUSDCBondV1';

import { BondDiscount, Transaction } from '../../generated/schema'
import * as constants from './Constants';
import { hourFromTimestamp } from './Dates';
import { toDecimal } from './Decimals';
import { getKLIMABCTRate } from './Price';

export function loadOrCreateBondDiscount(timestamp: BigInt): BondDiscount {
    let hourTimestamp = hourFromTimestamp(timestamp);

    let bondDiscount = BondDiscount.load(hourTimestamp)
    if (bondDiscount == null) {
        bondDiscount = new BondDiscount(hourTimestamp)
        bondDiscount.timestamp = timestamp
        bondDiscount.bct_discount = BigDecimal.fromString("0")
        bondDiscount.klimabct_discount = BigDecimal.fromString("0")
        bondDiscount.bctusdc_discount = BigDecimal.fromString("0")
        bondDiscount.mco2_discount = BigDecimal.fromString("0")
        bondDiscount.klimamco2_discount = BigDecimal.fromString("0")
        bondDiscount.klimausdc_discount = BigDecimal.fromString("0")
        bondDiscount.save()
    }
    return bondDiscount as BondDiscount
}

export function updateBondDiscounts(transaction: Transaction): void {
    let bd = loadOrCreateBondDiscount(transaction.timestamp);

    let klimaRate = getKLIMABCTRate();

    // BCT
    if (transaction.blockNumber.gt(BigInt.fromString(constants.BCTBOND_V1_BLOCK))) {
        let bond = BCTBondV1.bind(Address.fromString(constants.BCTBOND_V1))
        let price_call = bond.try_bondPriceInUSD()
        if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
            bd.bct_discount = klimaRate.div(toDecimal(price_call.value, 18))
            bd.bct_discount = bd.bct_discount.minus(BigDecimal.fromString("1"))
            bd.bct_discount = bd.bct_discount.times(BigDecimal.fromString("100"))
            log.debug("BCT Discount KLIMA price {}  Bond Price {}  Discount {}", [klimaRate.toString(), price_call.value.toString(), bd.bct_discount.toString()])
        }
    }

    // KLIMA-BCT
    if (transaction.blockNumber.gt(BigInt.fromString(constants.KLIMA_BCT_BOND_V1_BLOCK))) {
        let bond = KLIMABCTBondV1.bind(Address.fromString(constants.KLIMA_BCT_BOND_V1))
        let price_call = bond.try_bondPriceInUSD()
        if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
            bd.klimabct_discount = klimaRate.div(toDecimal(price_call.value, 18))
            bd.klimabct_discount = bd.klimabct_discount.minus(BigDecimal.fromString("1"))
            bd.klimabct_discount = bd.klimabct_discount.times(BigDecimal.fromString("100"))
            log.debug("KLIMA-BCT Discount KLIMA price {}  Bond Price {}  Discount {}", [klimaRate.toString(), price_call.value.toString(), bd.klimabct_discount.toString()])
        }
    }

    // BCT-USDC
    if (transaction.blockNumber.gt(BigInt.fromString(constants.BCT_USDC_BOND_V1_BLOCK))) {
        let bond = BCTUSDCBondV1.bind(Address.fromString(constants.BCT_USDC_BOND_V1))
        let price_call = bond.try_bondPriceInUSD()
        if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
            bd.bctusdc_discount = klimaRate.div(toDecimal(price_call.value, 18))
            bd.bctusdc_discount = bd.bctusdc_discount.minus(BigDecimal.fromString("1"))
            bd.bctusdc_discount = bd.bctusdc_discount.times(BigDecimal.fromString("100"))
            log.debug("BCT-USDC Discount KLIMA price {}  Bond Price {}  Discount {}", [klimaRate.toString(), price_call.value.toString(), bd.bctusdc_discount.toString()])
        }
    }

    // MCO2
    if (transaction.blockNumber.gt(BigInt.fromString(constants.MCO2BOND_V1_BLOCK))) {
        let bond = MCO2BondV1.bind(Address.fromString(constants.MCO2BOND_V1))
        let price_call = bond.try_bondPriceInUSD()
        if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
            bd.mco2_discount = klimaRate.div(toDecimal(price_call.value, 18))
            bd.mco2_discount = bd.mco2_discount.minus(BigDecimal.fromString("1"))
            bd.mco2_discount = bd.mco2_discount.times(BigDecimal.fromString("100"))
            log.debug("MCO2 Discount KLIMA price {}  Bond Price {}  Discount {}", [klimaRate.toString(), price_call.value.toString(), bd.mco2_discount.toString()])
        }
    }

    // KLIMA-MCO2
    if (transaction.blockNumber.gt(BigInt.fromString(constants.KLIMA_MCO2_BOND_V1_BLOCK))) {
        let bond = KLIMAMCO2BondV1.bind(Address.fromString(constants.KLIMA_MCO2_BOND_V1))
        let price_call = bond.try_bondPriceInUSD()
        if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
            bd.klimamco2_discount = klimaRate.div(toDecimal(price_call.value, 18))
            bd.klimamco2_discount = bd.klimamco2_discount.minus(BigDecimal.fromString("1"))
            bd.klimamc02_discount = bd.klimamco2_discount.times(BigDecimal.fromString("100"))
            log.debug("KLIMA-MCO2 Discount KLIMA price {}  Bond Price {}  Discount {}", [klimaRate.toString(), price_call.value.toString(), bd.klimamco2_discount.toString()])
        }
    }

    // KLIMA-USDC
    if (transaction.blockNumber.gt(BigInt.fromString(constants.KLIMA_USDC_BOND_V1_BLOCK))) {
        let bond = KLIMAUSDCBondV1.bind(Address.fromString(constants.KLIMA_USDC_BOND_V1))
        let price_call = bond.try_bondPriceInUSD()
        if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
            bd.klimausdc_discount = klimaRate.div(toDecimal(price_call.value, 18))
            bd.klimausdc_discount = bd.klimausdc_discount.minus(BigDecimal.fromString("1"))
            bd.klimausdc_discount = bd.klimausdc_discount.times(BigDecimal.fromString("100"))
            log.debug("KLIMA-USDC Discount KLIMA price {}  Bond Price {}  Discount {}", [klimaRate.toString(), price_call.value.toString(), bd.klimausdc_discount.toString()])
        }
    }

    bd.save()
}

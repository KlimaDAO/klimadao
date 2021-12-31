import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'

import { BCTBondV1 } from '../../generated/BCTBondV1/BCTBondV1';
import { KLIMABCTBondV1 } from '../../generated/KLIMABCTBondV1/KLIMABCTBondV1';
import { BCTUSDCBondV1 } from '../../generated/BCTUSDCBondV1/BCTUSDCBondV1';

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

    bd.save()
}

import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { IToken } from '../tokens/IToken'

/**
 * This can be an abstract class at some point since there are few methods that are the same for all concrete classes
 * But for now until we get all impl right - it might be better to go with interface
 */
export interface IBondable {
    getToken(): IToken
    getBondName(): string
    getDaoFeeForBondPayout(payout: BigDecimal): BigDecimal
    getBondPrice(): BigDecimal
    getBondDiscount(): BigDecimal
    parseBondPrice(priceInUSD: BigInt): BigDecimal
    parseBondTokenValueFormatted(rawPrice: BigInt): BigDecimal
    getCarbonCustodied(depositAmount: BigInt): BigDecimal
    getTreasuredAmount(): BigDecimal
  }
  
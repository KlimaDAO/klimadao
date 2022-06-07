import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export interface IToken {
  getERC20ContractAddress(): string
  getTokenName(): string
  getDecimals(): number
  getFormattedPrice(rawPrice: BigInt): BigDecimal
  /** Sekula: The biggest challenge here is to figure out
   * which lp to look for at a given point in time for Market and USD price
   * Maybe we could add a block number as a parameter here and pick an lp based on some logic underneath?
  */
  getMarketPrice(): BigDecimal
  getUSDPrice(): BigDecimal
  getTotalSupply(): BigDecimal
  getAddressBalance(address: Address): BigDecimal
}

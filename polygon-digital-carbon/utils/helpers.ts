import {
  AMOY_KLIMA_CARBON_RETIREMENTS_CONTRACT,
  CCO2_ERC20_CONTRACT,
  KLIMA_CARBON_RETIREMENTS_CONTRACT,
} from '../../lib/utils/Constants'
import { Address, BigInt, Bytes, BigDecimal } from '@graphprotocol/graph-ts'
import { BIG_INT_1E18 } from '../../lib/utils/Decimals'

export function getRetirementsContractAddress(network: string): Address {
  return network == 'matic' || network == 'mainnet'
    ? KLIMA_CARBON_RETIREMENTS_CONTRACT
    : AMOY_KLIMA_CARBON_RETIREMENTS_CONTRACT
}

export function createAsyncRetireRequestId(token: Address, index: BigInt): Bytes {
  return token.concatI32(index.toI32())
}

export function convertToAmountTonnes(tokenAddress: Bytes, amount: BigInt): BigDecimal {
  const amountBD = amount.toBigDecimal().div(BigDecimal.fromString(BIG_INT_1E18.toString()))

  if (Address.fromBytes(tokenAddress) == CCO2_ERC20_CONTRACT) {
    return amountBD.div(BigDecimal.fromString('1000'))
  }
  return amountBD
}

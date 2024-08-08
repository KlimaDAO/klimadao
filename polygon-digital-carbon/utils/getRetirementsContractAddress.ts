import { AMOY_KLIMA_CARBON_RETIREMENTS_CONTRACT, KLIMA_CARBON_RETIREMENTS_CONTRACT } from '../../lib/utils/Constants'
import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'

export function getRetirementsContractAddress(network: string): Address {
  return network == 'matic' || network == 'mainnet'
    ? KLIMA_CARBON_RETIREMENTS_CONTRACT
    : AMOY_KLIMA_CARBON_RETIREMENTS_CONTRACT
}

export function createAsyncRetireRequestId(token: Address, index: BigInt): Bytes {
  return token.concatI32(index.toI32())
}

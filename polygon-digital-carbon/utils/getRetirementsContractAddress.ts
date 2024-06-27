import { AMOY_KLIMA_CARBON_RETIREMENTS_CONTRACT, KLIMA_CARBON_RETIREMENTS_CONTRACT } from '../../lib/utils/Constants'
import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'

export function getRetirementsContractAddress(network: string): Address {
  return network == 'matic' ? KLIMA_CARBON_RETIREMENTS_CONTRACT : AMOY_KLIMA_CARBON_RETIREMENTS_CONTRACT
}

export function getC3RetireRequestId(fromToken: Address, index: BigInt): Bytes {
  return fromToken.concatI32(index.toI32())
}

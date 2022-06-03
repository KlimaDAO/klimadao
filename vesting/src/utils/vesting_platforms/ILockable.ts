import { Address, BigInt } from "@graphprotocol/graph-ts"

export interface ILockable {

  getContractAddress(): Address 
  getTokenName(): string
  getPlatformName(): string
  getInitTimestamp(): BigInt

}

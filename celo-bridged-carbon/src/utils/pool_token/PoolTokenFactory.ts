import { Address } from '@graphprotocol/graph-ts'

import * as constants from '../Constants'
import { IPoolToken } from './IPoolToken'
import { BCT } from './impl/BCT'
import { MCO2 } from './impl/MCO2'
import { NCT } from './impl/NCT'

export class PoolTokenFactory {
  constructor() {}

  public getTokenForAddress(address: Address): IPoolToken {
    if (address.equals(Address.fromHexString(constants.BCT_ERC20_CONTRACT))) {
      return new BCT(address)
    }
    if (address.equals(Address.fromHexString(constants.NCT_ERC20_CONTRACT))) {
      return new NCT(address)
    }
    if (address.equals(Address.fromHexString(constants.MCO2_ERC20_CONTRACT))) {
      return new MCO2(address)
    }

    throw new Error('[Carbon Factory] Failed to get Carbon Token for address: ' + address.toHexString())
  }
}

import { Address } from '@graphprotocol/graph-ts'

import * as constants from '../Constants'
import { IPoolToken } from './IPoolToken'
import { BCT } from './impl/BCT'
import { MCO2 } from './impl/MCO2'
import { NBO } from './impl/NBO'
import { NCT } from './impl/NCT'
import { UBO } from './impl/UBO'
import { CCO2 } from './impl/CCO2'

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
    if (address.equals(Address.fromHexString(constants.UBO_ERC20_CONTRACT))) {
      return new UBO(address)
    }
    if (address.equals(Address.fromHexString(constants.NBO_ERC20_CONTRACT))) {
      return new NBO(address)
    }
    if (address.equals(Address.fromHexString(constants.CCO2_ERC20_CONTRACT))) {
      return new CCO2(address)
    }

    throw new Error('[Carbon Factory] Failed to get Carbon Token for address: ' + address.toHexString())
  }
}

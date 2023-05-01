import { BigDecimal, BigInt, Address } from '@graphprotocol/graph-ts'
import { ERC20 } from '../../generated/ERC20'
import { IToken } from '../IToken'

import * as constants from '../../utils/Constants'
import { toDecimal } from '../../utils/Decimals'
import { PriceUtil } from '../../utils/Price'

export class NCT implements IToken {
  private contractAddress: Address = constants.NCT_ERC20_CONTRACT

  getERC20ContractAddress(): string {
    return this.contractAddress.toHexString()
  }

  getTokenName(): string {
    return constants.NCT_TOKEN
  }
  getDecimals(): number {
    return 18
  }

  getFormattedPrice(rawPrice: BigInt): BigDecimal {
    return toDecimal(rawPrice, this.getDecimals())
  }

  getMarketPrice(blockNumber: BigInt): BigDecimal {
    throw new Error('Method not implemented.')
  }

  getUSDPrice(blockNumber: BigInt): BigDecimal {
    return PriceUtil.getNCT_USDRate()
  }

  getTotalSupply(): BigDecimal {
    let ercContract = ERC20.bind(this.contractAddress)
    let totalSupply = toDecimal(ercContract.totalSupply(), this.getDecimals())

    return totalSupply
  }

  getAddressBalance(address: Address): BigDecimal {
    const newBalanceRaw = ERC20.bind(this.contractAddress).try_balanceOf(address)
    if (!newBalanceRaw.reverted) {
      return toDecimal(newBalanceRaw.value, this.getDecimals())
    }
    return BigDecimal.fromString('0')
  }
}

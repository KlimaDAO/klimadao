import { BondV1 } from '../../generated/BCTBondV1/BondV1'
 import { Address, BigDecimal, log } from '@graphprotocol/graph-ts'

  export function getDaoFee(bondAddress: Address, payout : BigDecimal): BigDecimal {
      const bondContract = BondV1.bind(bondAddress)
      const terms_call = bondContract.try_terms()

      let daoFee = BigDecimal.zero()
      if (terms_call.reverted === false) {

          const feeRaw = terms_call.value.value4
          const feeDecimal = feeRaw.toBigDecimal().div(BigDecimal.fromString("10000"))
          daoFee = feeDecimal.times(payout)
      }


      return daoFee
  }
  
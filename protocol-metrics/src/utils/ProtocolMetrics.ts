import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { KlimaERC20V1 } from '../../generated/TreasuryV1/KlimaERC20V1'
import { sKlimaERC20V1 } from '../../generated/TreasuryV1/sKlimaERC20V1'
import { ERC20 } from '../../generated/TreasuryV1/ERC20'
import { UniswapV2Pair } from '../../generated/TreasuryV1/UniswapV2Pair'
import { KlimaStakingV1 } from '../../generated/TreasuryV1/KlimaStakingV1'

import { ProtocolMetric, Transaction, TreasuryAsset } from '../../generated/schema'
import { dayTimestamp as dayTimestampString } from '../../../lib/utils/Dates'
import { IToken } from '../../../lib/tokens/IToken'
import { toDecimal } from '../../../lib/utils/Decimals'

import { getHolderAux } from './Aux'
import {
  BCTBOND_V1,
  BCT_ERC20_CONTRACT,
  BCT_USDC_BOND_V1,
  BCT_USDC_PAIR,
  BCT_USDC_PAIR_BLOCK,
  DAO_MULTISIG,
  KLIMA_BCT_BOND_V1,
  KLIMA_BCT_PAIR,
  KLIMA_BCT_PAIR_BLOCK,
  KLIMA_ERC20_V1_CONTRACT,
  KLIMA_MCO2_BOND_V1,
  KLIMA_MCO2_BOND_V1_2,
  KLIMA_MCO2_PAIR,
  KLIMA_MCO2_PAIR_BLOCK,
  KLIMA_CCO2_PAIR,
  KLIMA_CCO2_PAIR_BLOCK,
  CCO2_ERC20_CONTRACT,
  KLIMA_USDC_PAIR,
  KLIMA_USDC_PAIR_BLOCK,
  MCO2BOND_V1,
  MCO2BOND_V1_2,
  MCO2BOND_V1_BLOCK,
  MCO2_ERC20_CONTRACT,
  UBOBOND_V1,
  UBOBOND_V1_BLOCK,
  UBO_ERC20_CONTRACT,
  KLIMA_UBO_PAIR_BLOCK,
  UBO_KLIMA_V2_PAIR,
  UBO_KLIMA_V2_PAIR_BLOCK,
  NBOBOND_V1,
  NBOBOND_V1_BLOCK,
  NBO_ERC20_CONTRACT,
  KLIMA_NBO_PAIR_BLOCK,
  KLIMA_NBO_V2_PAIR,
  KLIMA_NBO_V2_PAIR_BLOCK,
  SKLIMA_ERC20_V1_CONTRACT,
  STAKING_CONTRACT_V1,
  TREASURY_ADDRESS,
  NCT_ERC20_CONTRACT,
  NCT_USDC_PAIR_BLOCK,
  KLIMA_NBO_PAIR,
  KLIMA_UBO_PAIR,
  KLIMA_NCT_PAIR,
  KLIMA_NCT_PAIR_BLOCK,
  USDC_ERC20_CONTRACT,
  CCO2_TRANSFER_BLOCK,
  KGS_PER_TONNE,
} from '../../../lib/utils/Constants'
import { EpochUtil } from './Epoch'
import { BCT } from '../../../lib/tokens/impl/BCT'
import { NCT } from '../../../lib/tokens/impl/NCT'
import { MCO2 } from '../../../lib/tokens/impl/MCO2'
import { CCO2 } from '../../../lib/tokens/impl/CCO2'
import { UBO } from '../../../lib/tokens/impl/UBO'
import { NBO } from '../../../lib/tokens/impl/NBO'
import { KLIMA } from '../../../lib/tokens/impl/KLIMA'
import { USDC } from '../../../lib/tokens/impl/USDC'

export function loadOrCreateProtocolMetric(timestamp: BigInt): ProtocolMetric {
  let dayTimestamp = dayTimestampString(timestamp)

  let protocolMetric = ProtocolMetric.load(dayTimestamp)
  if (protocolMetric == null) {
    protocolMetric = new ProtocolMetric(dayTimestamp)
    protocolMetric.timestamp = timestamp
    protocolMetric.klimaCirculatingSupply = BigDecimal.fromString('0')
    protocolMetric.sKlimaCirculatingSupply = BigDecimal.fromString('0')
    protocolMetric.totalKlimaInLP = BigDecimal.fromString('0')
    protocolMetric.totalKlimaUnstaked = BigDecimal.fromString('0')
    protocolMetric.daoBalanceUSDC = BigDecimal.fromString('0')
    protocolMetric.daoBalanceKLIMA = BigDecimal.fromString('0')
    protocolMetric.treasuryBalanceUSDC = BigDecimal.fromString('0')
    protocolMetric.treasuryBalanceKLIMA = BigDecimal.fromString('0')
    protocolMetric.treasuryUSDCInLP = BigDecimal.fromString('0')
    protocolMetric.totalSupply = BigDecimal.fromString('0')
    protocolMetric.klimaPrice = BigDecimal.fromString('0')
    protocolMetric.marketCap = BigDecimal.fromString('0')
    protocolMetric.totalValueLocked = BigDecimal.fromString('0')
    protocolMetric.assets = []
    protocolMetric.treasuryCarbonCustodied = BigDecimal.fromString('0')
    protocolMetric.treasuryMarketValue = BigDecimal.fromString('0')
    protocolMetric.nextEpochRebase = BigDecimal.fromString('0')
    protocolMetric.nextDistributedKlima = BigDecimal.fromString('0')
    protocolMetric.currentAKR = BigDecimal.fromString('0')
    protocolMetric.runwayCurrent = BigDecimal.fromString('0')
    protocolMetric.treasuryCarbon = BigDecimal.fromString('0')
    protocolMetric.klimaIndex = BigDecimal.fromString('0')
    protocolMetric.holders = BigInt.fromI32(0)

    protocolMetric.save()
  }
  return protocolMetric as ProtocolMetric
}

export function loadOrCreateTreasuryAsset(timestamp: BigInt, token: String): TreasuryAsset {
  let dayTimestamp = dayTimestampString(timestamp)

  let treasuryAsset = TreasuryAsset.load(dayTimestamp + token)
  if (treasuryAsset == null) {
    treasuryAsset = new TreasuryAsset(dayTimestamp + token)
    treasuryAsset.timestamp = timestamp
    treasuryAsset.token = token.toString()
    treasuryAsset.tokenBalance = BigDecimal.fromString('0')
    treasuryAsset.carbonBalance = BigDecimal.fromString('0')
    treasuryAsset.carbonCustodied = BigDecimal.fromString('0')
    treasuryAsset.marketValue = BigDecimal.fromString('0')
    treasuryAsset.POL = BigDecimal.fromString('0')

    treasuryAsset.save()
  }

  return treasuryAsset as TreasuryAsset
}

function getTotalSupply(): BigDecimal {
  let klima_contract = KlimaERC20V1.bind(KLIMA_ERC20_V1_CONTRACT)
  let total_supply = toDecimal(klima_contract.totalSupply(), 9)
  log.debug('Total Supply {}', [total_supply.toString()])
  return total_supply
}

function getCirculatingSupply(transaction: Transaction, total_supply: BigDecimal): BigDecimal {
  let klima_contract = KlimaERC20V1.bind(KLIMA_ERC20_V1_CONTRACT)

  // Start with total supply
  let circ_supply = total_supply

  // Subtract DAO Balance
  circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(DAO_MULTISIG), 9))

  // Subtract Bond Rewards
  circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(BCTBOND_V1), 9))
  circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(BCT_USDC_BOND_V1), 9))
  circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(KLIMA_BCT_BOND_V1), 9))
  circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(MCO2BOND_V1), 9))
  circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(MCO2BOND_V1_2), 9))
  circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(KLIMA_MCO2_BOND_V1), 9))
  circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(KLIMA_MCO2_BOND_V1_2), 9))
  circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(UBOBOND_V1), 9))
  // circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(KLIMA_UBO_BOND_V1), 9))
  circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(NBOBOND_V1), 9))
  // circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(KLIMA_NBO_BOND_V1), 9))

  log.debug('Circulating Supply {}', [total_supply.toString()])
  return circ_supply
}

function getSklimaSupply(transaction: Transaction): BigDecimal {
  let sklima_supply = BigDecimal.fromString('0')

  let sklima_contract_v1 = sKlimaERC20V1.bind(SKLIMA_ERC20_V1_CONTRACT)
  sklima_supply = toDecimal(sklima_contract_v1.circulatingSupply(), 9)

  log.debug('sKLIMA Supply {}', [sklima_supply.toString()])
  return sklima_supply
}

function updateTreasuryAssets(transaction: Transaction): string[] {
  // USDC
  let usdcERC20 = ERC20.bind(USDC_ERC20_CONTRACT)
  let treasuryUSDC = loadOrCreateTreasuryAsset(transaction.timestamp, USDC_ERC20_CONTRACT.toHexString())

  // KLIMA
  let klimaERC20 = ERC20.bind(KLIMA_ERC20_V1_CONTRACT)
  let treasuryKLIMA = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_ERC20_V1_CONTRACT.toHexString())

  // BCT
  let bctERC20 = ERC20.bind(BCT_ERC20_CONTRACT)
  let treasuryBCT = loadOrCreateTreasuryAsset(transaction.timestamp, BCT_ERC20_CONTRACT.toHexString())

  // NCT
  let nctERC20 = ERC20.bind(NCT_ERC20_CONTRACT)
  let treasuryNCT = loadOrCreateTreasuryAsset(transaction.timestamp, NCT_ERC20_CONTRACT.toHexString())

  // MCO2
  let mco2ERC20 = ERC20.bind(MCO2_ERC20_CONTRACT)
  let treasuryMCO2 = loadOrCreateTreasuryAsset(transaction.timestamp, MCO2_ERC20_CONTRACT.toHexString())

  // CCO2
  let cco2ERC20 = ERC20.bind(CCO2_ERC20_CONTRACT)
  let treasuryCCO2 = loadOrCreateTreasuryAsset(transaction.timestamp, CCO2_ERC20_CONTRACT.toHexString())

  // UBO
  let uboERC20 = ERC20.bind(UBO_ERC20_CONTRACT)
  let treasuryUBO = loadOrCreateTreasuryAsset(transaction.timestamp, UBO_ERC20_CONTRACT.toHexString())

  // NBO
  let nboERC20 = ERC20.bind(NBO_ERC20_CONTRACT)
  let treasuryNBO = loadOrCreateTreasuryAsset(transaction.timestamp, NBO_ERC20_CONTRACT.toHexString())

  // Treasury token balance
  treasuryUSDC.tokenBalance = toDecimal(usdcERC20.balanceOf(TREASURY_ADDRESS), 6)
  treasuryBCT.tokenBalance = toDecimal(bctERC20.balanceOf(TREASURY_ADDRESS), 18)
  treasuryKLIMA.tokenBalance = toDecimal(klimaERC20.balanceOf(TREASURY_ADDRESS), 9)

  if (transaction.blockNumber.gt(NCT_USDC_PAIR_BLOCK)) {
    treasuryNCT.tokenBalance = toDecimal(nctERC20.balanceOf(TREASURY_ADDRESS), 18)
  }

  if (transaction.blockNumber.gt(MCO2BOND_V1_BLOCK)) {
    treasuryMCO2.tokenBalance = toDecimal(mco2ERC20.balanceOf(TREASURY_ADDRESS))
  }
  if (transaction.blockNumber.gt(UBOBOND_V1_BLOCK)) {
    treasuryUBO.tokenBalance = toDecimal(uboERC20.balanceOf(TREASURY_ADDRESS))
  }
  if (transaction.blockNumber.gt(NBOBOND_V1_BLOCK)) {
    treasuryNBO.tokenBalance = toDecimal(nboERC20.balanceOf(TREASURY_ADDRESS))
  }
  if (transaction.blockNumber.gt(CCO2_TRANSFER_BLOCK)) {
    treasuryCCO2.tokenBalance = toDecimal(cco2ERC20.balanceOf(TREASURY_ADDRESS))
  }

  // Reserve asset so carbon and CC = token balance
  treasuryUSDC.carbonBalance = BigDecimal.zero()
  treasuryUSDC.carbonCustodied = BigDecimal.zero()

  treasuryBCT.carbonBalance = treasuryBCT.tokenBalance
  treasuryBCT.carbonCustodied = treasuryBCT.tokenBalance

  treasuryNCT.carbonBalance = treasuryNCT.tokenBalance
  treasuryNCT.carbonCustodied = treasuryNCT.tokenBalance

  treasuryMCO2.carbonBalance = treasuryMCO2.tokenBalance
  treasuryMCO2.carbonCustodied = treasuryMCO2.tokenBalance

  treasuryUBO.carbonBalance = treasuryUBO.tokenBalance
  treasuryUBO.carbonCustodied = treasuryUBO.tokenBalance

  treasuryNBO.carbonBalance = treasuryNBO.tokenBalance
  treasuryNBO.carbonCustodied = treasuryNBO.tokenBalance

  // divide by 1000 since CCO2 is kgs not tonnes
  treasuryCCO2.carbonBalance = treasuryCCO2.tokenBalance / KGS_PER_TONNE
  treasuryCCO2.carbonCustodied = treasuryCCO2.tokenBalance / KGS_PER_TONNE

  const bctUsdPrice = new BCT().getUSDPrice(transaction.blockNumber)
  const nctUsdPrice = new NCT().getUSDPrice(transaction.blockNumber)
  const mco2UsdPrice = new MCO2().getUSDPrice(transaction.blockNumber)
  const uboUsdPrice = new UBO().getUSDPrice(transaction.blockNumber)
  const nboUsdPrice = new NBO().getUSDPrice(transaction.blockNumber)
  const cco2UsdPrice = new CCO2().getUSDPrice(transaction.blockNumber)
  const klimaUsdPrice = new KLIMA().getUSDPrice(transaction.blockNumber)

  // Get market value if pools are deployed
  treasuryUSDC.marketValue = treasuryUSDC.tokenBalance
  treasuryKLIMA.marketValue = treasuryKLIMA.tokenBalance * klimaUsdPrice

  if (transaction.blockNumber.gt(BCT_USDC_PAIR_BLOCK)) {
    treasuryBCT.marketValue = treasuryBCT.tokenBalance.times(bctUsdPrice)
  }

  if (transaction.blockNumber.gt(NCT_USDC_PAIR_BLOCK)) {
    treasuryNCT.marketValue = treasuryNCT.tokenBalance.times(nctUsdPrice)
  }

  if (transaction.blockNumber.gt(KLIMA_MCO2_PAIR_BLOCK)) {
    treasuryMCO2.marketValue = treasuryMCO2.tokenBalance.times(mco2UsdPrice)
  }

  if (transaction.blockNumber.gt(KLIMA_UBO_PAIR_BLOCK)) {
    treasuryUBO.marketValue = treasuryUBO.tokenBalance.times(uboUsdPrice)
  }

  if (transaction.blockNumber.gt(KLIMA_NBO_PAIR_BLOCK)) {
    treasuryNBO.marketValue = treasuryNBO.tokenBalance.times(nboUsdPrice)
  }

  if (transaction.blockNumber.gt(KLIMA_CCO2_PAIR_BLOCK)) {
    treasuryCCO2.marketValue = treasuryCCO2.tokenBalance.times(cco2UsdPrice)
  }

  treasuryUSDC.save()
  treasuryKLIMA.save()
  treasuryBCT.save()
  treasuryNCT.save()
  treasuryMCO2.save()
  treasuryUBO.save()
  treasuryNBO.save()
  treasuryCCO2.save()

  // KLIMA-BCT
  let treasuryKLIMABCT = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_BCT_PAIR.toHexString())

  if (transaction.blockNumber.gt(KLIMA_BCT_PAIR_BLOCK)) {
    let klimabctERC20 = ERC20.bind(KLIMA_BCT_PAIR)
    let klimabctUNIV2 = UniswapV2Pair.bind(KLIMA_BCT_PAIR)

    // Treasury LP token balance
    treasuryKLIMABCT.tokenBalance = toDecimal(klimabctERC20.balanceOf(TREASURY_ADDRESS), 18)

    // Get total LP supply and calc treasury percent
    let total_lp = toDecimal(klimabctUNIV2.totalSupply(), 18)
    let ownedLP = treasuryKLIMABCT.tokenBalance.div(total_lp)
    let reserves = klimabctUNIV2.getReserves()
    let reserves0 = toDecimal(reserves.value0, 18)
    let reserves1 = toDecimal(reserves.value1, 9)
    let kValue = parseFloat(reserves0.times(reserves1).toString())
    treasuryKLIMABCT.POL = ownedLP

    // Percent of Carbon in LP owned by the treasury
    treasuryKLIMABCT.carbonBalance = reserves0.times(ownedLP)
    treasuryKLIMABCT.carbonCustodied = BigDecimal.fromString((2 * Math.sqrt(kValue)).toString()).times(ownedLP)
    treasuryKLIMABCT.marketValue = treasuryKLIMABCT.carbonBalance.times(bctUsdPrice).times(BigDecimal.fromString('2'))
  }

  treasuryKLIMABCT.save()

  // KLIMA-MCO2
  let treasuryKLIMAMCO2 = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_MCO2_PAIR.toHexString())

  if (transaction.blockNumber.gt(KLIMA_MCO2_PAIR_BLOCK)) {
    let klimamco2ERC20 = ERC20.bind(KLIMA_MCO2_PAIR)
    let klimamco2UNIV2 = UniswapV2Pair.bind(KLIMA_MCO2_PAIR)

    // Treasury LP token balance
    treasuryKLIMAMCO2.tokenBalance = toDecimal(klimamco2ERC20.balanceOf(TREASURY_ADDRESS), 18)

    // Get total LP supply and calc treasury percent
    let total_lp = toDecimal(klimamco2UNIV2.totalSupply(), 18)
    let ownedLP = treasuryKLIMAMCO2.tokenBalance.div(total_lp)
    treasuryKLIMAMCO2.POL = ownedLP

    // Percent of Carbon in LP owned by the treasury
    treasuryKLIMAMCO2.carbonBalance = toDecimal(klimamco2UNIV2.getReserves().value1, 18).times(ownedLP)
    treasuryKLIMAMCO2.marketValue = treasuryKLIMAMCO2.carbonBalance
      .times(mco2UsdPrice)
      .times(BigDecimal.fromString('2'))
  }

  treasuryKLIMAMCO2.save()

  // KLIMA-UBO
  let treasuryKLIMAUBO = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_UBO_PAIR.toHexString())

  if (transaction.blockNumber.gt(KLIMA_UBO_PAIR_BLOCK)) {
    let klimauboERC20 = ERC20.bind(KLIMA_UBO_PAIR)
    let klimauboUNIV2 = UniswapV2Pair.bind(KLIMA_UBO_PAIR)

    // Treasury LP token balance
    treasuryKLIMAUBO.tokenBalance = toDecimal(klimauboERC20.balanceOf(TREASURY_ADDRESS), 18)

    // Get total LP supply and calc treasury percent
    let total_lp = toDecimal(klimauboUNIV2.totalSupply(), 18)
    let ownedLP = treasuryKLIMAUBO.tokenBalance.div(total_lp)
    let reserves = klimauboUNIV2.getReserves()
    let reserves0 = toDecimal(reserves.value0, 18)
    let reserves1 = toDecimal(reserves.value1, 9)
    let kValue = parseFloat(reserves0.times(reserves1).toString())
    treasuryKLIMAUBO.POL = ownedLP

    // Percent of Carbon in LP owned by the treasury
    treasuryKLIMAUBO.carbonBalance = reserves0.times(ownedLP)
    treasuryKLIMAUBO.carbonCustodied = BigDecimal.fromString((2 * Math.sqrt(kValue)).toString()).times(ownedLP)
    treasuryKLIMAUBO.marketValue = treasuryKLIMAUBO.carbonBalance.times(uboUsdPrice).times(BigDecimal.fromString('2'))
  }

  treasuryKLIMAUBO.save()

  // UBO-KLIMA V2
  let treasuryUBOKLIMAV2 = loadOrCreateTreasuryAsset(transaction.timestamp, UBO_KLIMA_V2_PAIR.toHexString())

  if (transaction.blockNumber.gt(UBO_KLIMA_V2_PAIR_BLOCK)) {
    let uboklimaERC20 = ERC20.bind(UBO_KLIMA_V2_PAIR)
    let uboklimaUNIV2 = UniswapV2Pair.bind(UBO_KLIMA_V2_PAIR)

    // Treasury LP token balance
    treasuryUBOKLIMAV2.tokenBalance = toDecimal(uboklimaERC20.balanceOf(TREASURY_ADDRESS), 18)

    // Get total LP supply and calc treasury percent
    let total_lp = toDecimal(uboklimaUNIV2.totalSupply(), 18)
    let ownedLP = treasuryUBOKLIMAV2.tokenBalance.div(total_lp)
    let reserves = uboklimaUNIV2.getReserves()
    let reserves0 = toDecimal(reserves.value0, 18)
    let reserves1 = toDecimal(reserves.value1, 9)
    let kValue = parseFloat(reserves0.times(reserves1).toString())
    treasuryUBOKLIMAV2.POL = ownedLP

    // Percent of Carbon in LP owned by the treasury
    treasuryUBOKLIMAV2.carbonBalance = reserves0.times(ownedLP)
    treasuryUBOKLIMAV2.carbonCustodied = BigDecimal.fromString((2 * Math.sqrt(kValue)).toString()).times(ownedLP)
    treasuryUBOKLIMAV2.marketValue = treasuryUBOKLIMAV2.carbonBalance.times(uboUsdPrice).times(BigDecimal.fromString('2'))
  }

  treasuryUBOKLIMAV2.save()

  // KLIMA-NBO
  let treasuryKLIMANBO = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_NBO_PAIR.toHexString())

  if (transaction.blockNumber.gt(KLIMA_NBO_PAIR_BLOCK)) {
    let klimanboERC20 = ERC20.bind(KLIMA_NBO_PAIR)
    let klimanboUNIV2 = UniswapV2Pair.bind(KLIMA_NBO_PAIR)

    // Treasury LP token balance
    treasuryKLIMANBO.tokenBalance = toDecimal(klimanboERC20.balanceOf(TREASURY_ADDRESS), 18)

    // Get total LP supply and calc treasury percent
    let total_lp = toDecimal(klimanboUNIV2.totalSupply(), 18)
    let ownedLP = treasuryKLIMANBO.tokenBalance.div(total_lp)
    let reserves = klimanboUNIV2.getReserves()
    let reserves0 = toDecimal(reserves.value0, 9)
    let reserves1 = toDecimal(reserves.value1, 18)
    let kValue = parseFloat(reserves0.times(reserves1).toString())
    treasuryKLIMANBO.POL = ownedLP

    // Percent of Carbon in LP owned by the treasury
    treasuryKLIMANBO.carbonBalance = reserves1.times(ownedLP)
    treasuryKLIMANBO.carbonCustodied = BigDecimal.fromString((2 * Math.sqrt(kValue)).toString()).times(ownedLP)
    treasuryKLIMANBO.marketValue = treasuryKLIMANBO.carbonBalance.times(nboUsdPrice).times(BigDecimal.fromString('2'))
  }

  treasuryKLIMANBO.save()

  // KLIMA-NBO Sushi V2
  let treasuryKLIMANBOV2 = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_NBO_V2_PAIR.toHexString())

  if (transaction.blockNumber.gt(KLIMA_NBO_V2_PAIR_BLOCK)) {
    let klimanboERC20 = ERC20.bind(KLIMA_NBO_V2_PAIR)
    let klimanboUNIV2 = UniswapV2Pair.bind(KLIMA_NBO_V2_PAIR)

    // Treasury LP token balance
    treasuryKLIMANBOV2.tokenBalance = toDecimal(klimanboERC20.balanceOf(TREASURY_ADDRESS), 18)

    // Get total LP supply and calc treasury percent
    let total_lp = toDecimal(klimanboUNIV2.totalSupply(), 18)
    let ownedLP = treasuryKLIMANBO.tokenBalance.div(total_lp)
    let reserves = klimanboUNIV2.getReserves()
    let reserves0 = toDecimal(reserves.value0, 9)
    let reserves1 = toDecimal(reserves.value1, 18)
    let kValue = parseFloat(reserves0.times(reserves1).toString())
    treasuryKLIMANBOV2.POL = ownedLP

    // Percent of Carbon in LP owned by the treasury
    treasuryKLIMANBOV2.carbonBalance = reserves1.times(ownedLP)
    treasuryKLIMANBOV2.carbonCustodied = BigDecimal.fromString((2 * Math.sqrt(kValue)).toString()).times(ownedLP)
    treasuryKLIMANBOV2.marketValue = treasuryKLIMANBOV2.carbonBalance.times(nboUsdPrice).times(BigDecimal.fromString('2'))
  }

  treasuryKLIMANBOV2.save()

  // KLIMA-NCT
  let treasuryKLIMANCT = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_NCT_PAIR.toHexString())

  if (transaction.blockNumber.gt(KLIMA_NCT_PAIR_BLOCK)) {
    let klimanctERC20 = ERC20.bind(KLIMA_NCT_PAIR)
    let klimanctUNIV2 = UniswapV2Pair.bind(KLIMA_NCT_PAIR)

    // Treasury LP token balance
    treasuryKLIMANCT.tokenBalance = toDecimal(klimanctERC20.balanceOf(TREASURY_ADDRESS), 18)

    // Get total LP supply and calc treasury percent
    let total_lp = toDecimal(klimanctUNIV2.totalSupply(), 18)
    let ownedLP = treasuryKLIMANCT.tokenBalance.div(total_lp)
    let reserves = klimanctUNIV2.getReserves()
    let reserves0 = toDecimal(reserves.value0, 9)
    let reserves1 = toDecimal(reserves.value1, 18)
    let kValue = parseFloat(reserves0.times(reserves1).toString())
    treasuryKLIMANCT.POL = ownedLP

    // Percent of Carbon in LP owned by the treasury
    treasuryKLIMANCT.carbonBalance = reserves1.times(ownedLP)
    treasuryKLIMANCT.carbonCustodied = BigDecimal.fromString((2 * Math.sqrt(kValue)).toString()).times(ownedLP)
    treasuryKLIMANCT.marketValue = treasuryKLIMANCT.carbonBalance.times(nctUsdPrice).times(BigDecimal.fromString('2'))
  }

  treasuryKLIMANCT.save()

  // BCT-USDC

  let treasuryBCTUSDC = loadOrCreateTreasuryAsset(transaction.timestamp, BCT_USDC_PAIR.toHexString())
  if (transaction.blockNumber.gt(BCT_USDC_PAIR_BLOCK)) {
    let bctusdcERC20 = ERC20.bind(BCT_USDC_PAIR)
    let bctusdcUNIV2 = UniswapV2Pair.bind(BCT_USDC_PAIR)

    // Treasury LP token balance
    treasuryBCTUSDC.tokenBalance = toDecimal(bctusdcERC20.balanceOf(TREASURY_ADDRESS), 18)

    // Get total LP supply and calc treasury percent
    let total_lp = toDecimal(bctusdcUNIV2.totalSupply(), 18)
    let ownedLP = treasuryBCTUSDC.tokenBalance.div(total_lp)
    treasuryBCTUSDC.POL = ownedLP

    // Percent of Carbon in LP owned by the treasury
    treasuryBCTUSDC.carbonBalance = toDecimal(bctusdcUNIV2.getReserves().value1, 18).times(ownedLP)
    treasuryBCTUSDC.marketValue = treasuryBCTUSDC.carbonBalance.times(bctUsdPrice).times(BigDecimal.fromString('2'))
  }

  treasuryBCTUSDC.save()

  // KLIMA-USDC

  let treasuryKLIMAUSDC = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_USDC_PAIR.toHexString())
  if (transaction.blockNumber.gt(KLIMA_USDC_PAIR_BLOCK)) {
    let klimausdcERC20 = ERC20.bind(KLIMA_USDC_PAIR)
    let klimausdcUNIV2 = UniswapV2Pair.bind(KLIMA_USDC_PAIR)

    // Treasury LP token balance
    treasuryKLIMAUSDC.tokenBalance = toDecimal(klimausdcERC20.balanceOf(TREASURY_ADDRESS), 18)

    // Get total LP supply and calc treasury percent
    let total_lp = toDecimal(klimausdcUNIV2.totalSupply(), 18)
    let ownedLP = treasuryKLIMAUSDC.tokenBalance.div(total_lp)
    treasuryKLIMAUSDC.POL = ownedLP
    treasuryKLIMAUSDC.marketValue = toDecimal(klimausdcUNIV2.getReserves().value1, 9)
      .times(klimaUsdPrice)
      .times(ownedLP)
      .times(BigDecimal.fromString('2'))
  }

  treasuryKLIMAUSDC.save()

  return [
    treasuryUSDC.id,
    treasuryKLIMA.id,
    treasuryBCT.id,
    treasuryMCO2.id,
    treasuryUBO.id,
    treasuryNBO.id,
    treasuryKLIMABCT.id,
    treasuryKLIMAMCO2.id,
    treasuryKLIMAUBO.id,
    treasuryUBOKLIMAV2.id,
    treasuryKLIMANBO.id,
    treasuryKLIMANBOV2.id,
    treasuryKLIMANCT.id,
    treasuryBCTUSDC.id,
    treasuryKLIMAUSDC.id,
    treasuryNCT.id,
    treasuryCCO2.id,
  ]
}

function getKlimaAmountFromLP(transaction: Transaction): BigDecimal {
  const klimaToken = new KLIMA()
  let totalKlimaInLP = BigDecimal.zero()
  if (transaction.blockNumber.gt(KLIMA_USDC_PAIR_BLOCK)) {
    totalKlimaInLP = totalKlimaInLP.plus(getTokenReserveAmount(KLIMA_USDC_PAIR, klimaToken, false))
  }
  if (transaction.blockNumber.gt(KLIMA_BCT_PAIR_BLOCK)) {
    totalKlimaInLP = totalKlimaInLP.plus(getTokenReserveAmount(KLIMA_BCT_PAIR, klimaToken, false))
  }
  if (transaction.blockNumber.gt(KLIMA_MCO2_PAIR_BLOCK)) {
    totalKlimaInLP = totalKlimaInLP.plus(getTokenReserveAmount(KLIMA_MCO2_PAIR, klimaToken, true))
  }
  if (transaction.blockNumber.gt(KLIMA_UBO_PAIR_BLOCK)) {
    totalKlimaInLP = totalKlimaInLP.plus(getTokenReserveAmount(KLIMA_UBO_PAIR, klimaToken, false))
  }
  if (transaction.blockNumber.gt(UBO_KLIMA_V2_PAIR_BLOCK)) {
    totalKlimaInLP = totalKlimaInLP.plus(getTokenReserveAmount(UBO_KLIMA_V2_PAIR, klimaToken, false))
  }
  if (transaction.blockNumber.gt(KLIMA_NBO_PAIR_BLOCK)) {
    totalKlimaInLP = totalKlimaInLP.plus(getTokenReserveAmount(KLIMA_NBO_PAIR, klimaToken, true))
  }
  if (transaction.blockNumber.gt(KLIMA_NBO_V2_PAIR_BLOCK)) {
    totalKlimaInLP = totalKlimaInLP.plus(getTokenReserveAmount(KLIMA_NBO_V2_PAIR, klimaToken, true))
  }
  if (transaction.blockNumber.gt(KLIMA_NCT_PAIR_BLOCK)) {
    totalKlimaInLP = totalKlimaInLP.plus(getTokenReserveAmount(KLIMA_NCT_PAIR, klimaToken, true))
  }
  if (transaction.blockNumber.gt(KLIMA_CCO2_PAIR_BLOCK)) {
    totalKlimaInLP = totalKlimaInLP.plus(getTokenReserveAmount(KLIMA_CCO2_PAIR, klimaToken, true))
  }

  return totalKlimaInLP
}

function getUSDCAmountFromLP(transaction: Transaction): BigDecimal {
  const usdcToken = new USDC()
  let totalUSDCInLP = BigDecimal.zero()
  if (transaction.blockNumber.gt(KLIMA_USDC_PAIR_BLOCK)) {
    totalUSDCInLP = totalUSDCInLP.plus(getTokenReserveAmount(KLIMA_USDC_PAIR, usdcToken, true))
  }
  if (transaction.blockNumber.gt(BCT_USDC_PAIR_BLOCK)) {
    totalUSDCInLP = totalUSDCInLP.plus(getTokenReserveAmount(BCT_USDC_PAIR, usdcToken, true))
  }

  return totalUSDCInLP
}

function getTokenReserveAmount(pair: Address, token: IToken, isFirst: boolean): BigDecimal {
  let uniV2Pair = UniswapV2Pair.bind(pair)
  const reserveCall = uniV2Pair.try_getReserves()
  if (reserveCall.reverted) {
    return BigDecimal.zero()
  }

  if (isFirst) {
    return toDecimal(reserveCall.value.value0, token.getDecimals())
  } else {
    return toDecimal(reserveCall.value.value1, token.getDecimals())
  }
}

function getMV_CC(transaction: Transaction, assets: string[]): BigDecimal[] {
  let totalCarbon = BigDecimal.fromString('0')
  let totalCC = BigDecimal.fromString('0')
  let totalMarketValue = BigDecimal.fromString('0')

  for (let i = 0; i < assets.length; i++) {
    let assetDetail = loadOrCreateTreasuryAsset(transaction.timestamp, assets[i].substring(10))
    totalCarbon = totalCarbon.plus(assetDetail.carbonBalance)
    totalCC = totalCC.plus(assetDetail.carbonCustodied)
    totalMarketValue = totalMarketValue.plus(assetDetail.marketValue)
  }

  log.debug('Treasury Carbon {}', [totalCarbon.toString()])
  log.debug('Treasury CC {}', [totalCC.toString()])
  log.debug('Treasury Market Value {}', [totalMarketValue.toString()])

  return [totalCarbon, totalCC, totalMarketValue]
}

function getNextKLIMARebase(transaction: Transaction): BigDecimal {
  let next_distribution = BigDecimal.fromString('0')

  let staking_contract_v1 = KlimaStakingV1.bind(STAKING_CONTRACT_V1)
  let distribution_v1 = toDecimal(staking_contract_v1.epoch().value3, 9)
  log.debug('next_distribution v1 {}', [distribution_v1.toString()])
  next_distribution = next_distribution.plus(distribution_v1)

  log.debug('next_distribution total {}', [next_distribution.toString()])

  return next_distribution
}

function getAKR_Rebase(sKLIMA: BigDecimal, distributedKLIMA: BigDecimal): BigDecimal[] {
  // Check for 0 sKLIMA supply
  if (sKLIMA == BigDecimal.fromString('0')) {
    return [BigDecimal.fromString('0'), BigDecimal.fromString('0')]
  }

  let nextEpochRebase = distributedKLIMA.div(sKLIMA).times(BigDecimal.fromString('100'))

  let nextEpochRebase_number = Number.parseFloat(nextEpochRebase.toString())
  let currentAKR = Math.pow(nextEpochRebase_number / 100 + 1, 365 * EpochUtil.getDynamicRebaseRate() - 1) * 100

  let currentAKRdecimal = BigDecimal.fromString(currentAKR.toString())

  log.debug('next_rebase {}', [nextEpochRebase.toString()])
  log.debug('current_AKR total {}', [currentAKRdecimal.toString()])

  return [currentAKRdecimal, nextEpochRebase]
}

function getRunway(sKLIMA: BigDecimal, rfv: BigDecimal, rebase: BigDecimal): BigDecimal {
  //let runway100 = BigDecimal.fromString("0")
  //let runway250 = BigDecimal.fromString("0")
  //let runway500 = BigDecimal.fromString("0")
  //let runway1k = BigDecimal.fromString("0")
  //let runway2dot5k = BigDecimal.fromString("0")
  //let runway5k = BigDecimal.fromString("0")
  let runwayCurrent = BigDecimal.fromString('0')

  // Keeping placeholder math entered, just commented in case we want in the future.
  if (
    sKLIMA.gt(BigDecimal.fromString('0')) &&
    rfv.gt(BigDecimal.fromString('0')) &&
    rebase.gt(BigDecimal.fromString('0'))
  ) {
    let treasury_runway = Number.parseFloat(rfv.div(sKLIMA).toString())

    //let runway100_num = (Math.log(treasury_runway) / Math.log(1)) / EPOCHS_PER_DAY;
    //let runway250_num = (Math.log(treasury_runway) / Math.log(1 + 0.000763867)) / EPOCHS_PER_DAY;
    //let runway500_num = (Math.log(treasury_runway) / Math.log(1 + 0.001342098)) / EPOCHS_PER_DAY;
    //let runway1k_num = (Math.log(treasury_runway) / Math.log(1 + 0.001920663)) / EPOCHS_PER_DAY;
    //let runway2dot5k_num = (Math.log(treasury_runway) / Math.log(1 + 0.002685997)) / EPOCHS_PER_DAY;
    //let runway5k_num = (Math.log(treasury_runway) / Math.log(1 + 0.003265339)) / EPOCHS_PER_DAY;
    let nextEpochRebase_number = Number.parseFloat(rebase.toString()) / 100
    let runwayCurrent_num =
      Math.log(treasury_runway) / Math.log(1 + nextEpochRebase_number) / EpochUtil.getDynamicRebaseRate()

    //runway100 = BigDecimal.fromString(runway100_num.toString())
    //runway250 = BigDecimal.fromString(runway250_num.toString())
    //runway500 = BigDecimal.fromString(runway500_num.toString())
    //runway1k = BigDecimal.fromString(runway1k_num.toString())
    //runway2dot5k = BigDecimal.fromString(runway2dot5k_num.toString())
    //runway5k = BigDecimal.fromString(runway5k_num.toString())
    runwayCurrent = BigDecimal.fromString(runwayCurrent_num.toString())
  }

  return runwayCurrent
}

export function getKlimaIndex(): BigDecimal {
  const indexCall = KlimaStakingV1.bind(STAKING_CONTRACT_V1).try_index()
  if (indexCall.reverted) {
    throw new Error('Index call reverted')
  }

  const indexDecimal = toDecimal(BigInt.fromString(indexCall.value.toString()), 9)
  log.debug('Get Klima Value {}; parsed: {}', [indexCall.value.toString(), indexDecimal.toString()])
  return indexDecimal
}

export function updateProtocolMetrics(transaction: Transaction): void {
  let pm = loadOrCreateProtocolMetric(transaction.timestamp)

  // Total Supply
  pm.totalSupply = getTotalSupply()

  // Circ Supply
  pm.klimaCirculatingSupply = getCirculatingSupply(transaction, pm.totalSupply)

  // Index
  pm.klimaIndex = getKlimaIndex()

  // Total Klima in LP
  pm.totalKlimaInLP = getKlimaAmountFromLP(transaction)

  // sKlima Supply
  pm.sKlimaCirculatingSupply = getSklimaSupply(transaction)

  // Total Klima unstaked
  pm.totalKlimaUnstaked = pm.totalSupply.minus(pm.totalKlimaInLP).minus(pm.sKlimaCirculatingSupply)

  const klimaToken = new KLIMA()
  // KLIMA Price
  if (transaction.blockNumber.gt(KLIMA_BCT_PAIR_BLOCK)) {
    pm.klimaPrice = klimaToken.getUSDPrice(transaction.blockNumber)
  }

  // DAO KLIMA Balance
  pm.daoBalanceKLIMA = klimaToken.getAddressBalance(DAO_MULTISIG)

  const usdcToken = new USDC()
  // DAO USDC Balance
  pm.daoBalanceUSDC = usdcToken.getAddressBalance(DAO_MULTISIG)

  // Treasury KLIMA Balance
  pm.treasuryBalanceKLIMA = klimaToken.getAddressBalance(TREASURY_ADDRESS)

  // Treasury USDC Balance
  pm.treasuryBalanceUSDC = usdcToken.getAddressBalance(TREASURY_ADDRESS)

  // USDC Balance in LP
  pm.treasuryUSDCInLP = getUSDCAmountFromLP(transaction)

  // KLIMA Market Cap
  pm.marketCap = pm.klimaCirculatingSupply.times(pm.klimaPrice)

  // Total Value Locked
  pm.totalValueLocked = pm.sKlimaCirculatingSupply.times(pm.klimaPrice)

  // Update Treasury Assets
  let assetUpdates = updateTreasuryAssets(transaction)

  pm.assets = assetUpdates

  let valueUpdates = getMV_CC(transaction, assetUpdates)
  pm.treasuryCarbon = valueUpdates[0]
  pm.treasuryCarbonCustodied = valueUpdates[1]
  pm.treasuryMarketValue = valueUpdates[2]

  // Rebase rewards, AKR, rebase
  pm.nextDistributedKlima = getNextKLIMARebase(transaction)
  let AKR_rebase = getAKR_Rebase(pm.sKlimaCirculatingSupply, pm.nextDistributedKlima)
  pm.currentAKR = AKR_rebase[0]
  pm.nextEpochRebase = AKR_rebase[1]

  //Runway
  pm.runwayCurrent = getRunway(pm.sKlimaCirculatingSupply, pm.treasuryCarbonCustodied, pm.nextEpochRebase)

  //Holders
  pm.holders = getHolderAux().value

  pm.save()
}

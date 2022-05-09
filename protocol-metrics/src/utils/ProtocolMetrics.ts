import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { KlimaERC20V1 } from '../../generated/TreasuryV1/KlimaERC20V1';
import { sKlimaERC20V1 } from '../../generated/TreasuryV1/sKlimaERC20V1';
import { ERC20 } from '../../generated/TreasuryV1/ERC20';
import { UniswapV2Pair } from '../../generated/TreasuryV1/UniswapV2Pair';
import { KlimaStakingV1 } from '../../generated/TreasuryV1/KlimaStakingV1';

import { ProtocolMetric, Transaction, TreasuryAsset } from '../../generated/schema'
import { dayFromTimestamp } from '../../../lib/utils/Dates';
import { toDecimal } from '../../../lib/utils/Decimals';
import {
    getKLIMAUSDRate, getDiscountedPairCO2, getKlimaPairUSD, getBCTUSDRate, getKLIMAMCO2Rate,
    getKLIMAUBORate, getKLIMANBORate, getNCTUSDRate
} from './Price';
import { getHolderAux } from './Aux';
import {
    BCTBOND_V1, BCT_ERC20_CONTRACT, BCT_USDC_BOND_V1,
    BCT_USDC_PAIR, BCT_USDC_PAIR_BLOCK, DAO_MULTISIG, KLIMA_BCT_BOND_V1,
    KLIMA_BCT_PAIR, KLIMA_BCT_PAIR_BLOCK, KLIMA_ERC20_V1_CONTRACT, KLIMA_MCO2_BOND_V1,
    KLIMA_MCO2_BOND_V1_2, KLIMA_MCO2_PAIR, KLIMA_MCO2_PAIR_BLOCK, KLIMA_USDC_PAIR,
    KLIMA_USDC_PAIR_BLOCK, MCO2BOND_V1, MCO2BOND_V1_2, MCO2BOND_V1_BLOCK,
    MCO2_ERC20_CONTRACT, UBOBOND_V1, UBOBOND_V1_BLOCK, UBO_ERC20_CONTRACT,
    KLIMA_UBO_PAIR_BLOCK, NBOBOND_V1, NBOBOND_V1_BLOCK, NBO_ERC20_CONTRACT,
    KLIMA_NBO_PAIR_BLOCK, SKLIMA_ERC20_V1_CONTRACT, STAKING_CONTRACT_V1, TREASURY_ADDRESS,
    NCT_USDC_PAIR, NCT_ERC20_CONTRACT, NCT_USDC_PAIR_BLOCK
} from '../../../lib/utils/Constants';

export function loadOrCreateProtocolMetric(timestamp: BigInt): ProtocolMetric {
    let dayTimestamp = dayFromTimestamp(timestamp);

    let protocolMetric = ProtocolMetric.load(dayTimestamp)
    if (protocolMetric == null) {
        protocolMetric = new ProtocolMetric(dayTimestamp)
        protocolMetric.timestamp = timestamp
        protocolMetric.klimaCirculatingSupply = BigDecimal.fromString("0")
        protocolMetric.sKlimaCirculatingSupply = BigDecimal.fromString("0")
        protocolMetric.totalSupply = BigDecimal.fromString("0")
        protocolMetric.klimaPrice = BigDecimal.fromString("0")
        protocolMetric.marketCap = BigDecimal.fromString("0")
        protocolMetric.totalValueLocked = BigDecimal.fromString("0")
        protocolMetric.assets = []
        protocolMetric.treasuryCarbonCustodied = BigDecimal.fromString("0")
        protocolMetric.treasuryMarketValue = BigDecimal.fromString("0")
        protocolMetric.nextEpochRebase = BigDecimal.fromString("0")
        protocolMetric.nextDistributedKlima = BigDecimal.fromString("0")
        protocolMetric.currentAKR = BigDecimal.fromString("0")
        protocolMetric.treasuryCarbon = BigDecimal.fromString("0")
        protocolMetric.holders = BigInt.fromI32(0)

        protocolMetric.save()
    }
    return protocolMetric as ProtocolMetric
}

export function loadOrCreateTreasuryAsset(timestamp: BigInt, token: String): TreasuryAsset {
    let dayTimestamp = dayFromTimestamp(timestamp);

    let treasuryAsset = TreasuryAsset.load(dayTimestamp + token)
    if (treasuryAsset == null) {
        treasuryAsset = new TreasuryAsset(dayTimestamp + token)
        treasuryAsset.timestamp = timestamp
        treasuryAsset.token = token.toString()
        treasuryAsset.tokenBalance = BigDecimal.fromString("0")
        treasuryAsset.carbonBalance = BigDecimal.fromString("0")
        treasuryAsset.carbonCustodied = BigDecimal.fromString("0")
        treasuryAsset.marketValue = BigDecimal.fromString("0")
        treasuryAsset.POL = BigDecimal.fromString("0")

        treasuryAsset.save()
    }

    return treasuryAsset as TreasuryAsset
}


function getTotalSupply(): BigDecimal {
    let klima_contract = KlimaERC20V1.bind(Address.fromString(KLIMA_ERC20_V1_CONTRACT))
    let total_supply = toDecimal(klima_contract.totalSupply(), 9)
    log.debug("Total Supply {}", [total_supply.toString()])
    return total_supply
}

function getCirculatingSupply(transaction: Transaction, total_supply: BigDecimal): BigDecimal {

    let klima_contract = KlimaERC20V1.bind(Address.fromString(KLIMA_ERC20_V1_CONTRACT))

    // Start with total supply
    let circ_supply = total_supply

    // Subtract DAO Balance
    circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(DAO_MULTISIG)), 9))

    // Subtract Bond Rewards
    circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(BCTBOND_V1)), 9))
    circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(BCT_USDC_BOND_V1)), 9))
    circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(KLIMA_BCT_BOND_V1)), 9))
    circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(MCO2BOND_V1)), 9))
    circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(MCO2BOND_V1_2)), 9))
    circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(KLIMA_MCO2_BOND_V1)), 9))
    circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(KLIMA_MCO2_BOND_V1_2)), 9))
    circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(UBOBOND_V1)), 9))
    // circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(KLIMA_UBO_BOND_V1)), 9))
    circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(NBOBOND_V1)), 9))
    // circ_supply = circ_supply.minus(toDecimal(klima_contract.balanceOf(Address.fromString(KLIMA_NBO_BOND_V1)), 9))

    log.debug("Circulating Supply {}", [total_supply.toString()])
    return circ_supply
}

function getSklimaSupply(transaction: Transaction): BigDecimal {
    let sklima_supply = BigDecimal.fromString("0")

    let sklima_contract_v1 = sKlimaERC20V1.bind(Address.fromString(SKLIMA_ERC20_V1_CONTRACT))
    sklima_supply = toDecimal(sklima_contract_v1.circulatingSupply(), 9)

    log.debug("sKLIMA Supply {}", [sklima_supply.toString()])
    return sklima_supply
}

function updateTreasuryAssets(transaction: Transaction): string[] {

    let treasuryAddress = Address.fromString(TREASURY_ADDRESS)

    // BCT
    let bctERC20 = ERC20.bind(Address.fromString(BCT_ERC20_CONTRACT))
    let treasuryBCT = loadOrCreateTreasuryAsset(transaction.timestamp, BCT_ERC20_CONTRACT)

    // NCT
    let nctERC20 = ERC20.bind(Address.fromString(NCT_ERC20_CONTRACT))
    let treasuryNCT = loadOrCreateTreasuryAsset(transaction.timestamp, NCT_ERC20_CONTRACT)

    // MCO2
    let mco2ERC20 = ERC20.bind(Address.fromString(MCO2_ERC20_CONTRACT))
    let treasuryMCO2 = loadOrCreateTreasuryAsset(transaction.timestamp, MCO2_ERC20_CONTRACT)

    // UBO
    let uboERC20 = ERC20.bind(Address.fromString(UBO_ERC20_CONTRACT))
    let treasuryUBO = loadOrCreateTreasuryAsset(transaction.timestamp, UBO_ERC20_CONTRACT)

    // NBO
    let nboERC20 = ERC20.bind(Address.fromString(NBO_ERC20_CONTRACT))
    let treasuryNBO = loadOrCreateTreasuryAsset(transaction.timestamp, NBO_ERC20_CONTRACT)

    // Treasury token balance
    treasuryBCT.tokenBalance = toDecimal(bctERC20.balanceOf(treasuryAddress), 18)

    if (transaction.blockNumber.gt(BigInt.fromString(NCT_USDC_PAIR_BLOCK))) {
        treasuryNCT.tokenBalance = toDecimal(nctERC20.balanceOf(treasuryAddress), 18)
    }

    if (transaction.blockNumber.gt(BigInt.fromString(MCO2BOND_V1_BLOCK))) {
        treasuryMCO2.tokenBalance = toDecimal(mco2ERC20.balanceOf(treasuryAddress))
    }
    if (transaction.blockNumber.gt(BigInt.fromString(UBOBOND_V1_BLOCK))) {
        treasuryUBO.tokenBalance = toDecimal(uboERC20.balanceOf(treasuryAddress))
    }
    if (transaction.blockNumber.gt(BigInt.fromString(NBOBOND_V1_BLOCK))) {
        treasuryNBO.tokenBalance = toDecimal(nboERC20.balanceOf(treasuryAddress))
    }

    // Reserve asset so carbon and CC = token balance
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

    // Get market value if pools are deployed
    if (transaction.blockNumber.gt(BigInt.fromString(BCT_USDC_PAIR_BLOCK))) {
        treasuryBCT.marketValue = treasuryBCT.tokenBalance.times(getBCTUSDRate())
    }

    if (transaction.blockNumber.gt(BigInt.fromString(NCT_USDC_PAIR_BLOCK))) {
        treasuryNCT.marketValue = treasuryNCT.tokenBalance.times(getNCTUSDRate())
    }

    if (transaction.blockNumber.gt(BigInt.fromString(KLIMA_MCO2_PAIR_BLOCK))) {
        treasuryMCO2.marketValue = treasuryMCO2.tokenBalance.times(getKLIMAMCO2Rate()).times(getKLIMAUSDRate())
    }

    if (transaction.blockNumber.gt(BigInt.fromString(KLIMA_UBO_PAIR_BLOCK))) {
        treasuryUBO.marketValue = treasuryUBO.tokenBalance.times(getKLIMAUBORate()).times(getKLIMAUSDRate())
    }

    if (transaction.blockNumber.gt(BigInt.fromString(KLIMA_NBO_PAIR_BLOCK))) {
        treasuryNBO.marketValue = treasuryNBO.tokenBalance.times(getKLIMANBORate()).times(getKLIMAUSDRate())
    }

    treasuryBCT.save()
    treasuryNCT.save()
    treasuryMCO2.save()
    treasuryUBO.save()
    treasuryNBO.save()


    // KLIMA-BCT
    let treasuryKLIMABCT = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_BCT_PAIR)

    if (transaction.blockNumber.gt(BigInt.fromString(KLIMA_BCT_PAIR_BLOCK))) {
        let klimabctERC20 = ERC20.bind(Address.fromString(KLIMA_BCT_PAIR))
        let klimabctUNIV2 = UniswapV2Pair.bind(Address.fromString(KLIMA_BCT_PAIR))



        // Treasury LP token balance
        treasuryKLIMABCT.tokenBalance = toDecimal(klimabctERC20.balanceOf(treasuryAddress), 18)

        // Get total LP supply and calc treasury percent
        let total_lp = toDecimal(klimabctUNIV2.totalSupply(), 18)
        let ownedLP = treasuryKLIMABCT.tokenBalance.div(total_lp)
        treasuryKLIMABCT.POL = ownedLP

        // Percent of Carbon in LP owned by the treasury
        treasuryKLIMABCT.carbonBalance = toDecimal(klimabctUNIV2.getReserves().value0, 18).times(ownedLP)
        treasuryKLIMABCT.marketValue = treasuryKLIMABCT.carbonBalance.times(getBCTUSDRate())

    }

    treasuryKLIMABCT.save()

    // KLIMA-MCO2
    let treasuryKLIMAMCO2 = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_MCO2_PAIR)

    if (transaction.blockNumber.gt(BigInt.fromString(KLIMA_MCO2_PAIR_BLOCK))) {
        let klimamco2ERC20 = ERC20.bind(Address.fromString(KLIMA_MCO2_PAIR))
        let klimamco2UNIV2 = UniswapV2Pair.bind(Address.fromString(KLIMA_MCO2_PAIR))

        // Treasury LP token balance
        treasuryKLIMAMCO2.tokenBalance = toDecimal(klimamco2ERC20.balanceOf(treasuryAddress), 18)

        // Get total LP supply and calc treasury percent
        let total_lp = toDecimal(klimamco2UNIV2.totalSupply(), 18)
        let ownedLP = treasuryKLIMAMCO2.tokenBalance.div(total_lp)
        treasuryKLIMAMCO2.POL = ownedLP

        // Percent of Carbon in LP owned by the treasury
        treasuryKLIMAMCO2.carbonBalance = toDecimal(klimamco2UNIV2.getReserves().value0, 18).times(ownedLP)
        treasuryKLIMAMCO2.marketValue = treasuryKLIMAMCO2.carbonBalance.times(getKLIMAMCO2Rate()).times(getKLIMAUSDRate())
    }

    treasuryKLIMAMCO2.save()

    // // KLIMA-UBO
    //     let treasuryKLIMAUBO = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_UBO_PAIR)

    //     if (transaction.blockNumber.gt(BigInt.fromString(KLIMA_UBO_PAIR_BLOCK))) {
    //         let klimauboERC20 = ERC20.bind(Address.fromString(KLIMA_UBO_PAIR))
    //         let klimauboUNIV2 = UniswapV2Pair.bind(Address.fromString(KLIMA_UBO_PAIR))

    //         // Treasury LP token balance
    //         treasuryKLIMAUBO.tokenBalance = toDecimal(klimauboERC20.balanceOf(treasuryAddress), 18)

    //         // Get total LP supply and calc treasury percent
    //         let total_lp = toDecimal(klimauboUNIV2.totalSupply(), 18)
    //         let ownedLP = treasuryKLIMAUBO.tokenBalance.div(total_lp)
    //         treasuryKLIMAUBO.POL = ownedLP

    //         // Percent of Carbon in LP owned by the treasury
    //         treasuryKLIMAUBO.carbonBalance = toDecimal(klimauboUNIV2.getReserves().value0, 18).times(ownedLP)
    //         treasuryKLIMAUBO.marketValue = treasuryKLIMAUBO.carbonBalance.times(getKLIMAUBORate()).times(getKLIMAUSDRate())
    //     }

    //     treasuryKLIMAUBO.save()

    // // KLIMA-NBO
    // let treasuryKLIMANBO = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_NBO_PAIR)

    // if (transaction.blockNumber.gt(BigInt.fromString(KLIMA_NBO_PAIR_BLOCK))) {
    //     let klimanboERC20 = ERC20.bind(Address.fromString(KLIMA_NBO_PAIR))
    //     let klimanboUNIV2 = UniswapV2Pair.bind(Address.fromString(KLIMA_NBO_PAIR))

    //     // Treasury LP token balance
    //     treasuryKLIMANBO.tokenBalance = toDecimal(klimanboERC20.balanceOf(treasuryAddress), 18)

    //     // Get total LP supply and calc treasury percent
    //     let total_lp = toDecimal(klimanboUNIV2.totalSupply(), 18)
    //     let ownedLP = treasuryKLIMANBO.tokenBalance.div(total_lp)
    //     treasuryKLIMANBO.POL = ownedLP

    //     // Percent of Carbon in LP owned by the treasury
    //     treasuryKLIMANBO.carbonBalance = toDecimal(klimanboUNIV2.getReserves().value0, 18).times(ownedLP)
    //     treasuryKLIMANBO.marketValue = treasuryKLIMANBO.carbonBalance.times(getKLIMANBORate()).times(getKLIMAUSDRate())
    // }

    // treasuryKLIMANBO.save()

    // BCT-USDC


    let treasuryBCTUSDC = loadOrCreateTreasuryAsset(transaction.timestamp, BCT_USDC_PAIR)
    if (transaction.blockNumber.gt(BigInt.fromString(BCT_USDC_PAIR_BLOCK))) {
        let bctusdcERC20 = ERC20.bind(Address.fromString(BCT_USDC_PAIR))
        let bctusdcUNIV2 = UniswapV2Pair.bind(Address.fromString(BCT_USDC_PAIR))

        // Treasury LP token balance
        treasuryBCTUSDC.tokenBalance = toDecimal(bctusdcERC20.balanceOf(treasuryAddress), 18)

        // Get total LP supply and calc treasury percent
        let total_lp = toDecimal(bctusdcUNIV2.totalSupply(), 18)
        let ownedLP = treasuryBCTUSDC.tokenBalance.div(total_lp)
        treasuryBCTUSDC.POL = ownedLP

        // Percent of Carbon in LP owned by the treasury
        treasuryBCTUSDC.carbonBalance = toDecimal(bctusdcUNIV2.getReserves().value1, 18).times(ownedLP)
        treasuryBCTUSDC.marketValue = treasuryBCTUSDC.carbonBalance.times(getBCTUSDRate())

    }

    treasuryBCTUSDC.save()

    // KLIMA-USDC


    let treasuryKLIMAUSDC = loadOrCreateTreasuryAsset(transaction.timestamp, KLIMA_USDC_PAIR)
    if (transaction.blockNumber.gt(BigInt.fromString(KLIMA_USDC_PAIR_BLOCK))) {
        let klimausdcERC20 = ERC20.bind(Address.fromString(KLIMA_USDC_PAIR))
        let klimausdcUNIV2 = UniswapV2Pair.bind(Address.fromString(KLIMA_USDC_PAIR))

        // Treasury LP token balance
        treasuryKLIMAUSDC.tokenBalance = toDecimal(klimausdcERC20.balanceOf(treasuryAddress), 18)

        // Get total LP supply and calc treasury percent
        let total_lp = toDecimal(klimausdcUNIV2.totalSupply(), 18)
        let ownedLP = treasuryKLIMAUSDC.tokenBalance.div(total_lp)
        treasuryKLIMAUSDC.POL = ownedLP
        treasuryKLIMAUSDC.marketValue = toDecimal(klimausdcUNIV2.getReserves().value1, 9).times(getKLIMAUSDRate()).times(ownedLP)
    }

    treasuryKLIMAUSDC.save()

    return [
        treasuryBCT.id,
        treasuryMCO2.id,
        treasuryUBO.id,
        treasuryNBO.id,
        treasuryKLIMABCT.id,
        treasuryKLIMAMCO2.id,
        // treasuryKLIMAUBO.id,
        // treasuryKLIMANBO.id,
        treasuryBCTUSDC.id,
        treasuryKLIMAUSDC.id,
        treasuryNCT.id
    ]
}

function getMV_CC(transaction: Transaction, assets: string[]): BigDecimal[] {

    let totalCarbon = BigDecimal.fromString("0")
    let totalCC = BigDecimal.fromString("0")
    let totalMarketValue = BigDecimal.fromString("0")

    for (let i = 0; i < assets.length; i++) {
        let assetDetail = loadOrCreateTreasuryAsset(transaction.timestamp, assets[i].substring(10))
        totalCarbon = totalCarbon.plus(assetDetail.carbonBalance)
        totalCC = totalCC.plus(assetDetail.carbonCustodied)
        totalMarketValue = totalMarketValue.plus(assetDetail.marketValue)
    }

    log.debug("Treasury Carbon {}", [totalCarbon.toString()])
    log.debug("Treasury CC {}", [totalCC.toString()])
    log.debug("Treasury Market Value {}", [totalMarketValue.toString()])

    return [
        totalCarbon,
        totalCC,
        totalMarketValue
    ]
}

function getNextKLIMARebase(transaction: Transaction): BigDecimal {
    let next_distribution = BigDecimal.fromString("0")

    let staking_contract_v1 = KlimaStakingV1.bind(Address.fromString(STAKING_CONTRACT_V1))
    let distribution_v1 = toDecimal(staking_contract_v1.epoch().value3, 9)
    log.debug("next_distribution v1 {}", [distribution_v1.toString()])
    next_distribution = next_distribution.plus(distribution_v1)


    log.debug("next_distribution total {}", [next_distribution.toString()])

    return next_distribution
}

function getAKR_Rebase(sKLIMA: BigDecimal, distributedKLIMA: BigDecimal): BigDecimal[] {
    // Check for 0 sKLIMA supply
    if (sKLIMA == BigDecimal.fromString("0")) { return [BigDecimal.fromString("0"), BigDecimal.fromString("0")] }

    let nextEpochRebase = distributedKLIMA.div(sKLIMA).times(BigDecimal.fromString("100"));

    let nextEpochRebase_number = Number.parseFloat(nextEpochRebase.toString())
    let currentAKR = Math.pow(((nextEpochRebase_number / 100) + 1), (365 * 3.28) - 1) * 100

    let currentAKRdecimal = BigDecimal.fromString(currentAKR.toString())

    log.debug("next_rebase {}", [nextEpochRebase.toString()])
    log.debug("current_AKR total {}", [currentAKRdecimal.toString()])

    return [currentAKRdecimal, nextEpochRebase]
}

function getRunway(sKLIMA: BigDecimal, rfv: BigDecimal, rebase: BigDecimal): BigDecimal {
    //let runway100 = BigDecimal.fromString("0")
    //let runway250 = BigDecimal.fromString("0")
    //let runway500 = BigDecimal.fromString("0")
    //let runway1k = BigDecimal.fromString("0")
    //let runway2dot5k = BigDecimal.fromString("0")
    //let runway5k = BigDecimal.fromString("0")
    let runwayCurrent = BigDecimal.fromString("0")

    // Keeping placeholder math entered, just commented in case we want in the future.
    if (sKLIMA.gt(BigDecimal.fromString("0")) && rfv.gt(BigDecimal.fromString("0")) && rebase.gt(BigDecimal.fromString("0"))) {
        let treasury_runway = Number.parseFloat(rfv.div(sKLIMA).toString())

        //let runway100_num = (Math.log(treasury_runway) / Math.log(1)) / 3.28;
        //let runway250_num = (Math.log(treasury_runway) / Math.log(1 + 0.000763867)) / 3.28;
        //let runway500_num = (Math.log(treasury_runway) / Math.log(1 + 0.001342098)) / 3.28;
        //let runway1k_num = (Math.log(treasury_runway) / Math.log(1 + 0.001920663)) / 3.28;
        //let runway2dot5k_num = (Math.log(treasury_runway) / Math.log(1 + 0.002685997)) / 3.28;
        //let runway5k_num = (Math.log(treasury_runway) / Math.log(1 + 0.003265339)) / 3.28;
        let nextEpochRebase_number = Number.parseFloat(rebase.toString()) / 100
        let runwayCurrent_num = (Math.log(treasury_runway) / Math.log(1 + nextEpochRebase_number)) / 3.28;

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


export function updateProtocolMetrics(transaction: Transaction): void {
    let pm = loadOrCreateProtocolMetric(transaction.timestamp);

    //Total Supply
    pm.totalSupply = getTotalSupply()

    //Circ Supply
    pm.klimaCirculatingSupply = getCirculatingSupply(transaction, pm.totalSupply)

    //sKlima Supply
    pm.sKlimaCirculatingSupply = getSklimaSupply(transaction)

    //KLIMA Price
    if (transaction.blockNumber.gt(BigInt.fromString(KLIMA_BCT_PAIR_BLOCK))) {
        pm.klimaPrice = getKLIMAUSDRate()
    }

    //KLIMA Market Cap
    pm.marketCap = pm.klimaCirculatingSupply.times(pm.klimaPrice)

    //Total Value Locked
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

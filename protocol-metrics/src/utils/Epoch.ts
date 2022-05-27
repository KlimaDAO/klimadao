import { BigInt, BigDecimal, Address, log } from '@graphprotocol/graph-ts'
import { Epoch  } from '../../generated/schema'
import { LogRebase } from '../../generated/TreasuryV1/sKlimaERC20V1'
import { KlimaStakingV1 } from '../../generated/TreasuryV1/KlimaStakingV1'
import { STAKING_CONTRACT_V1 } from '../../../lib/utils/Constants'


const TWENTY_FOUR_HOURS_IN_SECONDS = BigDecimal.fromString("86400")

//This value will be used as initial rebase rate for init epoch (this was calulated)
const INIT_REBASE_RATE = BigDecimal.fromString("3.1286")

/**
 * Syncing does not start from the beggining
 * when first LogRebase event happens - the previous event is 3, therefore the first epoch stored is 4
 **/
const INIT_EPOCH_NUMBER = BigInt.fromI32(4)

//It takes this number of Epochs for average
const RECENT_AVERAGE_NUMBER = BigInt.fromI32(10)

export class EpochUtil {

    /**
     * Retrieve the last epoch entity and get previous average rebase rate
     */
    static getDynamicRebaseRate(): number {
        const epochCall = KlimaStakingV1.bind(Address.fromString(STAKING_CONTRACT_V1)).try_epoch()
        if (epochCall.reverted) {
            throw new Error("Epoch call reverted")
        }
        
        const currentEpochNumber = epochCall.value.value1
        if (currentEpochNumber.lt(INIT_EPOCH_NUMBER)) {
            //Protocol metrics call for dynamic rebase rate before epochs are created in LogRebase event
            //in that case return INIT_REBASE_RATE
            return parseFloat(INIT_REBASE_RATE.toString())
        }

        let currentEpoch = Epoch.load(currentEpochNumber.toString())
        if(currentEpoch == null) {
            //Calling previous epoch due to failure from possible call by deposit handler
            const previousEpochNumber = currentEpochNumber.minus(BigInt.fromI32(1))
            currentEpoch = Epoch.load(previousEpochNumber.toString())
            if (currentEpoch == null) {
                throw new Error("Failed to get current and previous epoch - current: "+currentEpochNumber.toString())
            }
        }
        return parseFloat(currentEpoch.prevAvgRebaseRate.toString())
    }

    /**
     * This method creates a new epoch and updates the previous with missing information.
     * This method also calculates average rebase rate for the last RECENT_AVERAGE_NUMBER of epochs
     * and stores that information within new epoch
     * @param event LogRebased Event
     */
    static handleNewEpoch(event: LogRebase): void {

        const finishedEpochNumber = event.params.epoch
        const nextEpochNumber = event.params.epoch.plus(BigInt.fromI32(1))

        const currentBlockNumber = event.block.number
        const currentBlockTimestamp = event.block.timestamp
    
        if (nextEpochNumber.equals(INIT_EPOCH_NUMBER)) {

            this.createNewEpoch(nextEpochNumber, event.block.number, event.block.timestamp, INIT_REBASE_RATE)

        } else {
            const previousEpoch = Epoch.load(finishedEpochNumber.toString())
            if(previousEpoch == null) {
                throw new Error("Previous epoch not found - Epoch number: " + event.params.epoch.toString());
            }

            this.updatePreviousEpoch(previousEpoch, currentBlockNumber, currentBlockTimestamp)
            const dynamicRebaseRate = this.calcDynamicRebaseRate(finishedEpochNumber)

            this.createNewEpoch(nextEpochNumber, event.block.number, event.block.timestamp, dynamicRebaseRate)
        }
    }
    
    private static createNewEpoch(epochNumber: BigInt,
         currentBlock: BigInt, 
         currentBlockTimestamp: BigInt, 
         prevAvgRebaseRate: BigDecimal): Epoch {
    
        let epoch = Epoch.load(epochNumber.toString())
        if (epoch == null) {
            epoch = new Epoch(epochNumber.toString())
            epoch.epochNumber = BigInt.fromString(epochNumber.toString())
            epoch.blockFrom = currentBlock
            epoch.blockFromTimestamp = currentBlockTimestamp
            epoch.blockTo = BigInt.fromString("-1")
            epoch.blockToTimestamp = BigInt.fromString("-1")
            epoch.duration = BigInt.fromString("-1")
            epoch.prevAvgRebaseRate = prevAvgRebaseRate
    
            epoch.save()
        }
    
        return epoch as Epoch
    }

    private static updatePreviousEpoch(previousEpoch: Epoch, currentBlockNumber: BigInt, currentBlockTimestamp: BigInt): void {
        previousEpoch.blockTo = currentBlockNumber
        previousEpoch.blockToTimestamp = currentBlockTimestamp
        previousEpoch.duration = previousEpoch.blockToTimestamp.minus(previousEpoch.blockFromTimestamp)

        previousEpoch.save()
    }

    /**
     * Calculates dynamic rebase rate based on the average of previous RECENT_AVERAGE_NUMBER epoch entities
     * If N > Total of epochs within subgraph - return DEFAULT_REBASE_RATE
     * @param finishedEpochNumber - Number of the previous Epoch
     * @returns 
     */
    private static calcDynamicRebaseRate(finishedEpochNumber: BigInt): BigDecimal {

        const averageDuration = this.getRecentAverageDuration(finishedEpochNumber)
        const dynamicRebaseValue = TWENTY_FOUR_HOURS_IN_SECONDS.div(averageDuration)

        return dynamicRebaseValue
    }

    private static getRecentAverageDuration(epochNumber: BigInt): BigDecimal {

        let oldestEpochTakenForCalc: BigInt
        if ((epochNumber.minus(RECENT_AVERAGE_NUMBER)).lt(INIT_EPOCH_NUMBER)) {
            oldestEpochTakenForCalc = INIT_EPOCH_NUMBER
        } else {
           oldestEpochTakenForCalc =  epochNumber.minus(RECENT_AVERAGE_NUMBER)
        }

        let sum = BigInt.zero()
        let numOfEpochs = BigInt.zero()
        for (let i = epochNumber; i.ge(oldestEpochTakenForCalc); i = i.minus(BigInt.fromI32(1))) {
            const epoch = Epoch.load(i.toString())
            if (epoch == null) { 
                throw new Error("Epoch not found - Epoch number: " + epochNumber.toString());
            }        
            sum = sum.plus(epoch.duration)
            numOfEpochs = numOfEpochs.plus(BigInt.fromI32(1))
        }

        if (numOfEpochs.equals(BigInt.zero())) {
            throw new Error("Num of epochs cannot be zero at this point")
        }

        return sum.toBigDecimal().div(numOfEpochs.toBigDecimal())
    }
}
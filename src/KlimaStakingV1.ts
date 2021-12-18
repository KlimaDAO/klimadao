import { Address } from '@graphprotocol/graph-ts'
import { Stake, Unstake } from '../generated/schema'

import { Transfer } from '../generated/KlimaStakingV1/ERC20'
import { toDecimal } from "./utils/Decimals"
import { loadOrCreateKlimate, updateKlimateBalance } from "./utils/Klimate"
import { loadOrCreateTransaction } from "./utils/Transactions"
import { updateProtocolMetrics } from './utils/ProtocolMetrics'

export function handleTransfer(event: Transfer): void {

    /* 
        Staking transactions:
        - When a user stakes either via the staking helper or directly with the staking contract,
            the sKLIMA is sent to the warmup contract, and then back to the user. This excludes
            forfeit calls as that only returns KLIMA to the user.
    */
    if (event.params.from == Address.fromString('0x5ed22cff24a6797fa854066f9ee31870fd33fa66') &&
        event.params.to != Address.fromString('0x25d28a24Ceb6F81015bB0b2007D795ACAc411b4d')) {

        let klimate = loadOrCreateKlimate(event.params.to as Address)
        let transaction = loadOrCreateTransaction(event.transaction, event.block)
        let value = toDecimal(event.params.value, 9)
        let stake = new Stake(transaction.id)
        stake.transaction = transaction.id
        stake.klimate = klimate.id
        stake.amount = value
        stake.timestamp = transaction.timestamp;
        stake.save()

        updateKlimateBalance(klimate, transaction)
        updateProtocolMetrics(transaction)
    }

    /* 
        Unstaking transactions:
        - Exclude the sending of sKLIMA to the Warmup Contract.
    */
    if (event.params.to == Address.fromString('0x25d28a24Ceb6F81015bB0b2007D795ACAc411b4d') &&
        event.params.from != Address.fromString('0x5ed22cff24a6797fa854066f9ee31870fd33fa66')) {

        let klimate = loadOrCreateKlimate(event.params.from as Address)
        let transaction = loadOrCreateTransaction(event.transaction, event.block)
        let value = toDecimal(event.params.value, 9)
        let unstake = new Unstake(transaction.id)
        unstake.transaction = transaction.id
        unstake.klimate = klimate.id
        unstake.amount = value
        unstake.timestamp = transaction.timestamp;
        unstake.save()

        updateKlimateBalance(klimate, transaction)
        updateProtocolMetrics(transaction)
    }
}
/*
export function handleUnstake(call: UnstakeCall): void {
    let klimate = loadOrCreateKlimate(call.from as Address)
    let transaction = loadOrCreateTransaction(call.transaction, call.block)
    let value = toDecimal(call.inputs._amount, 9)

    let unstake = new Unstake(transaction.id)
    unstake.transaction = transaction.id
    unstake.klimate = klimate.id
    unstake.amount = value
    unstake.timestamp = transaction.timestamp;
    unstake.save()

    updateKlimateBalance(klimate, transaction)
    //updateProtocolMetrics(transaction)
}
*/

import { Deposit } from "../generated/TreasuryV1/TreasuryV1"
import { loadOrCreateTransaction } from "./utils/Transactions";
import { updateProtocolMetrics } from "./utils/ProtocolMetrics";


export function handleDeposit(event: Deposit): void {

    let transaction = loadOrCreateTransaction(event.transaction, event.block)

    updateProtocolMetrics(transaction)

}

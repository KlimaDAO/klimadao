import { LogRebase } from "../generated/TreasuryV1/sKlimaERC20V1";
import { loadOrCreateTransaction } from "./utils/Transactions";
import { updateProtocolMetrics } from "./utils/ProtocolMetrics";
import { EpochUtil } from './utils/Epoch';


export function handleRebase(event: LogRebase): void {

    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    EpochUtil.handleNewEpoch(event)
    
    updateProtocolMetrics(transaction)

}

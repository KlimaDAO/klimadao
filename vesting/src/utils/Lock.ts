import { BigInt, BigDecimal, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { Unlock, Lock } from "../../generated/schema";


export function loadOrCreateLock(id: string): Lock {
    let lock = Lock.load(id);
  
    if (lock == null) {
      lock = new Lock(id);
      lock.timestamp = BigInt.zero();
      lock.token = "";
      lock.platform = "";
      lock.contractAddress = Bytes.empty();
      lock.stakerAddress = Bytes.empty();
      lock.startedAt = BigInt.zero();
      lock.maturityDate = BigInt.zero();
      lock.lockedInSeconds = BigInt.zero();
      lock.lockedAmount = BigDecimal.zero();
  
      lock.save();
    }
  
    return lock as Lock;
  }
  
  export function loadOrCreateUnlock(transaction: ethereum.Transaction): Unlock {
    let unlock = Unlock.load(transaction.hash.toHexString());
  
    if (unlock == null) {
      unlock = new Unlock(transaction.hash.toHexString());
      unlock.timestamp = BigInt.zero();
      unlock.token = "";
      unlock.platform = "";
      unlock.contractAddress = Bytes.empty();
      unlock.stakerAddress = Bytes.empty();
      unlock.maturityDate = BigInt.zero();
      unlock.amount = BigDecimal.zero();
  
      unlock.save();
    }
  
    return unlock as Unlock;
  }
  
import { ContractInfo } from '../../generated/schema'

export function loadOrCreateContractInfo(id: string): ContractInfo{
    let cinfo = ContractInfo.load(id)
    if (cinfo == null) {
        cinfo = new ContractInfo(id)
        cinfo.save()
    }
    return cinfo as ContractInfo
}


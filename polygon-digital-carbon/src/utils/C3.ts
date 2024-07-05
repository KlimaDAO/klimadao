import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { C3RetireRequest } from '../../generated/schema'
import { BridgeStatus } from '../../utils/enums'

export function loadOrCreateC3RetireRequest(requestId: Bytes): C3RetireRequest {
  let request = C3RetireRequest.load(requestId)

  if (request == null) {
    request = new C3RetireRequest(requestId)
    request.status = BridgeStatus.AWAITING
    request.index = BigInt.fromI32(0)
    request.c3OffsetNftIndex = BigInt.fromI32(0)
    request.tokenURI = ''
    request.save()
  }

  return request
}

export function loadC3RetireRequest(requestId: Bytes): C3RetireRequest | null {
  let request = C3RetireRequest.load(requestId)
  return request
}
